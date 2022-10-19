import { useMemo } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";
import { activeMapType } from "../../../activeMap";
import { useAtom } from "jotai";
import selectedAreaAtom from "../../../selectedArea";
import { filterAtom, FilterType } from "../../../filterAtom";
import Range from "./Range";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const [selectedArea] = useAtom(selectedAreaAtom);
  const [filter] = useAtom(filterAtom);
  const { data, loading, error } = useApi(activeMap, filter);

  // if (loading || error) return null;

  const layerStyles = getLayerStyles(
    activeMap,
    data?.range?.min,
    data?.range?.max
  );

  const filterLayer = useMemo(
    () => ["in", "area_id", selectedArea],
    [selectedArea]
  );
  console.log(filter, data);

  return data ? (
    <>
      <Source id="my-data" type="geojson" data={data.areas}>
        {/* @ts-ignore */}
        <Layer {...layerStyles} />
        <Layer {...highlightedLayerStyles} filter={filterLayer} />
      </Source>
      <Range min={data?.range?.min} max={data?.range?.max} />
    </>
  ) : null;
};

export default Polygons;
