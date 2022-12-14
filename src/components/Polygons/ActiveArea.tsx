import { FC } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSetAtom } from "jotai";
import { selectedAreaAtom } from "../../atom";
import { PolygonProperties } from "../../types";

type Props = {
  selectedArea: PolygonProperties;
};

const ActiveArea: FC<Props> = ({ selectedArea }) => {
  const setSelectedArea = useSetAtom(selectedAreaAtom);
  const copyProperty = { ...selectedArea };
  delete copyProperty.area_id;
  if (copyProperty?.coordinates) delete copyProperty.coordinates;
  return (
    <div className="fixed top-16 p-2 sm:p-4 left-0 flex flex-col bg-white">
      <button
        aria-label="close button"
        onClick={() => {
          setSelectedArea(null);
        }}
        className="rounded-full inline-flex self-end border-[1px] border-black"
      >
        <XMarkIcon className="h-4 w-4" aria-hidden />
      </button>
      {Object.entries(copyProperty).map(([key, value]) => (
        <div key={key} className="sm:text-lg flex flex-row">
          <div className="font-bold">{key}:</div>
          <div className="ml-1">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default ActiveArea;
