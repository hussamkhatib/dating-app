import { useMemo } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";
import {
  activeMapType,
  filterAtom,
  SelectedArea,
  selectedAreaAtom,
} from "../../../atom";
import { useAtom } from "jotai";
import Range from "./Range";
import ActiveArea from "./ActiveArea";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const [selectedArea] = useAtom<SelectedArea | null>(selectedAreaAtom);
  const [filter] = useAtom(filterAtom);
  const { data, loading, error } = useApi(activeMap, filter);

  const layerStyles = getLayerStyles(
    activeMap,
    data?.range?.min,
    data?.range?.max
  );

  const filterLayer = useMemo(
    () => ["in", "area_id", selectedArea?.area_id],
    [selectedArea?.area_id]
  );

  return data ? (
    <>
      <Source id="my-data" type="geojson" data={data.areas}>
        {/* @ts-ignore */}
        <Layer {...layerStyles} />
        {selectedArea && (
          <Layer {...highlightedLayerStyles} filter={filterLayer} />
        )}
      </Source>
      {selectedArea && <ActiveArea selectedArea={selectedArea} />}
      <Range min={data?.range?.min} max={data?.range?.max} />
    </>
  ) : null;
};

export default Polygons;
