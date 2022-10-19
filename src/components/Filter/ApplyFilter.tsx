import { useAtom, useSetAtom } from "jotai";
import { filterAtom, isFilterPanelOpenAtom } from "../../filterAtom";
import RadioFilter from "./RadioFilter";

const ApplyFilter = () => {
  const [isFilterPanelOpen] = useAtom(isFilterPanelOpenAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  const handleChange = (key: string) => (value: string) =>
    setFilter((prev) => ({ ...prev, [key]: value }));

  return isFilterPanelOpen ? (
    <div className="fixed right-8 w-64 top-10 z-10 h-screen px-4 bg-white">
      <div className="mt-6" />
      <RadioFilter
        label="Age Filter"
        options={["18-30", "30+", "All"]}
        value={filter.age}
        onChange={handleChange("age")}
      />
      <RadioFilter
        label="Gender Filter"
        options={["M", "F", "All"]}
        value={filter.gender}
        onChange={handleChange("gender")}
      />
    </div>
  ) : null;
};

export default ApplyFilter;
