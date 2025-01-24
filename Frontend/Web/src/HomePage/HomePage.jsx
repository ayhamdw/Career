import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import ImageSwiper from "./Swiper/Swiper";
import AboutUs from "./AboutUs/AboutUs";
import Services from "./Services/Services";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import Map from "./Map/Map";

function HomePage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bodyHome">
      <div className="containerHome">
        <ImageSwiper />
      </div>

      <Services />
      <AboutUs />
      <Map />
      <CategoriesSection />
    </div>
  );
}

export default HomePage;
