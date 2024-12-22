import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SentRequestDetails.module.css';

const SentRequestDetails = () => {
    const location = useLocation();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        if (document.getElementById("google-maps-script")) return;
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdDsyQ3mxGGix5HiKOphWo1b4RW-Nxqis&callback=initMap&libraries=places`;
        script.id = "google-maps-script";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (window.google && request) {
            window.initMap = function () {
                const coordinates = request.profile.location.coordinates;
                const fName = request.profile.firstName;
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: coordinates[0], lng: coordinates[1] },
                    zoom: 12,
                    // styles: realisticMapStyle
                });
                new google.maps.Marker({
                    position: { lat: coordinates[0], lng: coordinates[1] },
                    map,
                    title: fName + " Location",
                });

                const person2Coordinates = [32.1, 35.2]; 
                new google.maps.Marker({
                    position: { lat: person2Coordinates[0], lng: person2Coordinates[1] },
                    map,
                    title: "My Location",
                });
            };
            window.initMap();
        }
    }, []);

    useEffect(() => {
        if (location.state && location.state.requestDetails) {
            setRequest(location.state.requestDetails);
        } else {
            console.log("No request details in location state");
        }
    }, [location]);

    if (!request) {
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

const realisticMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b8e23"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3e4d28"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a5b7a0"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c2b280"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#8d6e63"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#00bcd4"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7c6ed"
            }
        ]
    },
    {
        "featureType": "landuse",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c4e1a3"
            }
        ]
    }
];
