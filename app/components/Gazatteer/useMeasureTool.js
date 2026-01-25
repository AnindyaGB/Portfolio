"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export function useMeasureTool(map) {
  const [isMeasuring, setIsMeasuring] = useState(false);

  const startPoint = useRef(null);
  const tempLine = useRef(null);
  const finalLine = useRef(null)
  const floatingTooltip = useRef(null);
  const finalTooltip = useRef(null);
  const startMarker = useRef(null);

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const cleanup = () => {
    if (!map) return;

    [startMarker.current, tempLine.current, finalLine.current, floatingTooltip.current, finalTooltip.current].forEach(layer => {
      if (layer) map.removeLayer(layer);
    });

    tempLine.current = null;
    finalLine.current = null;
    floatingTooltip.current = null;
    finalTooltip.current = null;
    startPoint.current = null;
  };

  const formatDistance = (a, b) => {
    const meters = map.distance(a, b);
    return meters < 1000
      ? `${Math.round(meters)} m`
      : `${(meters / 1000).toFixed(2)} km`;
  };

  const onMapClick = (e) => {
    if (!isMeasuring) return;

    // If previous measurement exists → reset everything
    if (finalLine.current) {
      cleanup();
    }

    // First tap → create start point
    if (!startPoint.current) {
      startPoint.current = e.latlng;

      if (isTouchDevice) {
        startMarker.current = L.circleMarker(e.latlng, {
          radius: 6,
          color: "#2563eb",
          fillColor: "#2563eb",
          fillOpacity: 1
        }).addTo(map);

        floatingTooltip.current = L.tooltip({
          direction: "top",
          offset: [0, -10],
          className: "measure-tooltip"
        })
          .setLatLng(e.latlng)
          .setContent("Start point selected")
          .addTo(map);
      }

      return;
    }

    // Second tap → finalize line
    finalLine.current = L.polyline(
      [startPoint.current, e.latlng],
      { color: "#2563eb", weight: 3 }
    ).addTo(map);

    if (tempLine.current) {
      map.removeLayer(tempLine.current);
      tempLine.current = null;
    }

    if (startMarker.current) {
      map.removeLayer(startMarker.current);
      startMarker.current = null;
    }

    finalTooltip.current = L.tooltip({
      permanent: true,
      direction: "top",
      offset: [0, -10],
      className: "measure-tooltip"
    })
      .setLatLng(e.latlng)
      .setContent(formatDistance(startPoint.current, e.latlng))
      .addTo(map);

    if (floatingTooltip.current) {
      map.removeLayer(floatingTooltip.current);
      floatingTooltip.current = null;
    }
  };


  const onMouseMove = (e) => {
    if (!isMeasuring || !startPoint.current || finalLine.current) return;
    if (!e.latlng) return; // extra safety guard

    const latlngs = [startPoint.current, e.latlng];

    if (!tempLine.current) {
      tempLine.current = L.polyline(latlngs, {
        dashArray: "5,5",
        color: "#2563eb",
        weight: 2
      }).addTo(map);
    } else {
      tempLine.current.setLatLngs(latlngs);
    }

    const label = formatDistance(startPoint.current, e.latlng);

    if (!floatingTooltip.current) {
      floatingTooltip.current = L.tooltip({
        direction: "top",
        offset: [0, -10],
        className: "measure-tooltip"
      })
        .setLatLng(e.latlng)
        .setContent(label)
        .addTo(map);
    } else {
      floatingTooltip.current
        .setLatLng(e.latlng)
        .setContent(label);
    }
  };


  // Cursor
  useEffect(() => {
    if (!map) return;

    const el = map.getContainer();
    el.style.cursor = isMeasuring ? "crosshair" : "";

    return () => {
      el.style.cursor = "";
    };
  }, [map, isMeasuring]);

  // Map events
  useEffect(() => {
    if (!map) return;

    map.on("click", onMapClick);
    map.on("mousemove", onMouseMove);

    return () => {
      map.off("click", onMapClick);
      map.off("mousemove", onMouseMove);
    };
  }, [map, isMeasuring]);

  // Stop measuring cleanup
  useEffect(() => {
    if (!isMeasuring) cleanup();
  }, [isMeasuring]);

  return {
    isMeasuring,
    toggleMeasuring: (setExternalMeasure) => { setIsMeasuring(prev => !prev); setExternalMeasure(prev => !prev) },
    stopMeasuring: (setExternalMeasure) => { setIsMeasuring(false); setExternalMeasure(false) }
  };
}
