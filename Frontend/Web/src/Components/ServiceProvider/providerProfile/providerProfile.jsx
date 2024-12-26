import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ProviderProfile.module.css';
import { FaEnvelope, FaUserPlus, FaStar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        <Actions />
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

const Actions = () => (
  <div className={styles.actionsSection}>
    <button className={styles.messageButton} onClick={() => alert('Messaging feature is under construction!')}>
      <FaEnvelope /> Message
    </button>
    <button className={styles.addFriendButton} onClick={() => alert('Add Friend feature is under construction!')}>
      <FaUserPlus /> Add Friend
    </button>
  </div>
);

export default ProviderProfile;
