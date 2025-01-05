import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Projects.module.css";

const Projects = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const myId = localStorage.getItem("id")
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/community/getSavedPosts/${myId}`);
        setSavedPosts(response.data.savedPosts); 
      } catch (error) {
        console.error("Error fetching saved posts: ", error);
      }
    };

    fetchSavedPosts(); 
  }, []); 

  return (
    <div className={styles.projectsPage}>
      <h2 className={styles.pageTitle}>Your Saved Posts</h2>
      <p className={styles.projectsInfo}>You have {savedPosts.length} saved posts.</p>

      <div className={styles.projectsGrid}>
        {savedPosts.length === 0 ? (
          <p>No saved posts found.</p> 
        ) : (
          savedPosts.map((post) => (
            <div key={post._id} className={styles.projectCard}>
              <img
                src={post.images[0] || "https://via.placeholder.com/300x220?text=No+Image"} 
                alt={post.title}
                className={styles.projectImage}
              />
              <div className={styles.projectCardContent}>
                <div className={styles.projectCardHeader}>
                  <h3 className={styles.projectTitle}>{post.title}</h3>
                  <p className={styles.projectType}>{post.careerCategory}</p>
                </div>
                <p className={styles.projectDescription}>
                  {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content} 
                </p>
                <div className={styles.projectClientLocation}>
                  <span className={styles.projectClient}>Client: {post.user?.profile?.firstName || "Unknown"}</span>
                  <span className={styles.projectLocation}>Location: {post.location}</span>
                </div>
                <a href={`/project/${post._id}`} className={styles.projectButton}>
                  View Post
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
