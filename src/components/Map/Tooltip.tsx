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
  if (!hoverInfo) return null;
  const { property, x: left, y: top } = hoverInfo;
  const copyProperty: any = { ...property };
  delete copyProperty.area_id;
  return (
    <div
      className="fixed z-10 m-2 p-1 max-w-xs pointer-events-none flex flex-col bg-white rounded-xl px-3"
      style={{ left, top }}
    >
      {Object.entries(copyProperty).map(([key, value]: any) => (
        <div key={key} className="flex flex-row">
          <div className="font-bold">{key}:</div>
          <div className="ml-1">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Tooltip;
