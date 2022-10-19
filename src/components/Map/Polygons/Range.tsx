import { FC } from "react";
import { getStops } from "./getLayerStyles";

type Props = {
  min: number;
  max: number;
};

// dynamic classes does not work with tailwind, hence defining it sepeartely
const linearHeatMapColorsTailclasses = [
  "bg-[#fff33b]",
  "bg-[#fdc70c]",
  "bg-[#f3903f]",
  "bg-[#ed683c]",
  "bg-[#e93e3a]",
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
