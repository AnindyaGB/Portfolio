  export const houseMarkerIcon = L.divIcon({
    className: '',
    html: `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
      <defs>
        <!-- Gradient for main pin body -->
        <linearGradient id="leafletGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A90E2"/>
          <stop offset="100%" stop-color="#357ABD"/>
        </linearGradient>
        <!-- Highlight gradient -->
        <radialGradient id="leafletHighlight" cx="0.3" cy="0.3" r="0.4" fx="0.3" fy="0.3">
          <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Marker body -->
      <path d="M12.5 0C19.299 0 25 7.372 25 16.5 25 27.5 12.5 41 12.5 41S0 27.5 0 16.5C0 7.372 5.701 0 12.5 0Z"
            fill="url(#leafletGradient)" stroke="#357ABD" stroke-width="1"/>

      <!-- Highlight at top-right -->
      <path d="M12.5 0C19.299 0 25 7.372 25 16.5 25 27.5 12.5 41 12.5 41S0 27.5 0 16.5C0 7.372 5.701 0 12.5 0Z"
            fill="url(#leafletHighlight)"/>

      <!-- Shadow under tip -->
      <ellipse cx="12.5" cy="41" rx="6" ry="3" fill="rgba(0,0,0,0.25)"/>

      <!-- House icon perfectly scaled to the top circle -->
      <foreignObject x="4" y="4" width="17" height="17">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <i class="fa-solid fa-house-user" style="
            font-size: 14px;
            color: white;
          "></i>
        </div>
      </foreignObject>
    </svg>
  `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  export const cityMarkerIcon = L.divIcon({
    className: '',
    html: `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
      <defs>
        <!-- Gradient for main pin body -->
        <linearGradient id="leafletGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4A90E2"/>
          <stop offset="100%" stop-color="#357ABD"/>
        </linearGradient>
        <!-- Highlight gradient -->
        <radialGradient id="leafletHighlight" cx="0.3" cy="0.3" r="0.4" fx="0.3" fy="0.3">
          <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Marker body -->
      <path d="M12.5 0C19.299 0 25 7.372 25 16.5 25 27.5 12.5 41 12.5 41S0 27.5 0 16.5C0 7.372 5.701 0 12.5 0Z"
            fill="url(#leafletGradient)" stroke="#357ABD" stroke-width="1"/>

      <!-- Highlight at top-right -->
      <path d="M12.5 0C19.299 0 25 7.372 25 16.5 25 27.5 12.5 41 12.5 41S0 27.5 0 16.5C0 7.372 5.701 0 12.5 0Z"
            fill="url(#leafletHighlight)"/>

      <!-- Shadow under tip -->
      <ellipse cx="12.5" cy="41" rx="6" ry="3" fill="rgba(0,0,0,0.25)"/>

      <!-- City icon perfectly scaled to the top circle -->
      <foreignObject x="4" y="4" width="17" height="17">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <i class="fa-solid fa-city" style="
            font-size: 14px;
            color: white;
          "></i>
        </div>
      </foreignObject>
    </svg>
  `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });