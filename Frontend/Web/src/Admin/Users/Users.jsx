import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Home Services");
  const [showAll, setShowAll] = useState(false);



    useEffect(()=>{
        const fetchAllUsers = async()=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_API}/user/Allusers`)
                setUsers(response.data);
            }
            catch(error){
                console.log("Error Fetching Users: ",error);
            }
        }
        fetchAllUsers();
    },[])


    // {
    //     id: 1,
    //     name: "John Doe",
    //     photo: "https://randomuser.me/api/portraits/men/1.jpg",
    //     career: "Plumber",
    //     rating: 4.5,
    //     experience: 5,
    //     isVerified: true,
    //     category: "Home Services",
    //   },



  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowAll(false); 
  };

  const handleShowAllClick = () => {
    setShowAll(prevState => !prevState); 
    if (showAll) {
      setSelectedCategory("Home Services"); 
    }
  };

  const filteredUsers = showAll
  ? users
  : users.filter(user => user.careerCategory === selectedCategory);

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
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className={styles.userCard}>
              <img src={user.profile.profileImage} alt={user.profile.firstName} className={styles.userImage} />
              <div className={styles.userInfo}>
                <h3>{user.profile.firstName} {user.profile.lastName}</h3>
                <p>Career: {user.careerCategory}</p>
                <p>Rating: {user.rating}</p>
                <p>Experience: {user.profile.experience} years</p>
                <p>Verified: {user.certificate.isCertified ? 'Yes' : 'No'}</p>
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
