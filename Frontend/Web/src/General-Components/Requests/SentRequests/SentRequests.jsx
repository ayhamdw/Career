import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./sentRequests.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SentRequestDetails from "../SentRequestDetails/SentRequestDetails";

const SentRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedSentRequests, setAcceptedSentRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    const fetchRequests = async (url, setState) => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await axios.post(url, { email });
        console.log(response.data);
        setState(response.data.user || []);
      } catch (error) {
        console.error(`Error fetching data from ${url}: `, error);
      }
    };

    fetchRequests(
      `${import.meta.env.VITE_API}/request/SendProficientRequests`,
      setPendingRequests
    );
    fetchRequests(
      `${import.meta.env.VITE_API}/request/acceptedSentRequest`,
      setAcceptedSentRequests
    );
    fetchRequests(
      `${import.meta.env.VITE_API}request/rejectedSentRequest`,
      setRejectedRequests
    );
  }, []);

  const handleRequestDetails = (request) => {
    console.log("Navigating with request ID:", request._id);
    navigate(`/requestdetails/${request._id}`);
  };

  const RequestSection = ({ title, requests }) => (
    <div className={styles.section}>
      <h2>{title} Requests</h2>
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className={styles.requestCard}>
            <img
              src={request.profile.profileImage}
              alt={`${request.profile.firstName} ${request.profile.lastName}`}
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
            <p>
              <strong>Certified:</strong>{" "}
              {request.certificate.isCertified ? "Yes" : "No"}
            </p>
            {title === "Pending" && (
              <div className={styles.requestStatus}>
                <span className={styles.pendingLabel}>Pending</span>
              </div>
            )}
            {title === "Accepted" && (
              <div className={styles.requestStatus}>
                <span className={styles.acceptedLabel}>Accepted</span>
                <button
                  className={styles.detailsBtn}
                  onClick={() => handleRequestDetails(request)}
                >
                  Details
                </button>
              </div>
            )}
            {title === "Rejected" && (
              <div className={styles.requestStatus}>
                <span className={styles.rejectedLabel}>Rejected</span>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No {title.toLowerCase()} requests at this time.</p>
      )}
    </div>
  );

  RequestSection.propTypes = {
    title: PropTypes.string.isRequired,
    requests: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profile: PropTypes.shape({
          profileImage: PropTypes.string.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
        }).isRequired,
        certificate: PropTypes.shape({
          isCertified: PropTypes.bool.isRequired,
        }).isRequired,
        careerCategory: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <div className={styles.requestsPage}>
      <h1>Sent Requests Overview</h1>
      <RequestSection title="Pending" requests={pendingRequests} />
      <RequestSection title="Accepted" requests={acceptedSentRequests} />
      <RequestSection title="Rejected" requests={rejectedRequests} />
    </div>
  );
};

export default SentRequests;
