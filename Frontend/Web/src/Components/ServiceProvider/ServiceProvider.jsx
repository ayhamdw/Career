import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ServiceProvider.module.css';
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa';

const ServiceProvider = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home Services');
  const [providers, setProviders] = useState([]);
  
  useEffect(() => {
    // Fetch the service providers from your API
    axios.get('http://localhost:5000/api/users') // Adjust API URL if necessary
      .then((response) => {
        setProviders(response.data); // Set the providers state with data from the API
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
      });
  }, []); // The empty array ensures this runs only once when the component mounts

  const filteredProviders = providers.filter(provider => provider.category === selectedCategory);

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

  const handleProfileClick = (id) => {
    alert(`Navigating to profile of provider with ID: ${id}`);
  };

  const handleContactClick = (name) => {
    alert(`Initiating contact with ${name}`);
  };

  const categories = [
    'Home Services',
    'Legal & Financial Services',
    'Creative Services',
    'Healthcare',
    'Educational Services',
    'Technical Services',
  ];

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

      <div className={styles.providersList}>
        {filteredProviders.map((provider, index) => (
          <div key={index} className={styles.providerCard}>
            <img
              src={provider.photo}
              alt={`${provider.name}'s photo`}
              className={styles.providerPhoto}
            />
            <div className={styles.providerInfo}>
              <h3>{provider.name}</h3>
              <p className={styles.career}>{provider.career}</p>
              {renderRatingStars(provider.rating)}
              <p className={styles.experience}>Experience: {provider.experience} years</p>
              <p className={`${styles.certificate} ${provider.verified ? styles.verified : styles.notVerified}`}>
                {provider.verified ? (
                  <FaCheckCircle className={styles.icon} />
                ) : (
                  <FaTimesCircle className={styles.icon} />
                )}
                {provider.verified ? 'Verified by Practical Certificate' : 'Not Verified'}
              </p>

              <div className={styles.buttons}>
                <button
                  onClick={() => handleProfileClick(provider._id)} 
                  className={styles.profileButton}
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleContactClick(provider.name)}
                  className={styles.contactButton}
                >
                  <FaEnvelope className={styles.icon} /> Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProvider;
