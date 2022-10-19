import axios from "axios";
import { useEffect, useState } from "react";
import { mapType, FilterType } from "../atom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useAPI = (activeMap: mapType, filters: FilterType) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

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
            const areaProperties: any = [];
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              const { area_id, age, gender, is_pro_user } = user;

              if (applyFilters(filters, age, gender)) continue;

              if (is_pro_user) {
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
            const areaProperties: any = [];

            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              const { area_id, age, gender } = user;
              if (applyFilters(filters, age, gender)) continue;

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

function applyFilters(filters: FilterType, age: number, gender: string) {
  return (
    (filters.age === "18-30" && age < 18 && age > 30) ||
    (filters.age === "30+" && age < 30) ||
    (filters.gender !== "All" && filters.gender != gender)
  );
}
