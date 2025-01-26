import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ProviderProfile.module.css';
import { FaEnvelope, FaUserPlus, FaStar, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import s3 from 'react-aws-s3-typescript'
import { toast } from 'react-toastify';
import { FaRegStar, FaStarHalfAlt } from 'react-icons/fa';


const ProviderProfile = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const myId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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



  const ratings = provider.profile.ratings;
  const ratingValues = ratings.map(ratingObj => ratingObj.rating);
  let averageRating = 0;
  if (ratingValues.length === 0) {
    console.log('No ratings available');
  } else {
    averageRating = ratingValues.reduce((sum, rating) => sum + rating, 0) / ratingValues.length;
    console.log(averageRating);
  }
  console.log(averageRating)
  return (
    <div className={styles.pageContainer}>
      <div className={styles.profileContainer}>
        <Header provider={provider} averageRating={averageRating} />
        <About bio={provider.profile.bio} />
        <Details provider={provider} />
        {provider._id !== myId && <Actions provider={provider} myId={myId} token={token} />}
      </div>
    </div>
  );
};


const Header = ({ provider, averageRating }) => {
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
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
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className={styles.ratingIcon} />
        ))}

        {halfStar && <FaStarHalfAlt className={styles.ratingIcon} />}

        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} className={styles.ratingIcon} />
        ))}

        {/* Display the average rating */}
        <span className={styles.ratingValue}> </span>
      </div>
    </div>
  )
};

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

  const handleAcceptRequest = async (ProviderId) => {
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

  const handleRejectRequest = async (ProviderId) => {
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

  const [reportText, setReportText] = useState('');
  const [documentationImage, setDocumentationImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isReporting, setIsReporting] = useState(false);

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    const Reacts3Client = new s3({
      accessKeyId: "AKIA5MSUBQC3OE6ZOF4Z",
      secretAccessKey: "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",
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: "https://career-images-s3.s3.eu-north-1.amazonaws.com",
    });

    try {
      const data = await Reacts3Client.uploadFile(image);
      setDocumentationImage(data.location);  // Store the image URL in state
      console.log("Image URL:", data.location);  // Log the image URL for debugging
    } catch (err) {
      console.error("Error uploading image:", err);
      alert('Error uploading image. Please try again.');
      throw err;
    }
  };

  const handleReport = async () => {
    // if (!reportText || !documentationImage || !provider._id) {
    //   alert("Please provide a description, an image, and the person being reported.");
    //   return;
    // }

    try {
      await handleUpload();
      if (!documentationImage) {
        alert('Image upload failed. Please try again.');
        return;
      }

      const reportData = {
        userId: myId,  // The user who is reporting
        reportedUserId: provider._id,  // The person being reported
        reportText: reportText,
        documentationImage: documentationImage,  // Use the uploaded image URL
      };

      const response = await axios.post(`${import.meta.env.VITE_API}/Complaint/report`, reportData);

      console.log('Response:', response.data);

      if (response.status === 201) {
        alert('Report submitted successfully!');
        setIsReporting(false);
      } else {
        alert('Failed to submit the report. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the report.');
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleApplyForThisJop = async (proficientId, userId, requestDateTime, [longitude, latitude], city) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You should sign in")
        return;
      }
      const cityToSend = city || "Unknown City";


      console.log("Before API request");
      await axios.post(
        `${import.meta.env.VITE_API}/proficient/booking-proficient`,
        {
          proficientId,
          userId,
          requestDateTime,
          city: cityToSend,
          location: {
            latitude,
            longitude
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hello")
      toast.success("Submited Successfully ");

    } catch (error) {
      console.log("Error applying for the job: ", error);
    }
  };

  return (
    <div className={styles.actionsSection}>
      <button className={styles.messageButton} onClick={() => alert('Messaging feature is under construction!')}>
        <FaEnvelope /> Message
      </button>
      {isThisPersonSentMeRequest ? (
        <>
          <button className={styles.acceptBtn} onClick={() => handleAcceptRequest(provider._id)}>Accept Request</button>
          <button className={styles.rejectBtn} onClick={() => handleRejectRequest(provider._id)}>Reject Request</button>
        </>
      ) : (
        <>

          <button
            className={isISentToThisPerson ? styles.cancelSent : isInMyFriends ? styles.isFriends : styles.addFriendButton}
            onClick={isISentToThisPerson ? () => handleCancelFriendRequest(provider._id) : isInMyFriends ? () => handleDeleteFriend(provider._id) : () => handleSendFriendRequest(provider._id)}
          >
            {isISentToThisPerson ? 'Cancel Request' : isInMyFriends ? 'Delete Friend' : 'Add Friend'}
          </button>
        </>
      )}

      <button
        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        onClick={() => setIsReporting(true)}  // Open the report modal
      >
        <FaExclamationTriangle className="mr-2" />
        Report
      </button>
      <button
        className={styles.applyBtn}
        onClick={() => handleApplyForThisJop(
          provider._id,
          myId,

          new Date().toISOString(),
          provider.profile.location.coordinates,
          provider.city,
        )}
      >
        Request
      </button>

      {isReporting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">

            <h3 className="text-xl font-semibold mb-4">Report Provider</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              placeholder="Describe the issue..."
              rows="4"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)} // Handle report text change
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])} // Handle file selection
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleReport} // Trigger report submission
              >
                Submit Report
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                onClick={() => setIsReporting(false)} // Close the report modal
              >
                Cancel
              </button>


            </div>
          </div>
        </div>
      )}


    </div>
  );
};



export default ProviderProfile;
