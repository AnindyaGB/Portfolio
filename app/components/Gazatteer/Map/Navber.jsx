import React from 'react'
import Image from 'next/image'
import Select from 'react-select'

import styles from './Map.module.css'

const Navbar = props => {

  const { selectOptions, selectedCountry, setSelectedCountry } = props;

  return (
      <nav className={styles.navbar}>
          <Select 
          menuPortalTarget={document.body} 
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          className={styles.select}
          onChange={value => setSelectedCountry(value)}
          value={selectedCountry}
          options={selectOptions}
          placeholder={'Select a country'} />
      </nav>
  )
}

export default Navbar
