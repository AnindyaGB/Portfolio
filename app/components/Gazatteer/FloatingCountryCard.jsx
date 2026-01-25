"use client";
import styles from './Map/Map.module.css'

export default function FloatingCountryCard({ countryInfo, onOpen }) {
  if (!countryInfo?.countryName) return null;

  return (
    <div className={styles.card} onClick={onOpen}>
      <div className={styles.header}>
        <img src={countryInfo.flag.png} alt="flag" />
        <h4>{countryInfo.countryName}</h4>
      </div>

      <div className={styles.row}>
        <span>Capital</span>
        <span>{countryInfo.capitalCity}</span>
      </div>

      <div className={styles.row}>
        <span>Continent</span>
        <span>{countryInfo.continent}</span>
      </div>

      <div className={styles.row}>
        <span>Population</span>
        <span>{countryInfo.population.toLocaleString()}</span>
      </div>

      <div className={styles.hint}>
        Click for details
      </div>
    </div>
  );
}
