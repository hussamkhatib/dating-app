import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import getLayerStyles from "./getLayerStyles";
import { activeMapType } from "../../../activeMap";
import { useAtom } from "jotai";

const Polygons = () => {
  const [activeMap] = useAtom(activeMapType);
  const { data, loading, error } = useApi(activeMap);

  console.log(loading, error, data);

  if (loading || error) return null;
  const layerStyles = getLayerStyles(activeMap);

  return data ? (
    <Source id="my-data" type="geojson" data={data}>
      {/* @ts-ignore */}
      <Layer {...layerStyles} />
    </Source>
  ) : null;
};

export default Polygons;
