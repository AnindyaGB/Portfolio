import React from 'react'
import PersonnelPage from './personnel/page'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function page() {
  return (
    <div>
      <Navbar />
      <PersonnelPage/>
    </div>
  )
}
