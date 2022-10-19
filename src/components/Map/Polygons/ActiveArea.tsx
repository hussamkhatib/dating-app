import { FC, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSetAtom } from "jotai";
import selectedAreaAtom from "../../../selectedArea";

type Props = {
  selectedArea: any;
};

const ActiveArea: FC<Props> = ({ selectedArea }) => {
  const setSelectedArea = useSetAtom(selectedAreaAtom);
  const copyProperty: any = { ...selectedArea };
  delete copyProperty.area_id;
  return (
    <div className="fixed top-16 p-4 left-0 flex flex-col bg-white">
      <button
        aria-label="close button"
        onClick={() => {
          setSelectedArea(null);
        }}
        className="rounded-full inline-flex self-end border-[1px] border-black"
      >
        <XMarkIcon className="h-4 w-4 " aria-hidden />
      </button>
      {Object.entries(copyProperty).map(([key, value]: any) => (
        <div key={key} className="text-lg flex flex-row">
          <div className="font-bold">{key}:</div>
          <div className="ml-1">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default ActiveArea;
