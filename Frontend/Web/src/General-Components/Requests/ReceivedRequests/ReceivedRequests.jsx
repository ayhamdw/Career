import React, { useState } from 'react';
import styles from './ReceivedRequests.module.css'; // Importing the CSS Module

// Mock fake data with customer location and additional details
const mockRequests = [
  {
    id: 1,
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    location: 'New York, USA',
    details: 'Request for plumbing service',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerEmail: 'janesmith@example.com',
    location: 'Los Angeles, USA',
    details: 'Request for electrical maintenance',
  },
  {
    id: 3,
    customerName: 'Ali Hassan',
    customerEmail: 'alihassan@example.com',
    location: 'Amman, Jordan',
    details: 'Request for air conditioning repair',
  },
  {
    id: 4,
    customerName: 'Maryam Abu Ali',
    customerEmail: 'maryam@example.com',
    location: 'Ramallah, Palestine',
    details: 'Request for general cleaning service',
  },
];

const Requests = () => {
  const [requests, setRequests] = useState(mockRequests);

  // Function to handle request acceptance
  const handleAccept = (id) => {
    alert(`Request from ${id} has been accepted!`);
  };

  // Function to handle request rejection
  const handleReject = (id) => {
    alert(`Request from ${id} has been rejected!`);
  };

  // Function to contact the customer
  const handleContact = (email) => {
    alert(`You can contact ${email}`);
  };

  return (
    <div className={styles.requestsPage}>
      <h1>Requests</h1>
      {requests.length > 0 ? (
        <div className={styles.requestsList}>
          {requests.map((request) => (
            <div key={request.id} className={styles.requestCard}>
              <h2>{request.customerName}</h2>
              <p><strong>Request:</strong> {request.details}</p>
              <p><strong>Location:</strong> {request.location}</p>
              <p><strong>Email:</strong> {request.customerEmail}</p>

              <div className={styles.requestActions}>
                <button onClick={() => handleAccept(request.id)} className={styles.acceptBtn}>Accept</button>
                <button onClick={() => handleReject(request.id)} className={styles.rejectBtn}>Reject</button>
                <button onClick={() => handleContact(request.customerEmail)} className={styles.contactBtn}>Contact</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No requests submitted yet.</p>
      )}
    </div>
  );
};

export default Requests;
