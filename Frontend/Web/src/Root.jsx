import React from 'react';
import Navbar from './General-Components/Navbar/Navbar';
import Footer from './General-Components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Root() {
  const location = useLocation();

  // Define the base admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally hide Navbar and Footer for admin routes */}
      {!isAdminRoute && <Navbar />}
      <Outlet />
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default Root;
