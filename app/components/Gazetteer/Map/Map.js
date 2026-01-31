"use client"
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'

import Navbar from './Navber'
import Modal from '../Modal'
import Toolbar from '../Toolbar'
import FloatingCountryCard from "../FloatingCountryCard";
import CountryModal from '../modals/CountryModal'
import WeatherModal from '../modals/WeatherModal'
import AboutModal from '../modals/AboutModal'
import { houseMarkerIcon, cityMarkerIcon } from '../markers'
import { OSM } from '../basemaps'
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet.icon.glyph';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvents } from 'react-leaflet'

import countriesGeoJson from './custom.geo.json'

import { Spinner, Toast, ToastHeader, ToastBody } from "reactstrap";
import styles from './Map.module.css'

const Map = () => {

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [capitalCityInfo, setCapitalCityInfo] = useState(null)
  const [countryInfo, setCountryInfo] = useState({})
  const [weatherInfo, setWeatherInfo] = useState({})
  const [moveToCountry, setMoveToCountry] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [isMeasuring, setIsMeasuring] = useState(false)

  const [compareCountryInfo, setCompareCountryInfo] = useState(null);

  const [basemap, setBasemap] = useState(OSM)
  const [activeModal, setActiveModal] = useState(null);

  const lastFetchedRef = useRef(null);

  const normalizeLng = (lng) => ((((lng + 180) % 360) + 360) % 360) - 180;

  const listOfCountries = useMemo(() => {
    return countriesGeoJson.features
      .map(f => ({
        value: f.properties.iso_a3,
        label: f.properties.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, []);


  useEffect(() => {
    if (listOfCountries.length > 0) setLoading(false)
  }, [listOfCountries])

  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(timer)
  }, [showToast])


  const fetchCountryName = useCallback(async (lat, lng) => {
    try {
      const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`)
      if (!res.ok) throw new Error('Reverse geocode failed')

      const data = await res.json()
      if (!data.country) {
        setToastMessage('No country at this location')
        setShowToast(true)
        return
      }
      setSelectedCountry({ value: data.iso3, label: data.country })
    } catch (err) {
      console.error(err)
      setToastMessage("Unable to determine country for this location.")
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchRestCountries = useCallback(async (code, compare) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const result = await response.json();
    const c = result[0];
    if (!compare) {

      setCountryInfo({
        countryName: c.name.official,
        capitalCity: c.capital[0],
        continent: c.continents[0],
        languages: Object.values(c.languages).join(', '),
        population: c.population,
        flag: c.flags,
        value: c.cca3
      });
      setCapitalCityInfo({ name: c.capital[0], position: c.capitalInfo.latlng });
    }
    return {
      countryName: c.name.official,
      capitalCity: c.capital[0],
      continent: c.continents[0],
      languages: Object.values(c.languages).join(', '),
      population: c.population,
      flag: c.flags,
      value: c.cca3
    };
  }, []);

  const fetchWeatherAtCapital = useCallback(async ([lat, lng]) => {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}`)
      if (!res.ok) throw new Error('Weather fetch failed')
      const data = await res.json()
      setWeatherInfo({
        condition: data.condition,
        realTemp: data.temp,
        feelsLikeTemp: data.feelsLike,
        windSpeed: data.wind,
        humidity: data.humidity,
        lastUpdated: data.lastUpdated.replaceAll('-', '/').replaceAll(' ', ' - ')
      })
    } catch (err) { console.error(err) }
  }, [])

  useEffect(() => {
    if (selectedCountry || !userCoordinates) return
    setLoading(true)
    fetchCountryName(userCoordinates.lat, normalizeLng(userCoordinates.lng))
  }, [selectedCountry, userCoordinates, fetchCountryName])

  const countryFeatureMap = useMemo(() => {
    const map = {};

    countriesGeoJson.features.forEach(f => {
      map[f.properties.iso_a3] = f;
    });

    return map;
  }, []);

  const countryGeoJSON = useMemo(() => {
    if (!selectedCountry) return null;
    return countryFeatureMap[selectedCountry.value] || null;
  }, [selectedCountry, countryFeatureMap]);

  useEffect(() => {
    if (!selectedCountry) return;
    if (lastFetchedRef.current === selectedCountry.value) return;

    lastFetchedRef.current = selectedCountry.value;
    fetchRestCountries(selectedCountry.value);
  }, [selectedCountry, fetchRestCountries]);

  useEffect(() => {
    if (!capitalCityInfo) return
    fetchWeatherAtCapital(capitalCityInfo.position)
    setLoading(false)
  }, [capitalCityInfo, fetchWeatherAtCapital])

  const MapClickHandler = useCallback(() => {
    useMapEvents({
      click(e) {
        if (isMeasuring) return
        setLoading(true)
        fetchCountryName(e.latlng.lat, normalizeLng(e.latlng.lng))
      }
    })
  }, [isMeasuring])

  const onButtonClick = useCallback((type) => {
    if (
      (type === "country" || type === "weather" || type === "fit") &&
      !countryInfo?.countryName
    ) {
      setToastMessage("Please select a country first");
      setShowToast(true);
      return;
    }

    if (type === "fit") {
      setMoveToCountry(true);
      return;
    }

    setActiveModal(type);
    setShowModal(true);
  }, [countryInfo]);
  
  const RecenterMapToBounds = () => {
    const map = useMap()
    useEffect(() => {
      if (!map || !moveToCountry || !countryGeoJSON) return
      const bounds = L.geoJSON(countryGeoJSON).getBounds()
      map.flyToBounds(bounds, { padding: [2, 2], duration: 0.8 })
      setMoveToCountry(false)
    }, [map, moveToCountry, countryGeoJSON])
    return null
  }

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (userCoordinates) return;

      map.locate().on("locationfound", function (e) {
        setUserCoordinates(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    if (!userCoordinates) return null;

    return (
      <Marker position={userCoordinates} icon={houseMarkerIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const modalHeader = useMemo(() => {
    switch (activeModal) {
      case 'country':
        return 'Country Information';
      case 'weather':
        return 'Weather Information';
      case 'about':
        return 'Gazetteer';
      default:
        return null;
    }
  }, [activeModal])

  const modalBody = useMemo(() => {
    switch (activeModal) {
      case 'country':
        return <CountryModal
          countryInfo={countryInfo}
          compareCountryInfo={compareCountryInfo}
          listOfCountries={listOfCountries}
          onCompare={async (country) => {
            if (!country) {
              setCompareCountryInfo(null);
              return;
            }

            const data = await fetchRestCountries(country.value, true);
            setCompareCountryInfo(data);
          }}
        />;
      case 'weather':
        return <WeatherModal
          countryInfo={countryInfo}
          weatherInfo={weatherInfo}
        />;
      case 'about':
        return <AboutModal />
      default:
        return null;
    }
  }, [activeModal, countryInfo, compareCountryInfo, listOfCountries, weatherInfo])

  return (
    <div>
      {showToast && (
        <div style={{ position: "fixed", top: "10%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2000 }} className="p-3 bg-danger my-2 rounded">
          <Toast style={{ minWidth: "300px" }} isOpen>
            <ToastHeader toggle={() => setShowToast(false)}>Error</ToastHeader>
            <ToastBody>{toastMessage}</ToastBody>
          </Toast>
        </div>
      )}
      {loading && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.3)", zIndex: 1000 }}>
          <Spinner style={{ width: '3rem', height: '3rem' }}>Loading...</Spinner>
        </div>
      )}
      <Navbar selectOptions={listOfCountries} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
      <MapContainer
        className={styles.map}
        center={[0, 0]}
        zoom={3}
        scrollWheelZoom={true}
        worldCopyJump={false}
        maxBounds={[[-90, -225], [90, 225]]}
        maxBoundsViscosity={0.9}
      >
        <Toolbar
          onButtonClick={onButtonClick}
          setBasemap={setBasemap}
          setIsMeasuring={setIsMeasuring}
        />
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setCompareCountryInfo(null);
            setActiveModal(null);
          }}
          className={activeModal === "country" && compareCountryInfo ? styles['modal-wide'] : ""}
          content={{ header: modalHeader, body: modalBody }}
        />
        <TileLayer attribution={basemap.attribution} url={basemap.url} />
        {countryGeoJSON && <GeoJSON key={countryGeoJSON.properties.iso_a3} data={countryGeoJSON} style={{color: "var(--accent)", weight: 2, fillColor: "var(--accent)", fillOpacity: 0.15 }} />}
        <LocationMarker />
        {capitalCityInfo && <Marker position={capitalCityInfo.position} icon={cityMarkerIcon}><Popup>{capitalCityInfo.name}</Popup></Marker>}
        <MapClickHandler />
        <RecenterMapToBounds />
      </MapContainer>

      <FloatingCountryCard
        countryInfo={countryInfo}
        onOpen={() => {
          if (!countryInfo?.countryName) return;
          setCompareCountryInfo(null);
          setActiveModal("country");
          setShowModal(true);
        }}
      />
    </div>
  )
}

export default Map;