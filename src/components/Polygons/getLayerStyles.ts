import type { FillLayer } from "react-map-gl";

const linearHeatMapColors = [
  "#fff33b",
  "#fdc70c",
  "#f3903f",
  "#ed683c",
  "#e93e3a",
];

export const getStops = (a: number, b: number): [number, string][] => {
  const diff = (b - a) / 5;
  return Array.from({ length: 5 }, (_, i) => [
    a + diff * i,
    linearHeatMapColors[i],
  ]);
};

// property -> values on the geojson
export const getLayerStyles = (
  property: string,
  min = 0,
  max = 260
): FillLayer => {
  return {
    id: "data",
    source: "my-data",
    type: "fill",
    paint: {
      "fill-outline-color": "#000",
      "fill-color": {
        property,
        stops: getStops(min, max),
      },
    },
  };
};

export const highlightedLayerStyles: FillLayer = {
  id: "data-highlighted",
  source: "my-data",
  type: "fill",

  paint: {
    "fill-opacity": 0.75,
    "fill-color": "#273F7D",
  },
};
