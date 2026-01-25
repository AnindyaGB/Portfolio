"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-easybutton/src/easy-button.js";
import { useMeasureTool } from "./useMeasureTool";

export default function Toolbar({
  onButtonClick,
  weatherContent,
  toggleBasemap,
  setMoveToCountry,
  infoContent,
  countryInfo,
  weatherInfo,
  setIsMeasuring,
}) {
  const map = useMap();
  const measureButtonRef = useRef(null);
  const { isMeasuring, toggleMeasuring, stopMeasuring } = useMeasureTool(map);

  useEffect(() => {
    if (!map) return;
    // Store buttons so we can clean them up later
    const buttons = [];

    // Country Info button

    buttons.push(
  L.easyButton("fa-solid fa-globe", () => {
    stopMeasuring(setIsMeasuring);
    //if (!countryInfo?.countryName) return; // prevent opening empty
    onButtonClick("country");
  }, "Country Information").addTo(map)
);

    // Weather Info button - wrap in function to get latest state
    buttons.push(
      L.easyButton("fa-solid fa-cloud-sun", () => {
        stopMeasuring(setIsMeasuring);
        onButtonClick("weather");
      }, "Weather Information").addTo(map)
    );

    // Measure distance button
    const measureBtn = L.easyButton(
      "fa-solid fa-ruler", () => {
      toggleMeasuring(setIsMeasuring);
      }, "Measure distance"
    ).addTo(map);
    measureButtonRef.current = measureBtn;
    buttons.push(measureBtn);

    // Fit to country button
    buttons.push(
      L.easyButton("fa-solid fa-expand", () => {
        stopMeasuring(setIsMeasuring);
        onButtonClick('fit')
      }, "Fit to Country").addTo(map)
    );

    // Toggle basemap button
    buttons.push(
      L.easyButton("fa-solid fa-layer-group", () => {
        stopMeasuring(setIsMeasuring);
        toggleBasemap();
      }, "Toggle Basemap").addTo(map)
    );

    // Gazetteer info button
    buttons.push(
      L.easyButton("fa-solid fa-circle-info", () => {
        stopMeasuring(setIsMeasuring);
        onButtonClick('about');
      }, "Gazetteer Information").addTo(map)
    );

    // Cleanup on unmount
    return () => buttons.forEach(btn => map.removeControl(btn));

  // Add countryInfo and weatherInfo as dependencies so the easy button always uses latest state
  }, [map, weatherContent, infoContent, countryInfo, weatherInfo, toggleBasemap, setMoveToCountry, stopMeasuring, toggleMeasuring, setIsMeasuring, isMeasuring]);

  // Style measure button based on isMeasuring
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
