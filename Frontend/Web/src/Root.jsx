import React from 'react'
import Navbar from './General-Components/Navbar/Navbar'
import Footer from './General-Components/Footer/Footer'
import {Outlet} from 'react-router-dom'
function Root() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Root