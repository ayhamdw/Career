import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SentRequestDetails.module.css';
import axios from 'axios';

const SentRequestDetails = () => {
    const location = useLocation();
    const [request, setRequest] = useState(null);
    const [myCoordinates, setMyCoordinates] = useState([]);
    const [isRattingModelOpen, setIsRattingModelOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [review, setReview] = useState("")
    const myId = localStorage.getItem("id")
    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');
    const [isUserRated, setIsUserRated] = useState(false);
    const [openRated, setOpenRated] = useState(false);


    useEffect(() => {
        if (document.getElementById("google-maps-script")) return;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdDsyQ3mxGGix5HiKOphWo1b4RW-Nxqis&callback=initMap&libraries=places,directions`;
        script.id = "google-maps-script";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        window.initMap = function () {
            if (window.google && request && myCoordinates.length > 0) {
                const coordinates = request.profile.location.coordinates;
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: coordinates[0], lng: coordinates[1] },
                    zoom: 12,
                });

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    polylineOptions: {
                        strokeColor: 'blue',
                        strokeOpacity: 1.0,
                        strokeWeight: 5,
                    },
                });

                new google.maps.Marker({
                    position: { lng: coordinates[0], lat: coordinates[1] },
                    map,
                    title: `${request.profile.firstName} Location`,
                    icon: {
                        fillColor: 'rgb(109, 201, 126)',
                        fillOpacity: 0.9,
                        strokeColor: 'rgb(109, 201, 126)',
                        strokeWeight: 2,
                        scale: 8,
                    },
                });

                new google.maps.Marker({
                    position: { lat: myCoordinates[0], lng: myCoordinates[1] },
                    map,
                    title: "My Location",
                    icon: {
                        fillColor: 'rgb(109, 201, 126)',
                        fillOpacity: 1,
                        strokeColor: 'rgb(109, 201, 126)',
                        strokeWeight: 3,
                        scale: 10,
                    },
                });

                const requestDirections = {
                    origin: { lat: myCoordinates[0], lng: myCoordinates[1] },
                    destination: { lat: coordinates[0], lng: coordinates[1] },
                    travelMode: google.maps.TravelMode.DRIVING,
                };

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
            const scriptTag = document.getElementById("google-maps-script");
            if (scriptTag) {
                document.body.removeChild(scriptTag);
            }
        };

    }, [request, myCoordinates]);

    useEffect(() => {
        const fetchMyCoordinates = async () => {
            const email = localStorage.getItem("userEmail");

            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/user/coordinates`, { email });
                const { longitude, latitude } = response.data;
                setMyCoordinates([longitude, latitude]);
            } catch (error) {
                console.error("Error Fetching Coordinates:", error);
            }
        };
        fetchMyCoordinates();
    }, []);

    useEffect(() => {
        if (location.state && location.state.requestDetails) {
            setRequest(location.state.requestDetails);
        } else {
            console.error("No request details in location state");
        }
    }, [location]);

    if (!request || myCoordinates.length === 0) {
        return <p>Loading request details...</p>;
    }
    else {
        const userId = myId
        const targetUserId = request._id;
        const checkUserRated = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/user/userRated`, {
                    userId,
                    targetUserId
                })
                setIsUserRated(response.data.success);
            }
            catch (error) {
                console.log("Error isUser Rated", error)
            }
        }
        checkUserRated();
    }

    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };
    const handleRatedCloseButton = () => {
        setOpenRated(!openRated);
    }

    const handleSubmitRating = async (userId, targetUserId, rating, review) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/user/rateUser`, {
                userId,
                targetUserId,
                rating,
                review
            });
            console.log("Rating submitted:", response);
            setIsRattingModelOpen(false);
            setIsRatingSubmitted(true)
            setToasterMessage("Rating submitted successfully!");
            setReview('');
        } catch (error) {
            console.log("Error Rating:", error);
            setToasterMessage("Error submitting rating. Please try again.");
        }
    };

    const finishJobButton = () => {
        if(isUserRated){
            setOpenRated(!openRated)

        }
        else{
            setIsRattingModelOpen(!isRattingModelOpen);

        }


    };
    const handleCancelButton = () => {
        setIsRattingModelOpen(!isRattingModelOpen)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Request Details</h1>
            </header>

            <div className={styles.content}>
                <section className={styles.profileSection}>
                    <div className={styles.profileCard}>
                        <img
                            src={request.profile.profileImage || "https://placehold.co/150"}
                            alt={`${request.profile.firstName} ${request.profile.lastName}`}
                            className={styles.profileImage}
                        />
                        <div className={styles.profileInfo}>
                            <h2 className={styles.profileName}>
                                {request.profile.firstName} {request.profile.lastName}
                            </h2>
                            <p><strong>Username:</strong> {request.username}</p>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Bio:</strong> {request.profile.bio || "No bio provided"}</p>
                            <p><strong>Experience:</strong> {request.profile.experience || "No experience listed"}</p>
                        </div>
                    </div>
                    <div className={styles.requestSection}>
                        <h2 className={styles.subheading}>Request Information</h2>
                        <ul className={styles.requestList}>
                            <li><strong>Service Requested:</strong> {request.careerCategory}</li>
                            <li><strong>City:</strong> {request.city}</li>
                        </ul>
                    </div>

                    <div className={styles.finishButton}>
                        <p>submit your feedback</p>
                        <button onClick={finishJobButton}>Finish This Job</button>
                    </div>

                </section>





                {isUserRated ? (
                    openRated && (<div className={styles.overlay}>
                        <div className={styles.ratePerson}>
                            <p>You have already done the evaluation process</p>
                            <br></br>
                            <button onClick={handleRatedCloseButton} className={styles.cancelButton}>
                                Close
                            </button>
                        </div>
                    </div>)
                ) : (
                    isRattingModelOpen && (
                        <div className={styles.overlay}>
                            <div className={styles.ratePerson}>
                                <p>Please Rate {request.profile.firstName}</p>
                                <div className={styles.starsRate}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`${styles.star} ${selectedRating >= star ? styles.selected : ""}`}
                                            onClick={() => handleStarClick(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Let us know about your feedback"
                                />
                                <div className={styles.buttonsSubmit}>
                                    <button
                                        onClick={() => handleSubmitRating(myId, request._id, selectedRating, review)}
                                        className={styles.submitButton}
                                    >
                                        Submit
                                    </button>
                                    <button onClick={handleCancelButton} className={styles.cancelButton}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}


                {toasterMessage && (
                    <div className={styles.toaster}>
                        <p>{toasterMessage}</p>
                    </div>
                )}

                <section className={styles.mapSection}>
                    <div id="map" className={styles.map}></div>
                </section>
            </div>
        </div>
    );

};

export default SentRequestDetails;
