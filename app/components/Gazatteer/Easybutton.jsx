import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
// This import is necessary to register the easyButton plugin with L
import 'leaflet-easybutton/src/easy-button.js'; 

const Easybutton = ({ onClick, icon, title }) => {
  const map = useMap(); // Hook to access the Leaflet map instance

  useEffect(() => {
    if (!map) return;

    // Create the Leaflet EasyButton
    const button = L.easyButton({
      states: [{
        stateName: 'recenter-map', // name of the state
        icon: icon, // icon class (using Font Awesome 6 here)
        title: title, // mouseover title
        onClick: function(control) {
            onClick();
        }
      }]
    });

    // Add the button control to the map
    button.addTo(map);

    // Cleanup function to remove the button when the component unmounts
    return () => {
      map.removeControl(button);
    };
  }, [map, icon, title, onClick]); // Dependencies array

  return null; // This component doesn't render any DOM elements itself
};

export default Easybutton;
