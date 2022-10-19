import { FC, useMemo } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";
import { activeMapType } from "../../../activeMap";
import { useAtom } from "jotai";
import selectedAreaAtom from "../../../selectedArea";
import { filterAtom, FilterType } from "../../../filterAtom";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const [selectedArea] = useAtom(selectedAreaAtom);
  const [filter] = useAtom(filterAtom);
  const { data, loading, error } = useApi(activeMap, filter);

  // if (loading || error) return null;
  const layerStyles = getLayerStyles(activeMap);

  const filterLayer = useMemo(
    () => ["in", "area_id", selectedArea],
    [selectedArea]
  );
  console.log(filter, data);

  return data ? (
    <Source id="my-data" type="geojson" data={data}>
      {/* @ts-ignore */}
      <Layer {...layerStyles} />
      <Layer {...highlightedLayerStyles} filter={filterLayer} />
    </Source>
  ) : null;
};

export default Polygons;
