import React from "react";
import ReactDOM from "react-dom/client";
import Map from "../src/components/Map";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Map />
  </React.StrictMode>
);
