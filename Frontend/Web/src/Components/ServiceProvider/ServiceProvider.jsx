import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ServiceProvider.module.css';
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa';
import providerProfile from './providerProfile/providerProfile';
import { useNavigate } from 'react-router-dom';

const ServiceProvider = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Providers');
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const myId = localStorage.getItem("id")

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API}/user/users`, {
          category: selectedCategory,
        });
        console.log('Providers fetched:', response.data);
        setProviders(Array.isArray(response.data) ? response.data : []);
        setError('');
      } catch (error) {
        console.error('Error fetching providers:', error);
        if (error.response) {
          if (error.response.status === 404) {
            setError('No users found for this category');
            setProviders([]);
          } else {
            setError('An unexpected error occurred');
          }
        } else if (error.request) {
          setError('No response from server');
        } else {
          setError('Error Fetching Providers');
        }
      }
    };

    fetchProviders();
  }, [selectedCategory]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className={styles.ratingStars}>
        {'★'.repeat(fullStars)}
        {halfStar === 1 && '☆'}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  };

  const handleProfileClick = (provider) => {
    navigate(`/profile/${provider._id}`);
  };

  const handleContactClick = (name) => {
    alert(`Initiating contact with ${name}`);
  };

  const categories = [
    'All Providers',
    'Home Services',
    'Legal & Financial Services',
    'Creative Services',
    'Healthcare',
    'Educational Services',
    'Technical Services',
  ];

  const filteredProviders = Array.isArray(providers) ? providers.filter((provider) =>
    `${provider.profile.firstName} ${provider.profile.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  ) : [];

  console.log('Selected Category:', selectedCategory);
  console.log('Providers:', providers);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={selectedCategory === category ? styles.selected : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>



      <div className={styles.cards}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for a provider by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.providersList}>

          <div className={styles.cards}></div>
          {error && <p className={styles.error}>{error}</p>}

          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <div key={index} className={styles.providerCard}>
                <img
                  src={provider.profile.profileImage}
                  alt={provider.profile.firstName}
                  className={styles.providerPhoto}
                />
                <div className={styles.providerInfo}>
                  <h3>{provider.profile.firstName} {provider.profile.lastName}</h3>
                  <p className={styles.career}>{provider.career}</p>
                  {renderRatingStars(provider.rating)}
                  <p className={styles.experience}>Experience: {provider.profile.experience} years</p>
                  <p className={`${styles.certificate} ${provider.certificate.isCertified ? styles.verified : styles.notVerified}`}>
                    {provider.certificate.isCertified ? (
                      <FaCheckCircle className={styles.icon} />
                    ) : (
                      <FaTimesCircle className={styles.icon} />
                    )}
                    {provider.certificate.isCertified ? 'Verified by Practical Certificate' : 'Not Verified'}
                  </p>
                  {provider._id !== myId? (
                  <div className={styles.buttons}>
                    
                    <button
                      onClick={() => handleProfileClick(provider)}
                      className={styles.profileButton}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleContactClick(provider.profile.firstName)}
                      className={styles.contactButton}
                    >
                      <FaEnvelope className={styles.icon} /> Contact
                    </button>
                  </div>
                  
                  ):(
                    
                      <button className={styles.myProfile}
                      onClick={() => handleProfileClick(provider)}
                      
                      >show your profile</button>
                    
                  )}
                </div>
              </div>

            ))
          ) : (
            <p>No providers found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
