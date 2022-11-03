import { useSetAtom } from "jotai";
import mapboxgl, { MapLayerMouseEvent } from "mapbox-gl";
import { useState, useCallback, useRef } from "react";
import ReactMap, { MapRef } from "react-map-gl";
import { selectedAreaAtom } from "../../atom";
import { HoverInfoType } from "../../types";
import Filter from "../Filter";
import NavBar from "../NavBar";
import Polygons from "../Polygons";
import Tooltip from "../Tooltip";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    longitude: 77.57,
    latitude: 12.89,
    zoom: 10.4,
    pitch: 45,
    bearing: 340,
  });
  const [hoverInfo, setHoverInfo] = useState<HoverInfoType | null>(null);

  const setSelectedAtom = useSetAtom(selectedAreaAtom);

  const handleClick = (e: MapLayerMouseEvent) => {
    const { features } = e;
    features?.[0]
      ? setSelectedAtom(features[0].properties)
      : setSelectedAtom(null);
  };

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features?.[0] && features[0].properties;
    if (hoveredFeature) {
      const hoverInfo = { property: hoveredFeature, x, y };
      setHoverInfo(hoverInfo);
    } else setHoverInfo(null);
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
