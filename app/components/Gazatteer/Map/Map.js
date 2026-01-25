"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Navbar from './Navber'
import Modal from '../Modal'
import L from 'leaflet'
import Toolbar from '../Toolbar'
import FloatingCountryCard from "../FloatingCountryCard";
import CountryModal from '../modals/CountryModal'
import WeatherModal from '../modals/WeatherModal'
import { weatherContent, countryContent, infoContent } from '../ModalContent'
import { houseMarkerIcon, cityMarkerIcon } from '../markers'
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import styles from './Map.module.css'
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet/dist/leaflet.css'
import 'leaflet.icon.glyph';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap, useMapEvents } from 'react-leaflet'
import { Spinner, Toast, ToastHeader, ToastBody } from "reactstrap";
import countriesGeoJson from './custom.geo.json'

export default function Map() {

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [listOfCountries, setListOfCountries] = useState([])
  const [countryGeoJSON, setCountryGeoJSON] = useState(null)
  const [userCoordinates, setUserCoordinates] = useState(null)
  const [capitalCityInfo, setCapitalCityInfo] = useState(null)
  const [countryInfo, setCountryInfo] = useState({})
  const [weatherInfo, setWeatherInfo] = useState({})
  const [moveToCountry, setMoveToCountry] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState(false)
  const [isMeasuring, setIsMeasuring] = useState(false)


  const [compareCountryInfo, setCompareCountryInfo] = useState(null);

  const [basemap, setBasemap] = useState({
    name: 'osm',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  })
  const [activeModal, setActiveModal] = useState(null);
  // "country" | "weather" | "info" | null


  const normalizeLng = (lng) => ((((lng + 180) % 360) + 360) % 360) - 180;

  // Dropdown list
  useEffect(() => {
    const countries = countriesGeoJson.features.map(f => ({
      value: f.properties.iso_a3,
      label: f.properties.name
    })).sort((a, b) => a.label.localeCompare(b.label))
    setListOfCountries(countries)
  }, [])

  useEffect(() => {
    if (listOfCountries.length > 0) setLoading(false)
  }, [listOfCountries])

  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(timer)
  }, [showToast])

  // Fetch country info by lat/lng
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

  // Fetch full country info
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

  // Fetch country on user location
  useEffect(() => {
    if (selectedCountry || !userCoordinates) return
    setLoading(true)
    fetchCountryName(userCoordinates.lat, normalizeLng(userCoordinates.lng))
  }, [selectedCountry, userCoordinates, fetchCountryName])

  // Fetch country info when selected
  useEffect(() => {
    if (!selectedCountry) return
    countriesGeoJson.features.forEach(f => {
      if (f.properties.iso_a3 === selectedCountry.value) setCountryGeoJSON(f)
    })
    fetchRestCountries(selectedCountry.value)
  }, [selectedCountry, fetchRestCountries])

  // Map click handler
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (isMeasuring) return
        setLoading(true)
        fetchCountryName(e.latlng.lat, normalizeLng(e.latlng.lng))
      }
    })
  }

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


  useEffect(() => {
    if (!capitalCityInfo) return
    fetchWeatherAtCapital(capitalCityInfo.position)
    setLoading(false)
  }, [capitalCityInfo, fetchWeatherAtCapital])

  function RecenterMapToBounds() {
    const map = useMap()
    useEffect(() => {
      if (!map || !moveToCountry || !countryGeoJSON) return
      const bounds = L.geoJSON(countryGeoJSON).getBounds()
      map.flyToBounds(bounds, { padding: [2, 2], duration: 0.8 })
      setMoveToCountry(false)
    }, [map, moveToCountry, countryGeoJSON])
    return null
  }

  const toggleBasemap = useCallback(() => {
    setBasemap(prev => prev.name === 'osm'
      ? { name: 'esri', attribution: 'Tiles &copy; Esri', url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" }
      : { name: 'osm', attribution: '&copy; OpenStreetMap contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" })
  }, [])

  const defaultCountryStyle = {
    color: "var(--accent)",
    weight: 2,
    fillColor: "var(--accent)",
    fillOpacity: 0.15
  }

  function LocationMarker() {
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
          countryInfo={countryInfo}
          weatherInfo={weatherInfo}
          weatherContent={weatherContent}
          toggleBasemap={toggleBasemap}
          setMoveToCountry={setMoveToCountry}
          infoContent={infoContent}
          setIsMeasuring={setIsMeasuring}
        />
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setCompareCountryInfo(null);
            setActiveModal(null);
          }}
          className={
            activeModal === "country" && compareCountryInfo
              ? styles['modal-wide']
              : ""
          }
          content={{
            header:
              activeModal === "country"
                ? "Country Information"
                : activeModal === "weather"
                  ? "Weather at Capital"
                  : "Gazetteer",

            body:
              activeModal === "country" ? (
                <CountryModal
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
                />
              ) : activeModal === "weather" ? (
                <WeatherModal
                  countryInfo={countryInfo}
                  weatherInfo={weatherInfo}
                />
              ) : activeModal === "about" ?(
                infoContent.body
              ) : null
          }}
        />


        <TileLayer attribution={basemap.attribution} url={basemap.url} />
        {countryGeoJSON && <GeoJSON key={countryGeoJSON.properties.iso_a3} data={countryGeoJSON} style={defaultCountryStyle} />}
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
