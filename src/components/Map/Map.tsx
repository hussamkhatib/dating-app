import { useSetAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import { useState, useCallback, useRef } from "react";
import ReactMap, { MapRef } from "react-map-gl";
import selectedAreaAtom from "../../selectedArea";
import Filter from "../Filter";
import NavBar from "../NavBar";
import Polygons from "./Polygons";
import Tooltip from "./Tooltip";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapRef = useRef<MapRef>(null);
  const setSelectedAtom = useSetAtom(selectedAreaAtom);
  const [viewState, setViewState] = useState({
    longitude: 77.57,
    latitude: 12.89,
    zoom: 12,
    pitch: 45,
    bearing: 340,
  });
  const [hoverInfo, setHoverInfo] = useState<any>(null);

  const handleClick = (e: any) => {
    const { features } = e;

    if (features[0]) {
      const { area_id } = features[0].properties;
      setSelectedAtom(area_id);
    }
  };

  /* @ts-ignore TODO: //FIX THIS */
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features?.[0] && features[0].properties;
    setHoverInfo(hoveredFeature && { property: hoveredFeature, x, y });
  }, []);

  const onSelectCity = useCallback(
    ({ longitude, latitude }: { longitude: number; latitude: number }) => {
      mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
    },
    []
  );

  return (
    <>
      <NavBar onSelectCity={onSelectCity} />
      <ReactMap
        {...viewState}
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={mapboxgl.accessToken}
        interactiveLayerIds={["data"]}
        onClick={handleClick}
        onMouseMove={onHover}
        mapStyle="mapbox://styles/mapbox/dark-v10"
      >
        <Polygons />
        <Filter />
        <Tooltip hoverInfo={hoverInfo} />
      </ReactMap>
    </>
  );
};

export default Map;
