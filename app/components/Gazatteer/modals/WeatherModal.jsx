import Image from "next/image";

import styles from '../Map/Map.module.css'

const WeatherModal = ({ countryInfo, weatherInfo }) => {

if (!countryInfo?.capitalCity || !weatherInfo?.condition) return <p>Loading...</p>;
  return (
    <>
      <table className={`table ${styles.alignTable}`}>
        <tbody>
          <tr>
            <th>Location</th>
            <th>{countryInfo.capitalCity}</th>
          </tr>

          <tr>
            <td>Weather</td>
            <td style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>{weatherInfo.condition?.text}</span>

              {weatherInfo.condition?.icon && (
                <Image
                  src={`https:${weatherInfo.condition.icon}`}
                  alt="Weather Icon"
                  width={40}
                  height={40}
                />
              )}
            </td>
          </tr>

          <tr>
            <td>Temperature (°C)</td>
            <td>{weatherInfo.realTemp}</td>
          </tr>

          <tr>
            <td>Feels Like (°C)</td>
            <td>{weatherInfo.feelsLikeTemp}</td>
          </tr>

          <tr>
            <td>Wind Speed (kph)</td>
            <td>{weatherInfo.windSpeed}</td>
          </tr>

          <tr>
            <td>Humidity (%)</td>
            <td>{weatherInfo.humidity}</td>
          </tr>

          <tr>
            <td>Last Updated</td>
            <td>{weatherInfo.lastUpdated}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WeatherModal;