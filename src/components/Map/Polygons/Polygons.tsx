import { FC, useMemo } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";
import { activeMapType } from "../../../activeMap";
import { useAtom } from "jotai";
import selectedAreaAtom from "../../../selectedArea";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const [selectedArea] = useAtom(selectedAreaAtom);
  const { data, loading, error } = useApi(activeMap);

  // if (loading || error) return null;
  const layerStyles = getLayerStyles(activeMap);

  const filter = useMemo(() => ["in", "area_id", selectedArea], [selectedArea]);

  return data ? (
    <Source id="my-data" type="geojson" data={data}>
      {/* @ts-ignore */}
      <Layer {...layerStyles} />
      <Layer {...highlightedLayerStyles} filter={filter} />
    </Source>
  ) : null;
};

export default Polygons;
