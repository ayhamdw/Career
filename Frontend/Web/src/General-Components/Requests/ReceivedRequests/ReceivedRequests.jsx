import React, { useState } from 'react';
import styles from './ReceivedRequests.module.css'; 

const mockRequests = [
  {
    id: 1,
    customerName: 'John Doe',
    customerPhoto: 'https://via.placeholder.com/50',
    location: 'New York, USA',
    details: 'Request for plumbing service',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerPhoto: 'https://via.placeholder.com/50',
    location: 'Los Angeles, USA',
    details: 'Request for electrical maintenance',
  },
  {
    id: 3,
    customerName: 'Ali Hassan',
    customerPhoto: 'https://via.placeholder.com/50',
    location: 'Amman, Jordan',
    details: 'Request for air conditioning repair',
  },
  {
    id: 4,
    customerName: 'Maryam Abu Ali',
    customerPhoto: 'https://via.placeholder.com/50',
    location: 'Ramallah, Palestine',
    details: 'Request for general cleaning service',
  },
];

const Requests = () => {
  const [incomingRequests, setIncomingRequests] = useState(mockRequests);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  const handleAccept = (id) => {
    const request = incomingRequests.find((req) => req.id === id);
    setIncomingRequests(incomingRequests.filter((req) => req.id !== id));
    setAcceptedRequests([...acceptedRequests, request]);
  };

  const handleReject = (id) => {
    const request = incomingRequests.find((req) => req.id === id);
    setIncomingRequests(incomingRequests.filter((req) => req.id !== id));
    setRejectedRequests([...rejectedRequests, request]);
  };

  return (
    <div className={styles.requestsPage}>
      <h1>Requests</h1>

      <div className={styles.section}>
        <h2>Incoming Requests</h2>
        {incomingRequests.length > 0 ? (
          incomingRequests.map((request) => (
            <div key={request.id} className={styles.requestCard}>
              <img src={request.customerPhoto} alt={request.customerName} className={styles.customerPhoto} />
              <h3>{request.customerName}</h3>
              <p><strong>Request:</strong> {request.details}</p>
              <p><strong>Location:</strong> {request.location}</p>
              <div className={styles.requestActions}>
                <button onClick={() => handleAccept(request.id)} className={styles.acceptBtn}>Accept</button>
                <button onClick={() => handleReject(request.id)} className={styles.rejectBtn}>Reject</button>
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
            <div key={request.id} className={styles.requestCard}>
              <img src={request.customerPhoto} alt={request.customerName} className={styles.customerPhoto} />
              <h3>{request.customerName}</h3>
              <p><strong>Request:</strong> {request.details}</p>
              <p><strong>Location:</strong> {request.location}</p>
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
            <div key={request.id} className={styles.requestCard}>
              <img src={request.customerPhoto} alt={request.customerName} className={styles.customerPhoto} />
              <h3>{request.customerName}</h3>
              <p><strong>Request:</strong> {request.details}</p>
              <p><strong>Location:</strong> {request.location}</p>
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