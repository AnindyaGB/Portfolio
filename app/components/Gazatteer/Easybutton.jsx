import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-easybutton/src/easy-button.js';

import styles from './Map/Map.module.css'

const Easybutton = ({ onClick, icon, title, isActive }) => {
  const map = useMap(); 
  const buttonRef = useRef(null); // ref to store the Leaflet EasyButton instance

  useEffect(() => {
    if (!map) return;

    // Create the Leaflet EasyButton
    const button = L.easyButton({
      states: [{
        stateName: 'custom-button',
        icon: icon,
        title: title,
        onClick: () => onClick()
      }],
      // onAdd fires when the button is added to the map
      onAdd: (mapInstance) => {
        const btnEl = button.button || button._container; // Leaflet internal reference
        buttonRef.current = btnEl;

        // Apply active class if isActive is true initially
        if (isActive) {
          btnEl.classList.add('easy-button-active');
        }

        return btnEl;
      }
    });

    button.addTo(map);

    return () => {
      map.removeControl(button);
    };
  }, [map, icon, title, onClick]);

  // Watch `isActive` and toggle the class dynamically
  useEffect(() => {
    if (!buttonRef.current) return;

    if (isActive) {
      buttonRef.current.classList.add('easy-button-active');
    } else {
      buttonRef.current.classList.remove('easy-button-active');
    }
  }, [isActive]);

  return null;
};

export default Easybutton;
