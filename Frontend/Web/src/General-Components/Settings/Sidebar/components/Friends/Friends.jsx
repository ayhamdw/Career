import React, { useEffect, useState } from "react";
import styles from "./Friends.module.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Friends = () => {
  const navigate = useNavigate();
  
  const [friends,setFriends] = useState([]);

  const careerCategories = [
    "All Categories",
    "Home Services",
    "Technical Services",
    "Educational Services",
    "Healthcare",
    "Creative Services",
    "Legal & Financial Services",
    "Other",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredFriends =
    selectedCategory === "All Categories"
      ? friends
      : friends.filter((friend) => friend.careerCategory === selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const viewProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect (()=>{
    const myId = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    const fetchFriends = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_API}/friends/acceptedFriends/${myId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        console.log(response.data[0]);
        setFriends(response.data);
      }
      catch(e){
        console.log("Error Fetch Friends: ",e)
      }

    }
    fetchFriends();

  },[])

  return (
    <div className={styles.friendsContainer}>
      <h1 className={styles.friendsTitle}>My Friends</h1>

      {/* Category Selector */}
      <div className={styles.categorySelector}>
        <label htmlFor="category" className={styles.categoryLabel}>
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.categoryDropdown}
        >
          {careerCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.friendsList}>
        {filteredFriends.map((friend) => (
          <li key={friend._id} className={styles.friendItem}>
            <img
              src={friend.profile.profileImage}
              alt={`${friend.profile.firstName} ${friend.profile.lastName}`}
              className={styles.friendPhoto}
            />
            <div className={styles.friendDetails}>
              <h3 className={styles.friendName}>
                {friend.profile.firstName} {friend.profile.lastName}
              </h3>
              <p className={styles.friendCareer}>{friend.careerCategory}</p>
              <p className={styles.friendRating}>Rating: ⭐ {friend.rating}</p>
            </div>
            <div className={styles.friendActions}>
              <button
                className={styles.viewProfileBtn}
                onClick={() => viewProfile(friend._id)}
              >
                View Profile
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
