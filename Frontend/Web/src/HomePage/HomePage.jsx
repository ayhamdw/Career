import React, { useEffect, useState } from "react";
import "./HomePage.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";

import { ServiceData } from "./HomePage";

import AboutUs from "./AboutUs/AboutUs";
import Services from "./Services/Services";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import axios from "axios";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [userCoordinates, setUserCoordinates] = useState([]);

  useEffect(() => {
    const getUserCoordinates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/coordinations`
        );
        console.log(response.data.userCoordinates);
        setUserCoordinates(response.data.userCoordinates);
      } catch (error) {
        console.log("Error getting user coordinates", error);
      }
    };
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (document.getElementById("google-maps-script")) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_MAP_KEY}&callback=initMap&libraries=places`;
    script.id = "google-maps-script";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 31.7683, lng: 35.2137 }, // Default center (Jerusalem)
        zoom: 9,
      });

      if (userCoordinates.length > 0) {
        userCoordinates.forEach((user) => {
          if (user.coordinates.length === 2) {
            const position = {
              lat: user.coordinates[0],
              lng: user.coordinates[1],
            };
            const marker = new window.google.maps.Marker({
              position,
              map,
              icon: {
                url: user.profileImage,
                scaledSize: new window.google.maps.Size(40, 60),
                anchor: new window.google.maps.Point(20, 30),
              },
              label: {
                text: "",
                fontSize: "0px",
                color: "transparent",
              },
            });
            
            marker.addListener("click", () => {
              window.location.href = `/profile/${user.id}`;
            });


          }
        });
      }
    };
    return () => {
      const scriptTag = document.getElementById("google-maps-script");
      if (scriptTag) {
        document.body.removeChild(scriptTag);
      }
    };
  }, [userCoordinates]);

  return (
    <>
      <div className="bodyHome">
        <div className="containerHome">
          <div className="imagessw flex items-center justify-center flex-col mt-10 w-full">
            <Swiper
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              freeMode={false}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="max-w-[100%] lg:max-w-full h-full"
            >
              {ServiceData.map((item) => (
                <SwiperSlide key={item.title}>
                  <div className="test flex flex-col group relative shadow-lg text-white rounded-xl px-6 py-8 h-[400px] lg:h-[500px] overflow-hidden cursor-pointer">
                    <div
                      className="absolute inset-0 bg-contain bg-center"
                      style={{ backgroundImage: `url(${item.backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20" />
                    <div className="relative flex flex-col gap-3">
                      <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                      <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                      <p className="lg:text-[18px]">{item.content} </p>
                    </div>
                    <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>



        <Services />
        <AboutUs />
                {/* Map Section */}
                <div
          id="map"
          className="h-[500px] w-[80%] m-auto my-5 rounded-lg shadow-lg"
        ></div>
        <CategoriesSection />
      </div>
    </>
  );
}

export default HomePage;
