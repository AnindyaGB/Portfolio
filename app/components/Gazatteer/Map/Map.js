"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Navbar from './Navber'
import Easybutton from '../Easybutton'
import Modal from '../Modal'
import L, {divIcon} from 'leaflet';
import houseIcon from './house.png';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import styles from './Map.module.css'
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet/dist/leaflet.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'leaflet.icon.glyph';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON, useMap } from 'react-leaflet'


import countriesGeoJson from './custom.geo.json'
import Image from 'next/image'

export default function Map() {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [listOfCountries, setListOfCountries] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [countryGeoJSON, setCountryGeoJSON] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [countryInfo, setCountryInfo] = useState({});
  const [capitalCityInfo, setCapitalCityInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [moveToCountry, setMoveToCountry] = useState(false);
  const [basemap, setBasemap] = useState({
    name: 'osm',
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  })

  //Get Dropdownlist
  useEffect(() => {
    const countries = [];

    countriesGeoJson.features.forEach(feature => {
      const country = {}
      country['value'] = feature.properties['iso_a3']
      country['label'] = feature["properties"]['name'];
      countries.push(country)
    })
    countries.sort(function (a, b) {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    setListOfCountries(countries)

  }, []);

const houseMarkerIcon = L.divIcon({
  className: "",
      html: `<img src={'./house.png'} style='width: 100%; height: auto;' alt='marker icon'/>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

  //Detect user location and place marker
  function LocationMarker() {

    const map = useMap();

    useEffect(() => {
      if (userCoordinates) return;
      map.locate().on("locationfound", function (e) {
        setUserCoordinates(e.latlng);
        map.flyTo(e.latlng, map.getZoom());

      });
    }, [map]);


    return userCoordinates === null ? null : (
      <Marker position={userCoordinates} icon={houseMarkerIcon} >
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  //reverse Geocode api
  const fetchCountryName = useCallback(async (lat, lng) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lng}&key=341d4f9cc3c14d81b2c20be7feadcf2e`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const country = result.results[0]
      const countryName = country.components['country'];
      if (!countryName) return;
      setSelectedCountry({ value: country.components['ISO_3166-1_alpha-3'], label: countryName })
    } catch (err) {

    } finally {
    }
  }, []);

    //fetch Country info
  const fetchRestCountries = useCallback(async (name) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const countryName = result[0].name.official;

      const capitalCity = result[0].capital[0];
      const continent = result[0].continents[0];
      const languages =  Object.values(result[0].languages).join(', ');
      const population = result[0].population;
                       

      const flag = result[0].flags;
      setCountryInfo({countryName, capitalCity, continent, languages, population, flag});
      const capitalCityDetails = { name: capitalCity, position: result[0].capitalInfo.latlng };
      setCapitalCityInfo(capitalCityDetails);

    } catch (err) {

    } finally {
    }
  }, []);

    const fetchWeatherAtCapital = useCallback(async (position) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8d2380a6fa8b4df0886201459261101&q=${position}&aqi=no`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const weather = result.current;
      const condition = weather.condition;
      const realTemp = weather.temp_c;
      const feelsLikeTemp = weather.feelslike_c;
      const windSpeed = weather.wind_kph;
      const humidity = weather.humidity;
      const lastUpdated = weather.last_updated.replaceAll('-', '/').replaceAll(' ', ' - ');
      setWeatherInfo({condition, realTemp, feelsLikeTemp, windSpeed, humidity, lastUpdated})
    } catch (err) {

    } finally {
    }
  }, []);


  //get country if user shares location
  useEffect(() => {
    if (selectedCountry || !userCoordinates) return;

    fetchCountryName(userCoordinates.lat, userCoordinates.lng);

  }, [fetchCountryName, selectedCountry, userCoordinates])

  //get geojson on country switch
  useEffect(() => {
    if (!selectedCountry) return;

    countriesGeoJson.features.forEach(feature => {
      if (feature.properties.iso_a3 === selectedCountry.value) {
        setCountryGeoJSON(feature);
      }
    })
    fetchRestCountries(selectedCountry.value)
  }, [selectedCountry, fetchRestCountries])

  // key for updating geojson on country switch
  const geoJsonKey = JSON.stringify(countryGeoJSON);

  // get country on click
  function Nothing() {

    useMapEvents({
      click(e) {

        fetchCountryName(e.latlng.lat, e.latlng.lng)
      },
    })
  }

  const infoContent = {
    header: 'Gazatteer',
    body:
      <div>
        <p>Hi! Welcome to Gazatteer</p>
        <p>Gazatteer is a geospacial application allowing users to find information on countries around the world.</p>
        <p>Either select a country from the dropdown, or click the country on the map to retrieve information about that country. Then you can use the side buttons to view the information.</p>
      </div>
  }

  const countryContent = {
    header: 'Country Information',
    body: 
    <table className="table" id="table">
      <tbody>
        <tr>
          <td>Country Name: </td>
          <td>{countryInfo.countryName}</td>
        </tr>

        <tr>
          <td>Capital City: </td>
          <td >{countryInfo.capitalCity}</td>
        </tr>
        <tr>
          <td>Continent: </td>
          <td >{countryInfo.continent}</td>
        </tr>
                <tr>
          <td>Languages: </td>
          <td >{countryInfo.languages}</td>
        </tr>
        <tr>
          <td>Population: </td>
          <td >{countryInfo.population?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr className='border-b-0'>
          <td>Flag: </td>
          <td><Image src={countryInfo.flag?.svg} alt={countryInfo.flag?.alt || 'Country Flag'}  width="100" height='75' /></td>
        </tr>
      </tbody>
    </table>
  }

    const weatherContent = {
    header: 'Weather at Capital',
    body: 
    <table className="table" id="table">
      <tbody>
        <tr>
          <td>Location: </td>
          <td>{countryInfo.capitalCity}</td>
        </tr>
        <tr>
          <td>Weather: </td>
          <td className='display:inline'>
            {weatherInfo.condition?.text}
            <Image src={`https:${weatherInfo.condition?.icon}`} alt='' width="50" height='25' />
            </td>
        </tr>
        <tr>
          <td>Temperature (°C): </td>
          <td >{weatherInfo.realTemp}</td>
        </tr>
                <tr>
          <td>Feels Like (°C): </td>
          <td >{weatherInfo.feelsLikeTemp}</td>
        </tr>
                <tr>
          <td>Wind Speed (kph): </td>
          <td >{weatherInfo.windSpeed}</td>
        </tr>
        <tr>
          <td>Humidity (%): </td>
          <td >{weatherInfo.humidity}</td>
        </tr>
        <tr>
          <td>Last Updated (Local Time): </td>
          <td >{weatherInfo.lastUpdated}</td>
        </tr>
      </tbody>
    </table>
  }

  const onButtonClick = useCallback(content => {
    setShowModal(true);
    setModalContent(content);
  }, [])

    useEffect(() => {
    if (!capitalCityInfo) return;

    fetchWeatherAtCapital(capitalCityInfo.position)

  }, [fetchWeatherAtCapital, capitalCityInfo])

function RecenterMapToBounds() {

  const map = useMap(); // Get the map instance
  
  // Use an effect to fit the bounds when the component mounts or bounds change
  useEffect(() => {
    if (map && moveToCountry) {
      const bounds = L.geoJSON(countryGeoJSON).getBounds();
      map.fitBounds(bounds, { padding: [2, 2] }); // Optional padding
      setMoveToCountry(false);
    }
  }, [map]);

  return null; // This component doesn't render anything
}

const toggleBasemap = useCallback(() => {
  if (basemap.name === 'osm'){
    setBasemap(
      {
    name: 'esri',
    attribution:'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  }
    )
  } else {
    setBasemap(
      {
    name: 'osm',
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  }
    )
  }
},[basemap.name])

  return (
    <div>
      <Navbar selectOptions={listOfCountries} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
      <MapContainer className={styles.map} center={[0, 0]} zoom={3} scrollWheelZoom={true}
      >
        <Easybutton icon={'fa-solid fa-globe'} title={'Country Information'} onClick={() => onButtonClick(countryContent)} />
        <Easybutton icon={'fa-solid fa-cloud-sun'} title={'Weather Information'} onClick={() => onButtonClick(weatherContent)} />
        <Easybutton icon={'fa-solid fa-expand'} title={'Fit to Country'} onClick={() => setMoveToCountry(true)} />
        <Easybutton icon={'fa-solid fa-layer-group'} title={'Toggle Basemap'} onClick={() => toggleBasemap()} />
        <Easybutton icon={'fa-solid fa-circle-info'} title={'Gazatteer Information'} onClick={() => onButtonClick(infoContent)} />

        <Modal show={showModal} onClose={() => setShowModal(false)} content={modalContent} />

        <TileLayer
          attribution={basemap.attribution}
          url={basemap.url}
        />
        <GeoJSON key={geoJsonKey} data={countryGeoJSON} />
        <LocationMarker />
        {capitalCityInfo && <Marker position={capitalCityInfo.position} >
        <Popup>{capitalCityInfo.name}</Popup>
      </Marker>

        }
        <Nothing />
        <RecenterMapToBounds />
      </MapContainer>
    </div>
  )
}
