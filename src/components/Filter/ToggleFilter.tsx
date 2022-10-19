import { PlayIcon } from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { isFilterPanelOpenAtom } from "../../filterAtom";

const ToggleFilter = () => {
  const isFilterPanelOpen = useSetAtom(isFilterPanelOpenAtom);

  return (
    <div className="fixed right-0 top-10 z-10 h-screen bg-white">
      <div className="w-8 rotate-90 mt-16">
        <button
          onClick={() => isFilterPanelOpen((prev) => !prev)}
          className="flex space-x-2 items-center"
        >
          <PlayIcon className="h-4 w-4" aria-hidden />
          <span className="text-sm">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default ToggleFilter;
