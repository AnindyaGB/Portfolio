'use client'
import React, {useState} from 'react'
import styles from './Components.module.css'
import { Button } from "reactstrap";
import AboutModal from './AboutModal';

export default function Navbar() {
  const [showAboutModal, setShowAboutModal] = useState(null);

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Company Directory</h1>
      <AboutModal show={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <Button color="link" className={styles.help} size="lg" onClick={() => setShowAboutModal(true)} >
        <i className="fa-regular fa-circle-question"></i>
      </Button>
    </nav>
  )
}
