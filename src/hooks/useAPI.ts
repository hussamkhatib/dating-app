import axios from "axios";
import { useEffect, useState } from "react";
import { mapType } from "../activeMap";
import { FilterType } from "../filterAtom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useAPI = (activeMap: mapType, filters: FilterType) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const [users, areas] = await Promise.all([
          await axios.get(`${baseUrl}/users`).then((res) => res.data.users),
          await axios.get(`${baseUrl}/areas`).then((res) => res.data),
        ]);
        let min = 999;
        let max = 0;
        if (!loading && !error) {
          // MAP 1
          if (activeMap === mapType.proUsers) {
            let proUsers = 0;
            let areaProperties: any = [];
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              const { area_id, total_matches, age, gender, is_pro_user } = user;

              if (filters.age === "18-30" && age > 18 && age < 30) continue;
              if (filters.age === "30+" && age > 30) continue;
              if (filters.gender === gender || filters.gender === gender)
                continue;
              if (is_pro_user) {
                proUsers++;
                areaProperties[area_id] = {
                  proUsers: (areaProperties[area_id]?.proUsers || 0) + 1,
                };
              }
            }

            areas["features"].forEach((area: any) => {
              const proUsers =
                areaProperties[area.properties.area_id]?.proUsers || 0;

              if (min > proUsers) min = proUsers;
              if (max < proUsers) max = proUsers;
              area["properties"]["proUsers"] = proUsers;
            });

            setData({ areas, range: { min, max } });
          }
          // MAP 2
          if (activeMap === mapType.users) {
            let areaProperties: any = [];

            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              const { area_id, total_matches, age, gender, is_pro_user } = user;
              if (filters.age === "18-30" && age > 18 && age < 30) continue;
              if (filters.age === "30+" && age > 30) continue;
              if (filters.gender === gender || filters.gender === gender)
                continue;
              areaProperties[area_id] = {
                users: (areaProperties[area_id]?.users || 0) + 1,
              };
            }
            areas["features"].forEach((area: any) => {
              const users = areaProperties[area.properties.area_id]?.users || 0;
              if (min > users) min = users;
              if (max < users) max = users;
              area["properties"]["users"] = users;
            });
            setData({ areas, range: { min, max } });
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeMap, filters, error]);

  return { data, loading, error };
};

export default useAPI;
