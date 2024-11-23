import React from 'react';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className='container'>
      <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="back-home-link">Go Back Home</a>
    </div>
    </div>
  );
};

export default NotFound;
