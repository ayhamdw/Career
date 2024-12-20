import { useState, useEffect } from "react";
import styles from "./sentRequests.module.css";
import axios from "axios";

const SentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchSentRequests = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await axios.post(
          "http://localhost:7777/api/user/SentProficient",
          { email }
        );
        console.log(response.data);
        setRequests(
          response.data.map((request) => ({
            ...request,
            status: "Pending",
          }))
        );
      } catch (error) {
        console.log("Error fetching sent requests: ", error);
      }
    };
    fetchSentRequests();
  }, []);

  return (
    <div className={styles.requestsPage}>
      <h1>Sent Requests Overview</h1>

      {["Pending", "Accepted", "Rejected"].map((status) => (
        <div key={status} className={styles.section}>
          <h2>{status} Requests</h2>
          {requests.filter((request) => request.status === status).length > 0 ? (
            requests
              .filter((request) => request.status === status)
              .map((request) => (
                <div key={request._id} className={styles.requestCard}>
                  <img
                    src={request.profile.profileImage}
                    alt={request.profile.firstName}
                    className={styles.customerPhoto}
                  />
                  <h3>
                    {request.profile.firstName} {request.profile.lastName}
                  </h3>
                  <p>
                    <strong>Service Requested:</strong> {request.careerCategory}
                  </p>
                  <p>
                    <strong>Location:</strong> {request.city}
                  </p>
                  {status === "Pending" && (
                    <div className={styles.requestStatus}>
                      <span className={styles.pendingLabel}>Pending</span>
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p>No {status.toLowerCase()} requests at this time.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SentRequests;
