import mapboxgl from "mapbox-gl";
import { useState } from "react";
import ReactMap from "react-map-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const [viewState, setViewState] = useState({
    longitude: 77.47,
    latitude: 12.89,
    zoom: 11,
  });

  return (
    <ReactMap
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken={mapboxgl.accessToken}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    />
  );
};

export default Map;
