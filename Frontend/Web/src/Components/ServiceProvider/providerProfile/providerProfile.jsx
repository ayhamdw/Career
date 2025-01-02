import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ProviderProfile.module.css';
import { FaEnvelope, FaUserPlus, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const myId = localStorage.getItem("id");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/user/userId/${id}`);
        setProvider(response.data.data);
      } catch {
        setError('An error occurred while fetching the provider data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProviderData();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!provider) return <div className={styles.error}>Provider not found.</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.profileContainer}>
        <Header provider={provider} />
        <About bio={provider.profile.bio} />
        <Details provider={provider} />
        {provider._id !== myId && <Actions provider={provider} myId={myId} token={token} />}
      </div>
    </div>
  );
};




const Header = ({ provider }) => (
  <div className={styles.header}>
    <div className={styles.profileImageWrapper}>
      <img
        src={provider.profile.profileImage}
        alt={`${provider.profile.firstName} ${provider.profile.lastName}`}
        className={styles.profileImage}
      />
    </div>
    <h1 className={styles.profileName}>
      {provider.profile.firstName} {provider.profile.lastName}
    </h1>
    <p className={styles.profileJobTitle}>{provider.careerCategory}</p>
    <p className={styles.profileLocation}>{provider.city}</p>
    <div className={styles.profileRating}>
      <FaStar className={styles.ratingIcon} />
      <span className={styles.ratingValue}>{provider.rating.length || 0} Ratings</span>
    </div>
  </div>
);

const About = ({ bio }) => (
  <section className={styles.aboutSection}>
    <h2>About</h2>
    <p>{bio || 'No bio provided.'}</p>
  </section>
);

const Details = ({ provider }) => (
  <section className={styles.detailsSection}>
    <h2>Details</h2>
    <div className={styles.details}>
      <div className={styles.detailItem}><strong>Email:</strong> {provider.email}</div>
      <div className={styles.detailItem}><strong>Username:</strong> {provider.username}</div>
      <div className={styles.detailItem}><strong>Experience:</strong> {provider.profile.experience || 'Not specified'} years</div>
      <div className={styles.detailItem}>
        <strong>Verification Status:</strong>
        <div className={styles.certificationStatus}>
          {provider.certificate.isCertified ? (
            <FaCheckCircle className={styles.certifiedIcon} />
          ) : (
            <FaTimesCircle className={styles.notCertifiedIcon} />
          )}
          {provider.certificate.isCertified ? 'Verified' : 'Not Verified'}
        </div>
      </div>
    </div>
  </section>
);

const Actions = ({ provider, myId, token }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);

  useEffect(() => {
    const fetchFriendRequestsSent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/friends/request-sent/${myId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ids = response.data.map((item) => item._id);
        setRequestsSent(ids);
      } catch (error) {
        console.log("Error Fetching Friend Request Sent: ", error);
      }
    };
    fetchFriendRequestsSent();
  }, []);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/friends/getFriendsRequest/${myId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data)
        const ids = response.data.map((item) => item._id);
        console.log(ids)
        setFriendRequests(ids);

      } catch (e) {
        console.error("Error Fetching Friend Requests: ", e);
      }
    };
    fetchFriendRequests();
  }, [myId, token]);

  

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/friends/acceptedFriends/${myId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const ids = response.data.map((item) => item._id);
        setFriends(ids);
      } catch (e) {
        console.log("Error Fetch Friends: ", e);
      }
    };
    fetchFriends();
  }, []);

  const handleSendFriendRequest = async (ProviderId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/friends/send-friend-request`,
        {
          currentUserId: myId,
          selectedUserId: ProviderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestsSent((prevRequests) => [...prevRequests, ProviderId]);
      // console.log()
    } catch (error) {
      console.log("Error Send Friend Request: ", error);
    }
  };

  const handleCancelFriendRequest = async (ProviderId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/friends/deleteFriendFromList`,
        {
          currentUserId: myId,
          selectedUserId: ProviderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestsSent((prevRequests) =>
        prevRequests.filter((id) => id !== ProviderId)
      );
    } catch (error) {
      console.log("Error Canceling Friend Request: ", error);
    }
  };

  const handleDeleteFriend = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/friends/deleteFriendFromList`,
        {
          currentUserId: myId,
          selectedUserId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setFriends((prevFriends) => prevFriends.filter((reqId) => reqId !== id));
    } catch (error) {
      console.log("Error Delete Friend: ", error);
    }
  };

  const handleAcceptRequest = async(ProviderId)=>{
        try {
          const response = await axios.post(`${import.meta.env.VITE_API}/friends/acceptFriendRequest`, {
            senderId: ProviderId,
            receiverId: myId,
          },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
    
          )
          setFriends((prevRequests) => [...prevRequests, ProviderId]);
          setFriendRequests((prevRequests) =>
            prevRequests.filter((id) => id !== ProviderId)
          );

        }
        catch (e) {
          console.log("Error Accept Request: ", e);
        }
  }

    const handleRejectRequest = async(ProviderId) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API}/friends/reject-request`, {
          senderId: ProviderId,
          receiverId: myId,
        },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
  
        )
        setFriendRequests((prevRequests) =>
          prevRequests.filter((id) => id !== ProviderId)
        );
      }
      catch (e) {
        console.log("Error Accept Request: ", e);
      }
      
    };

  const isISentToThisPerson = requestsSent.includes(provider._id);
  const isThisPersonSentMeRequest = friendRequests.includes(provider._id);
  const isInMyFriends = friends.includes(provider._id);


  return (
    <div className={styles.actionsSection}>
      <button className={styles.messageButton} onClick={() => alert('Messaging feature is under construction!')}>
        <FaEnvelope /> Message
      </button>
      {isThisPersonSentMeRequest ? (
        <>
          <button className={styles.acceptBtn} onClick={()=>handleAcceptRequest(provider._id)}>Accept Request</button>
          <button className={styles.rejectBtn} onClick={()=>handleRejectRequest(provider._id)}>Reject Request</button>
        </>
      ) : (
        <>

          <button
            className={isISentToThisPerson? styles.cancelSent  :isInMyFriends ? styles.isFriends : styles.addFriendButton}
            onClick={isISentToThisPerson ? ()=>handleCancelFriendRequest(provider._id) : isInMyFriends ? () => handleDeleteFriend(provider._id) : () => handleSendFriendRequest(provider._id)}
          >
            {isISentToThisPerson  ? 'Cancel Request' : isInMyFriends ? 'Delete Friend' : 'Add Friend'}
          </button>
        </>
      )}
    </div>
  );
};



export default ProviderProfile;
