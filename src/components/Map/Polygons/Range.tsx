import { FC } from "react";
import { getStops } from "./getLayerStyles";

type Props = {
  min: number;
  max: number;
};

// dynamic classes does not work with tailwind, hence defining it sepeartely
const linearHeatMapColorsTailclasses = [
  "bg-[#94f80b]",
  "bg-[#93ff00]",
  "bg-[#75e41c]",
  "bg-[#54c527]",
  "bg-[#40b02a]",
  "bg-[#2c9b2a]",
  "bg-[#198729]",
  "bg-[#047326]",
];

const Range: FC<Props> = ({ min, max }) => {
  const range = getStops(min, max);

  return (
    <div className="fixed z-20 bottom-8 left-8 text-gray-200">
      {range.map((stop, idx) => (
        <div key={idx} className="flex  gap-x-1 h-6">
          <div
            className={`w-4 border-black border-b-[1px] ${linearHeatMapColorsTailclasses[idx]}`}
          />
          <span>
            {Math.ceil(stop[0])} {range.length - 1 === idx ? "+" : null}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Range;
