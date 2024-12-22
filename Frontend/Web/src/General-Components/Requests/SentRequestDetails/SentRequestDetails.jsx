import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SentRequestDetails.module.css';
import axios from 'axios';

const SentRequestDetails = () => {
    const location = useLocation();
    const [request, setRequest] = useState(null);
    const [myCoordinates, setMyCoordinates] = useState([]);

    useEffect(() => {
        // Check if the Google Maps API script is already loaded
        if (document.getElementById("google-maps-script")) return;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdDsyQ3mxGGix5HiKOphWo1b4RW-Nxqis&callback=initMap&libraries=places,directions`;
        script.id = "google-maps-script";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Define the initMap function as a global callback after script is loaded
        window.initMap = function () {
            if (window.google && request && myCoordinates.length > 0) {
                const coordinates = request.profile.location.coordinates;
                const fName = request.profile.firstName;

                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: coordinates[0], lng: coordinates[1] },
                    zoom: 12,
                    // styles: realisticMapStyle (optional: if you want custom map styles)
                });

                // Create a DirectionsService and DirectionsRenderer
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    polylineOptions: {
                        strokeColor: 'blue', // Path color
                        strokeOpacity: 1.0,
                        strokeWeight: 5,
                    },
                });

                // Marker for request's location
                new google.maps.Marker({
                    position: { lat: coordinates[0], lng: coordinates[1] },
                    map,
                    title: fName + " Location",
                    icon: {
                        fillColor: 'rgb(109, 201, 126)',  // Your main color
                        fillOpacity: 0.9,
                        strokeColor: 'rgb(109, 201, 126)', // Border color
                        strokeWeight: 2,  // Border thickness
                        scale: 8,  // Adjust size of the marker
                    }
                });

                // Marker for "My Location" with enhanced design
                new google.maps.Marker({
                    position: { lat: myCoordinates[0], lng: myCoordinates[1] },
                    map,
                    title: "My Location",
                    icon: {
                        fillColor: 'rgb(109, 201, 126)',  // Use your main color
                        fillOpacity: 1,
                        strokeColor: 'rgb(109, 201, 126)', // Border color
                        strokeWeight: 3,  // Slightly thicker border
                        scale: 10,  // Increase size of the marker
                    }
                });

                // Request the directions from "My Location" to the request's location
                const requestDirections = {
                    origin: { lat: myCoordinates[0], lng: myCoordinates[1] },
                    destination: { lat: coordinates[0], lng: coordinates[1] },
                    travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, etc.
                };

                // Get directions and display on the map
                directionsService.route(requestDirections, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                    } else {
                        console.error("Directions request failed due to " + status);
                    }
                });
            }
        };

        return () => {
            // Cleanup: remove the script element when the component unmounts to avoid memory leaks
            const scriptTag = document.getElementById("google-maps-script");
            if (scriptTag) {
                document.body.removeChild(scriptTag);
            }
        };
    }, [request, myCoordinates]); // Ensure that Google Maps is initialized only after `request` and `myCoordinates`

    useEffect(() => {
        const fetchMyCoordinates = async () => {
            const email = localStorage.getItem("userEmail");

            try {
                const response = await axios.post("http://localhost:7777/api/user/coordinates", { email });
                const { longitude, latitude } = response.data;
                console.log(response.data);

                setMyCoordinates([longitude, latitude]);
                console.log("My Coordinates:", [longitude, latitude]);

            } catch (error) {
                console.log("Error Fetching Coordinates:", error);
            }
        };
        fetchMyCoordinates();
    }, []);

    useEffect(() => {
        if (location.state && location.state.requestDetails) {
            setRequest(location.state.requestDetails);
        } else {
            console.log("No request details in location state");
        }
    }, [location]);

    if (!request || myCoordinates.length === 0) {
        return <p>Loading request details...</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Request Details</h1>
            </div>

            {/* Profile Section */}
            <section className={styles.profileSection}>
                <div className={styles.cardContainer}>
                    {/* User Profile Card */}
                    <div className={styles.profileCard}>
                        <div className={styles.profileImageContainer}>
                            <img
                                src={request.profile.profileImage || "https://placehold.co/100"}
                                alt={`${request.profile.firstName} ${request.profile.lastName}`}
                                className={styles.profileImage}
                            />
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.profileText}>
                                <strong>Name:</strong> {`${request.profile.firstName} ${request.profile.lastName}`}
                            </div>
                            <div className={styles.profileText}>
                                <strong>Username:</strong> {request.username}
                            </div>
                            <div className={styles.profileText}>
                                <strong>Email:</strong> {request.email}
                            </div>
                            <div className={styles.profileText}>
                                <strong>Bio:</strong> {request.profile.bio || "No bio provided"}
                            </div>
                            <div className={styles.profileText}>
                                <strong>Experience:</strong> {request.profile.experience || "No experience listed"}
                            </div>
                        </div>
                    </div>

                    {/* Request Details Card */}
                    <div className={styles.requestCard}>
                        <h2 className={styles.subheading}>Request Information</h2>
                        <div className={styles.requestInfoList}>
                            <p><strong>Service Requested:</strong> {request.careerCategory}</p>
                            <p><strong>City:</strong> {request.city}</p>
                            <p><strong>Gender:</strong> {request.gender}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
                <div id="map" className={styles.map}></div>
            </section>
        </div>
    );
};

export default SentRequestDetails;
