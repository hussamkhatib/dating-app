import { useMemo } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";
import { activeMapType } from "../../../activeMap";
import { useAtom } from "jotai";
import selectedAreaAtom, { SelectedArea } from "../../../selectedArea";
import { filterAtom } from "../../../filterAtom";
import Range from "./Range";
import ActiveArea from "./ActiveArea";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const [selectedArea] = useAtom<SelectedArea | null>(selectedAreaAtom);
  const [filter] = useAtom(filterAtom);
  const { data, loading, error } = useApi(activeMap, filter);

  // if (loading || error) return null;

  const layerStyles = getLayerStyles(
    activeMap,
    data?.range?.min,
    data?.range?.max
  );

  const filterLayer = useMemo(
    () => ["in", "area_id", selectedArea?.area_id],
    [selectedArea?.area_id]
  );
  console.log(selectedArea?.area_id);

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
