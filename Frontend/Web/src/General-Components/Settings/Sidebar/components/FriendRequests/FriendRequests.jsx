import React, { useState, useEffect } from 'react';
import styles from './FriendRequests.module.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();

  const myId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const handleAccept = async (id) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/friends/acceptFriendRequest`, {
        senderId: id,
        receiverId: myId,
      },
        {
          headers: { Authorization: `Bearer ${token}` },
        }

      )
      
      console.log(response.data);
    }
    catch (e) {
      console.log("Error Accept Request: ", e);
    }
  };

  const handleReject = async(id) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== id)
    );
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/friends/reject-request`, {
        senderId: id,
        receiverId: myId,
      },
        {
          headers: { Authorization: `Bearer ${token}` },
        }

      )
      
    }
    catch (e) {
      console.log("Error Accept Request: ", e);
    }
    
  };

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`)
  };


  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/friends/getFriendsRequest/${myId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response.data[0].city)
        setFriendRequests(response.data)
      }
      catch (e) {
        console.log("Error Fetch Friend Requests: ", e)
      }
    }
    fetchFriendRequest();
  }, [])

  const getMorefriends = () =>{
    navigate(`/service-provider`)
  }

  return (
    <div className={styles.friendRequestsPage}>
      <h1>Friend Requests</h1>
      {friendRequests.length > 0 ? (
        <ul className={styles.friendRequestsList}>
          {friendRequests.map((request) => (
            <li key={request._id} className={styles.friendRequestItem}>
              <div className={styles.friendRequestContent}>
                <div className={styles.profilePictureContainer}>
                  <img
                    src={request.profile.profileImage}
                    alt={`${request.profile.firstName}'s profile`}
                    className={styles.profilePicture}
                  />
                </div>
                <div className={styles.requestDetails}>
                  <h2>{request.profile.firstName} {request.profile.lastName}</h2>
                  <p className={styles.location}>{request.city}</p>
                  <p><strong>Email:</strong> {request.email}</p>
                </div>
              </div>
              <div className={styles.requestActions}>
                <button onClick={() => handleAccept(request._id)} className={styles.acceptBtn}>Accept</button>
                <button onClick={() => handleReject(request._id)} className={styles.rejectBtn}>Reject</button>
                <button onClick={() => handleViewProfile(request._id)} className={styles.contactBtn}>View Profile</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noRequestsContainer}>
          <div className={styles.noRequestsCard}>
            <div className={styles.noRequestsIcon}>
              {/* <img
                src="https://via.placeholder.com/100"
                alt="No Requests"
                className={styles.iconImage}
              /> */}
            </div>
            <h2 className={styles.noRequestsTitle}>No Friend Requests Yet</h2>
            <p className={styles.noRequestsDescription}>
              It looks like you're all caught up! Check back later to see if anyone wants to connect.
            </p>
            <button className={styles.actionButton} onClick={getMorefriends}>Discover New Friends</button>
          </div>
        </div>

      )}
    </div>
  );
};

export default FriendRequests;
