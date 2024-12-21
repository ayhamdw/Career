import { useState, useEffect } from 'react';
import styles from './ReceivedRequests.module.css';
import axios from 'axios';

const Requests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);


  const handleAccept = async(userId) => {
    const request = incomingRequests.find((req) => req._id === userId);
    setIncomingRequests(incomingRequests.filter((req) => req._id !== userId));
    setAcceptedRequests([...acceptedRequests, request]);
    const myId = localStorage.getItem("id");

    try{
      const response = await axios.post("http://localhost:7777/api/request/acceptedRequestReceived",{userId:userId, myId});
      console.log(userId)
    }
    catch(error){
      console.log("Error acceptedRequestReceived: ",error)
    }
  };

  const handleReject = async(id) => {
    const request = incomingRequests.find((req) => req._id === id);
    setIncomingRequests(incomingRequests.filter((req) => req._id !== id));
    setRejectedRequests([...rejectedRequests, request]);
    const myId = localStorage.getItem("id");
    try{
      const response = await axios.post("http://localhost:7777/api/request/RejectRequestReceived",{userId:id,myId});
      
    }
    catch(error){
      console.log("Error acceptedRequestReceived: ",error)
    }
  };

  useEffect(() => {
    const getProficientData = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await axios.post("http://localhost:7777/api/user/ReceiveProficient", { email });
        setIncomingRequests(response.data); 
      } catch (error) {
        console.log("Error Fetching Received Requests: ", error);
      }
    };
    getProficientData();
  }, []);

  useEffect(() => {
    const getAcceptedReceivedRequest = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await axios.post("http://localhost:7777/api/request/getAcceptedReceivedRequest", { email });
        console.log(response.data)

        setAcceptedRequests(response.data); 
      } catch (error) {
        console.log("Error Fetching Received Requests: ", error);
      }
    };
    getAcceptedReceivedRequest();
  }, []);
  useEffect(() => {
    const getRejectedReceivedRequest = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await axios.post("http://localhost:7777/api/request/getRejectedReceivedRequest", { email });
        setRejectedRequests(response.data); 
      } catch (error) {
        console.log("Error Fetching Received Requests: ", error);
      }
    };
    getRejectedReceivedRequest();
  }, []);

  return (
    <div className={styles.requestsPage}>
      <h1>Received Requests</h1>

      <div className={styles.section}>
        <h2>Incoming Requests</h2>
        {incomingRequests.length > 0 ? (
          incomingRequests.map((request) => (
            <div key={request._id} className={styles.requestCard}>
              <img src={request.profile.profileImage} alt={request.profile.firstName} className={styles.customerPhoto} />
              <h3>{request.profile.firstName} {request.profile.lastName}</h3>
              <p><strong>Request:</strong> {request.career}</p> 
              <p><strong>Location:</strong> {request.city}</p>
              <div className={styles.requestActions}>
                <button onClick={() => handleAccept(request._id)} className={styles.acceptBtn}>Accept</button>
                <button onClick={() => handleReject(request._id)} className={styles.rejectBtn}>Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p>No incoming requests.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2>Accepted Requests</h2>
        {acceptedRequests.length > 0 ? (
          acceptedRequests.map((request) => (
            <div key={request._id} className={styles.requestCard}>
              <img src={request.profile.profileImage} alt={request.profile.firstName} className={styles.customerPhoto} />
              <h3>{request.profile.firstName} {request.profile.lastName}</h3>
              <p><strong>Request:</strong> {request.career}</p>
              <p><strong>Location:</strong> {request.city}</p>
            </div>
          ))
        ) : (
          <p>No accepted requests.</p>
        )}
      </div>

      <div className={styles.section}>
        <h2>Rejected Requests</h2>
        {rejectedRequests.length > 0 ? (
          rejectedRequests.map((request) => (
            <div key={request._id} className={styles.requestCard}>
              <img src={request.profile.profileImage} alt={request.profile.firstName} className={styles.customerPhoto} />
              <h3>{request.profile.firstName} {request.profile.lastName}</h3>
              <p><strong>Request:</strong> {request.career}</p>
              <p><strong>Location:</strong> {request.city}</p>
            </div>
          ))
        ) : (
          <p>No rejected requests.</p>
        )}
      </div>
    </div>
  );
};

export default Requests;
