import React, { useState } from 'react';
import styles from './ServiceProvider.module.css';
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa';

const ServiceProvider = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home Services');
  
  const providers = [
    {
      name: 'Shareef Mwafy',
      photo: 'https://via.placeholder.com/120',
      career: 'Web Developer',
      rating: 4.5,
      experience: 5,
      verified: true,
      category: 'Technical Services',
    },
    {
      name: 'Ayham Duwairy',
      photo: 'https://via.placeholder.com/120',
      career: 'Graphic Designer',
      rating: 3.5,
      experience: 3,
      verified: false,
      category: 'Creative Services',
    },
    {
      name: 'Khalid Omar',
      photo: 'https://via.placeholder.com/120',
      career: 'Project Manager',
      rating: 4.0,
      experience: 7,
      verified: false,
      category: 'Technical Services',
    },

  ];

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
                  onClick={() => handleProfileClick(provider.id)}
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
