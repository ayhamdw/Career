import React, { useState } from 'react';
import styles from './FriendRequests.module.css';


const mockFriendRequests = [
  {
    id: 1,
    requesterName: 'Sara Lee',
    requesterEmail: 'saralee@example.com',
    location: 'Amman, Jordan',
    profilePicture: 'https://randomuser.me/api/portraits/women/50.jpg', 
  },
  {
    id: 2,
    requesterName: 'Omar Abu Ahmad',
    requesterEmail: 'omar@example.com',
    location: 'Ramallah, Palestine',
    profilePicture: 'https://randomuser.me/api/portraits/men/35.jpg', 
  },
  {
    id: 3,
    requesterName: 'Yara Khaled',
    requesterEmail: 'yara@example.com',
    location: 'Beirut, Lebanon',
    profilePicture: 'https://randomuser.me/api/portraits/women/75.jpg', 
  },
  {
    id: 4,
    requesterName: 'Mohammad Jaber',
    requesterEmail: 'mohammad@example.com',
    location: 'Cairo, Egypt',
    profilePicture: 'https://randomuser.me/api/portraits/men/60.jpg', 
  },
];

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests);

  const handleAccept = (id) => {
    alert(`Friend request from ${id} has been accepted!`);
  };

  const handleReject = (id) => {
    alert(`Friend request from ${id} has been rejected!`);
  };

  const handleContact = (email) => {
    alert(`You can contact ${email}`);
  };

  return (
    <div className={styles.friendRequestsPage}>
      <h1>Friend Requests</h1>
      {friendRequests.length > 0 ? (
        <ul className={styles.friendRequestsList}>
          {friendRequests.map((request) => (
            <li key={request.id} className={styles.friendRequestItem}>
              <div className={styles.friendRequestContent}>
                <div className={styles.profilePictureContainer}>
                  <img 
                    src={request.profilePicture} 
                    alt={`${request.requesterName}'s profile`} 
                    className={styles.profilePicture} 
                  />
                </div>
                <div className={styles.requestDetails}>
                  <h2>{request.requesterName}</h2>
                  <p className={styles.location}>{request.location}</p>
                  <p><strong>Email:</strong> {request.requesterEmail}</p>
                </div>
              </div>
              <div className={styles.requestActions}>
                <button onClick={() => handleAccept(request.id)} className={styles.acceptBtn}>Accept</button>
                <button onClick={() => handleReject(request.id)} className={styles.rejectBtn}>Reject</button>
                <button onClick={() => handleContact(request.requesterEmail)} className={styles.contactBtn}>Contact</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests yet.</p>
      )}
    </div>
  );
};

export default FriendRequests;
