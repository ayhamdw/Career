import React from 'react';
import styles from './Friends.module.css';

const Friends = () => {
  const friendsData = [
    { id: 1, firstName: "John", lastName: "Doe", photo: "https://via.placeholder.com/150", career: "Home Services" },
    { id: 2, firstName: "Jane", lastName: "Smith", photo: "https://via.placeholder.com/150", career: "Technical Services" },
    { id: 3, firstName: "Ali", lastName: "Khan", photo: "https://via.placeholder.com/150", career: "Educational Services" },
    { id: 4, firstName: "Sara", lastName: "Lee", photo: "https://via.placeholder.com/150", career: "Healthcare" },
    { id: 5, firstName: "Tom", lastName: "Brown", photo: "https://via.placeholder.com/150", career: "Creative Services" },
    { id: 6, firstName: "Emily", lastName: "Davis", photo: "https://via.placeholder.com/150", career: "Legal & Financial Services" },
    { id: 7, firstName: "Ahmed", lastName: "Hassan", photo: "https://via.placeholder.com/150", career: "Other" },
    { id: 8, firstName: "Maria", lastName: "Garcia", photo: "https://via.placeholder.com/150", career: "Home Services" },
  ];

  const careerCategories = [
    "Home Services",
    "Technical Services",
    "Educational Services",
    "Healthcare",
    "Creative Services",
    "Legal & Financial Services",
    "Other",
  ];

  const categorizedFriends = careerCategories.map((category) => ({
    category,
    friends: friendsData.filter((friend) => friend.career === category),
  }));

  return (
    <div className={styles.friendsContainer}>
      <h1 className={styles.friendsTitle}>My Friends</h1>
      {categorizedFriends.map(({ category, friends }) => (
        friends.length > 0 && (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.friendsList}>
              {friends.map((friend) => (
                <div key={friend.id} className={styles.friendCard}>
                  <img
                    src={friend.photo}
                    alt={`${friend.firstName} ${friend.lastName}`}
                    className={styles.friendPhoto}
                  />
                  <div className={styles.friendDetails}>
                    <h3 className={styles.friendName}>
                      {friend.firstName} {friend.lastName}
                    </h3>
                    <p className={styles.friendCareer}>{friend.career}</p>
                  </div>
                  <span className={styles.friendBadge}>Friends</span>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Friends;
