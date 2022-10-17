import { useState } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import getLayerStyles from "./getLayerStyles";

export enum mapType {
  proUsers = "proUsers",
  users = "users",
  gender = "gender",
}

const Polygons = () => {
  const [activeMap, setActiveMap] = useState(mapType.proUsers);
  const { data, loading, error } = useApi(activeMap);

  const layerStyles = getLayerStyles(activeMap);
  console.log(data);
  console.log(layerStyles);

  return data ? (
    <Source id="my-data" type="geojson" data={data}>
      {/* @ts-ignore */}
      <Layer {...layerStyles} />
    </Source>
  ) : null;
};

export default Polygons;
