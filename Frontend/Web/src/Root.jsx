import React from 'react'
import Navbar from './General-Components/Navbar/Navbar'
import Footer from './General-Components/Footer/Footer'
import {Outlet, useLocation} from 'react-router-dom'
function Root() {
  const location = useLocation();

  const noRoutes = ["/admin"]
  const hideElement = noRoutes.includes(location.pathname);
  return (
    
    <>
        {!hideElement && <Navbar/>}
        <Outlet/>
        {!hideElement && <Navbar/>}
    </>
  )
}

export default Root