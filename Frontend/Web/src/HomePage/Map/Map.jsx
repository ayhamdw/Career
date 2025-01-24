import React, { useEffect, useState } from "react";
import axios from "axios";

function Map() {
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch user coordinates from the API
  useEffect(() => {
    const getUserCoordinates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/coordinations`
        );
        setUserCoordinates(response.data.userCoordinates);
      } catch (error) {
        console.log("Error getting user coordinates", error);
      }
    };
    getUserCoordinates();
  }, []);

  // Get user's current location from the browser
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
        center: userLocation || { lat: 31.7683, lng: 35.2137 },
        zoom: 9,
      });

      if (userLocation) {
        new window.google.maps.Marker({
          position: userLocation,
          map,
        });
      }

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
              label: { text: "", fontSize: "0px", color: "transparent" },
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
  }, [userCoordinates, userLocation]);

  return <div id="map" className="h-[500px] w-[80%] m-auto my-5 rounded-lg shadow-lg"></div>;
}

export default Map;
