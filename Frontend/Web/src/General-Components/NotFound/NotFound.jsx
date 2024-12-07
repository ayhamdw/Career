import React from 'react';
import styles from './NotFound.module.css'; 
const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundTitle}>404</h1>
        <p className={styles.notFoundText}>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className={styles.backHomeLink}>Go Back Home</a>
      </div>
    </div>
  );
};

export default NotFound;
