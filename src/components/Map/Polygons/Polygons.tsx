import { FC, useMemo } from "react";
import useApi from "../../../hooks/useAPI";
import { Layer, Source } from "react-map-gl";
import { getLayerStyles, highlightedLayerStyles } from "./getLayerStyles";
import { activeMapType } from "../../../activeMap";
import { useAtom } from "jotai";

type Props = {
  hoverAreaId: string;
};

const Polygons: FC<Props> = ({ hoverAreaId }) => {
  const [activeMap] = useAtom(activeMapType);
  const { data, loading, error } = useApi(activeMap);

  // if (loading || error) return null;
  const layerStyles = getLayerStyles(activeMap);

  const filter = useMemo(() => ["in", "area_id", hoverAreaId], [hoverAreaId]);

  return data ? (
    <Source id="my-data" type="geojson" data={data}>
      {/* @ts-ignore */}
      <Layer {...layerStyles} />
      <Layer {...highlightedLayerStyles} filter={filter} />
    </Source>
  ) : null;
};

export default Polygons;
