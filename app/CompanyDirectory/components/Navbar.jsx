'use client'
import React from 'react'
import styles from './Components.module.css'
import Modal from './Modal'
import { Button } from "reactstrap";

export default function Navbar() {
  return (
          <nav className={styles.navbar}>
            <h1 style={{color: '#F5FFFA', paddingLeft: 20}}>Company Directory</h1>
              <Modal  content={{header:'dfsf'}}/>
              <Button color="link" className={styles.help} size="lg" >
    <i className="fa-regular fa-circle-question"></i>
  </Button>
          </nav>
  )
}
