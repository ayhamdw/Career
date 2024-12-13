import React from "react";
import styles from "./Projects.module.css";

const Projects = () => {
  return (
    <div className={styles.projectsPage}>
      <h2 className={styles.pageTitle}>Your Projects</h2>
      <p className={styles.projectsInfo}>You have 10 projects in total.</p>
      <div className={styles.projectsGrid}>
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className={styles.projectCard}>
            <img
              src={`https://via.placeholder.com/300x220?text=Project+${index + 1}`}
              alt={`Project ${index + 1}`}
              className={styles.projectImage}
            />
            <div className={styles.projectCardContent}>
              <div className={styles.projectCardHeader}>
                <h3 className={styles.projectTitle}>Project {index + 1}</h3>
                <p className={styles.projectType}>Project Type</p>
              </div>
              <p className={styles.projectDescription}>
                Description for project {index + 1} goes here. Learn more about the features and functionalities.
              </p>
              <div className={styles.projectClientLocation}>
                <span className={styles.projectClient}>Client: Company {index + 1}</span>
                <span className={styles.projectLocation}>Location: City {index + 1}</span>
              </div>
              <a href={`/project/${index + 1}`} className={styles.projectButton}>
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
