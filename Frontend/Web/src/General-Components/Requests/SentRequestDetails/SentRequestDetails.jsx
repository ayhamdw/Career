import {  useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
const SentRequestDetails = () => {
  const location = useLocation();
  const [request, setRequest] = useState(null);

  // Update the state if the location state is available
  useEffect(() => {
    if (location.state && location.state.requestDetails) {
      setRequest(location.state.requestDetails);
    } else {
      console.log("No request details in location state");
    }
  }, [location]);

  // If no request data, show a message
  if (!request) {
    return <p>No request details available.</p>;
  }

  return (
    <div>
      <h2>Request Details</h2>
      <p>First Name: {request.profile.firstName}</p>
      <p>Last Name: {request.profile.lastName}</p>
      <p>Service Requested: {request.careerCategory}</p>
      {/* You can add other details as needed */}
    </div>
  );
};

export default SentRequestDetails;
