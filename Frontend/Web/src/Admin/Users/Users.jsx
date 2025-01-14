import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Home Services");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Fake user data for testing purposes
    const fakeUsers = [
      {
        id: 1,
        name: "John Doe",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        career: "Plumber",
        rating: 4.5,
        experience: 5,
        isVerified: true,
        category: "Home Services",
      },
      {
        id: 2,
        name: "Jane Smith",
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
        career: "Electrician",
        rating: 4.8,
        experience: 7,
        isVerified: false,
        category: "Home Services",
      },
      {
        id: 3,
        name: "Carlos Martinez",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        career: "Web Developer",
        rating: 4.2,
        experience: 3,
        isVerified: true,
        category: "Technical Services",
      },
      {
        id: 4,
        name: "Emily Brown",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        career: "Teacher",
        rating: 4.7,
        experience: 10,
        isVerified: true,
        category: "Educational Services",
      },
      {
        id: 5,
        name: "Ahmed Al-Farsi",
        photo: "https://randomuser.me/api/portraits/men/5.jpg",
        career: "Nurse",
        rating: 4.9,
        experience: 6,
        isVerified: true,
        category: "Healthcare",
      },
      {
        id: 6,
        name: "Sophia Lee",
        photo: "https://randomuser.me/api/portraits/women/6.jpg",
        career: "Graphic Designer",
        rating: 4.3,
        experience: 4,
        isVerified: false,
        category: "Creative Services",
      },
    ];

    // Filter users based on the category or show all users if showAll is true
    const filteredUsers = showAll
      ? fakeUsers
      : fakeUsers.filter(user => user.category === selectedCategory);

    setUsers(filteredUsers);
  }, [selectedCategory, showAll]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowAll(false); // Reset to category view when changing category
  };

  const handleShowAllClick = () => {
    setShowAll(prevState => !prevState); // Toggle the showAll state
    if (showAll) {
      setSelectedCategory("Home Services"); // Reset to the default category when showing all users
    }
  };

  return (
    <div className={styles.container}>
      <h1>Users in {showAll ? 'All Categories' : selectedCategory}</h1>
      
      {/* Category Selection */}
      {!showAll && (
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.categorySelect}
        >
          <option value="Home Services">Home Services</option>
          <option value="Technical Services">Technical Services</option>
          <option value="Educational Services">Educational Services</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Creative Services">Creative Services</option>
          <option value="Legal & Financial Services">Legal & Financial Services</option>
          <option value="Other">Other</option>
        </select>
      )}

      {/* Show All Users Button */}
      <button
        onClick={handleShowAllClick}
        className={styles.showAllButton}
      >
        {showAll ? 'Show By Category' : 'Show All Users'}
      </button>

      {/* Display Users */}
      <div className={styles.usersList}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className={styles.userCard}>
              <img src={user.photo} alt={user.name} className={styles.userImage} />
              <div className={styles.userInfo}>
                <h3>{user.name}</h3>
                <p>Career: {user.career}</p>
                <p>Rating: {user.rating}</p>
                <p>Experience: {user.experience} years</p>
                <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No users found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
