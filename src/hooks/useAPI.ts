import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { mapType } from "../components/Map/Polygons/Polygons";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useAPI = (activeMap: mapType) => {
  const areasRef = useRef<any>();
  const usersRef = useRef<any>();
  const data = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await Promise.all([
          await axios.get(`${baseUrl}/users`).then((res) => res.data.users),
          await axios.get(`${baseUrl}/areas`).then((res) => res.data),
        ]);
        usersRef.current = data[0];
        areasRef.current = data[1];
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (areasRef.current && usersRef.current && !loading && !error) {
    const areas = areasRef.current;
    const users = usersRef.current;
    if (activeMap === mapType.proUsers) {
      let proUsers = 0;
      let areaProperties: any = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const { area_id, total_matches, age, gender, is_pro_user } = user;
        if (is_pro_user) {
          proUsers++;
          areaProperties[area_id] = {
            proUsers: (areaProperties[area_id]?.proUsers || 0) + 1,
          };
        }
      }
      areas["features"].forEach((area: any) => {
        area["properties"]["proUsers"] =
          areaProperties[area.properties.area_id]?.proUsers || 0;
      });
      data.current = areas;
    }

    if (activeMap === mapType.users) {
      let areaProperties: any = [];

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const { area_id, total_matches, age, gender, is_pro_user } = user;
        areaProperties[area_id] = {
          users: (areaProperties[area_id]?.users || 0) + 1,
        };
      }
      areas["features"].forEach((area: any) => {
        area["properties"]["users"] =
          areaProperties[area.properties.area_id]?.users || 0;
      });
      data.current = areas;
    }
  }

  return { data: data.current, loading, error };
};

export default useAPI;
