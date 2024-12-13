import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
  return (
    <div className={styles.portfolioWrapper}>
      <header className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1>Shareef Mwafy</h1>
          <p>Full-Stack Developer | Web & Mobile Applications</p>
        </div>
      </header>

      <section className={styles.introSection}>
        <h2>My Projects</h2>
        <p>Explore my portfolio to see some of the professional projects I have worked on.</p>
      </section>

      <div className={styles.projectGallery}>
        <div className={styles.projectItem}>
          <img src="https://via.placeholder.com/400" alt="Project 1" />
          <div className={styles.projectOverlay}>
            <h3>Project 1</h3>
            <p>React, Node.js, MongoDB, and more.</p>
          </div>
        </div>
        <div className={styles.projectItem}>
          <img src="https://via.placeholder.com/400" alt="Project 2" />
          <div className={styles.projectOverlay}>
            <h3>Project 2</h3>
            <p>AI-powered recommendation system with TensorFlow.</p>
          </div>
        </div>
        <div className={styles.projectItem}>
          <img src="https://via.placeholder.com/400" alt="Project 3" />
          <div className={styles.projectOverlay}>
            <h3>Project 3</h3>
            <p>Business management system using MERN stack.</p>
          </div>
        </div>
      </div>

      <div className={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/shareef-mwafy-a3014623a/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={40} />
        </a>
        <a href="https://github.com/yourgithubprofile" target="_blank" rel="noopener noreferrer">
          <FaGithub size={40} />
        </a>
        <a href="mailto:sh@gmial.com">
          <FaEnvelope size={40} />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;
