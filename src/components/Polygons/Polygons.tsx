import { useMemo } from "react";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";

import { useAtom } from "jotai";
import Range from "./Range";
import ActiveArea from "./ActiveArea";
import { activeMapType, filterAtom, selectedAreaAtom } from "../../atom";
import useAPI from "../../hooks/useAPI";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const [selectedArea] = useAtom(selectedAreaAtom);
  const [filter] = useAtom(filterAtom);
  const { data } = useAPI(activeMap, filter);

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
