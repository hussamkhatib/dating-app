import { FC } from "react";

type Props = {
  hoverInfo: {
    property: {
      area_id: string;
      name: string;
      pin_code: string;
      [key: string]: string;
    };
    x: number;
    y: number;
  };
};

const Tooltip: FC<Props> = ({ hoverInfo }) => {
  return hoverInfo ? (
    <div
      className="fixed z-10 m-2 p-1 max-w-xs pointer-events-none flex flex-col text-[#00FFA4] bg-[#102B44] rounded-xl px-3"
      style={{ left: hoverInfo.x, top: hoverInfo.y }}
    >
      <span>Area: {hoverInfo?.property?.name}</span>
      <span>Pincode {hoverInfo?.property?.pin_code}</span>
    </div>
  ) : null;
};

export default Tooltip;
