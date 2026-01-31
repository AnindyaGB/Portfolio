// CountryModal.jsx
import React from "react";
import Select from "react-select";
import Image from "next/image";

import styles from '../Map/Map.module.css'

const CountryModal = ({
  countryInfo,
  compareCountryInfo,
  onCompare,
  listOfCountries
}) => {

  // Still loading
  if (!countryInfo || !countryInfo.countryName) {
    return <p>Loading...</p>;
  }

  const renderRow = (label, a, b) => (
    <tr>
      <td>{label}</td>
      <td>{a}</td>
      {b !== undefined && <td>{b}</td>}
    </tr>
  );

  return (
    <div>
<table className={`table ${styles.alignTable}`} style={{ width: "100%" }}>
          <thead>
          <tr>
            <th>Country</th>
            <th>{countryInfo.countryName}</th>
            {compareCountryInfo && (
              <th>{compareCountryInfo.countryName}</th>
            )}
          </tr>
        </thead>

        <tbody>
          {renderRow(
            "Capital City",
            countryInfo.capitalCity,
            compareCountryInfo?.capitalCity
          )}

          {renderRow(
            "Continent",
            countryInfo.continent,
            compareCountryInfo?.continent
          )}

          {renderRow(
            "Languages",
            countryInfo.languages,
            compareCountryInfo?.languages
          )}

          {renderRow(
            "Population",
            countryInfo.population?.toLocaleString(),
            compareCountryInfo?.population?.toLocaleString()
          )}

          {/* Flags */}
          <tr>
            <td>Flag</td>
            <td>
              {countryInfo.flag?.svg && (
                <div className={styles["flagBox"]}>
                  <Image
                    src={countryInfo.flag.svg}
                    width="100"
                    height='60'
                    className={styles["flagImg"]}
                    alt="flag"
                  />
                </div>
              )}
            </td>

            {compareCountryInfo && (
              <td>
                {compareCountryInfo.flag?.svg && (
                  <div className={styles["flagBox"]}>

                    <Image
                      src={compareCountryInfo.flag.svg}
                      width="100"
                      className={styles["flagImg"]}
                      height='60'
                      alt="flag"
                    />
                  </div>

                )}
              </td>
            )}
          </tr>

          {/* Compare Dropdown */}
          <tr>
            <td>Compare With</td>
            <td colSpan={compareCountryInfo ? 2 : 1}>
              <Select
                options={listOfCountries}
                value={
                  compareCountryInfo
                    ? {
                      value: compareCountryInfo.value,
                      label: compareCountryInfo.countryName
                    }
                    : null
                }
                onChange={(option) => {
                  if (!option) {
                    onCompare(null);   // clear comparison
                    return;
                  }

                  onCompare(option);
                }}

                placeholder="Select a country..."
                isClearable
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryModal;