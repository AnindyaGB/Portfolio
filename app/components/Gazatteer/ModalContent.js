import WeatherModal from "./modals/WeatherModal";
import CountryModal from "./modals/CountryModal";


export const weatherContent = (countryInfo, weatherInfo) => ({
  header: "Weather at Capital",
  body: (
    <WeatherModal
      countryInfo={countryInfo}
      weatherInfo={weatherInfo}
    />
  )
});

export const countryContent = (countryInfo) => {
  if (!countryInfo) return { header: "Country Info", body: <p>Loading...</p> };
  return {
    header: "Country Information",
    body: <CountryModal countryInfo={countryInfo} />
  };
};


  export const infoContent = {
    header: 'Gazatteer',
    body:
      <div>
        <p>Hi! Welcome to Gazatteer</p>
        <p>Gazatteer is an interactive geospatial web application that allows users to explore countries around the world and instantly access key geographic, demographic, and weather information.</p>
        <p>Users can select or click on a country, and then use the tools to either view information or interact with the map. I encourage you to experiment with the toolbar!</p>
        <p>Built using React, Leaflet, and modern web APIs, Gazatteer demonstrates dynamic data fetching, geospatial visualization, and responsive UI design.</p>
      </div>
  }
