"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import { useMeasureTool } from "./useMeasureTool";
import { toggleBasemap } from "./basemaps";

export default function Toolbar({
  onButtonClick,
  setBasemap,
  setIsMeasuring,
}) {
  const map = useMap();
  const measureButtonRef = useRef(null);
  const { isMeasuring, toggleMeasuring, stopMeasuring } = useMeasureTool(map);

  useEffect(() => {
    if (!map) return;
    const buttons = [];

    buttons.push(
  L.easyButton("fa-solid fa-globe", () => {
    stopMeasuring(setIsMeasuring);
    onButtonClick("country");
  }, "Country Information").addTo(map)
);

    buttons.push(
      L.easyButton("fa-solid fa-cloud-sun", () => {
        stopMeasuring(setIsMeasuring);
        onButtonClick("weather");
      }, "Weather Information").addTo(map)
    );

    const measureBtn = L.easyButton(
      "fa-solid fa-ruler", () => {
      toggleMeasuring(setIsMeasuring);
      }, "Measure distance"
    ).addTo(map);
    measureButtonRef.current = measureBtn;
    buttons.push(measureBtn);

    buttons.push(
      L.easyButton("fa-solid fa-expand", () => {
        stopMeasuring(setIsMeasuring);
        onButtonClick('fit')
      }, "Fit to Country").addTo(map)
    );

    buttons.push(
      L.easyButton("fa-solid fa-layer-group", () => {
        stopMeasuring(setIsMeasuring);
        toggleBasemap(setBasemap);
      }, "Toggle Basemap").addTo(map)
    );

    buttons.push(
      L.easyButton("fa-solid fa-circle-info", () => {
        stopMeasuring(setIsMeasuring);
        onButtonClick('about');
      }, "Gazetteer Information").addTo(map)
    );

    return () => buttons.forEach(btn => map.removeControl(btn));

  }, [map, toggleBasemap, stopMeasuring, toggleMeasuring, setIsMeasuring, isMeasuring]);

  useEffect(() => {
    if (!measureButtonRef.current) return;
    const el = measureButtonRef.current.button || measureButtonRef.current._container;
    if (!el) return;

    el.style.backgroundColor = isMeasuring ? "var(--accent)" : "";
    el.style.borderColor = isMeasuring ? "var(--accent)" : "";

    const icon = el.querySelector("i");
    if (icon) icon.style.color = isMeasuring ? "white" : "";
  }, [isMeasuring]);

  return null;
}
