import mapboxgl from "mapbox-gl";
import { useState, useCallback } from "react";
import ReactMap from "react-map-gl";
import Polygons from "./Polygons";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [viewState, setViewState] = useState({
    longitude: 77.57,
    latitude: 12.89,
    zoom: 10.4,
    pitch: 45,
    bearing: 340,
  });
  const [hoverInfo, setHoverInfo] = useState<any>(null);

  const handleClick = (e: any) => {
    const { features } = e;

    if (features[0]) {
      // dispatch(setActiveArea(features[0].properties));
      // dispatch(openLeftPanel());
    }
  };

  /* @ts-ignore TODO: //FIX THIS */
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    // setHoverInfo({ x, y });
    const hoveredFeature = features?.[0] && features[0].properties;
    // setHoverInfo(hoveredFeature && { property: hoveredFeature, x, y });
  }, []);

  return (
    <ReactMap
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken={mapboxgl.accessToken}
      interactiveLayerIds={["data"]}
      onClick={handleClick}
      onMouseMove={onHover}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      <Polygons />
    </ReactMap>
  );
};

export default Map;
