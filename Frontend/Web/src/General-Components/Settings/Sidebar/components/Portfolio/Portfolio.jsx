import React from "react";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <div className="page-container">
      <h2>Portfolio</h2>
      <div className="portfolio-gallery">
        <img src="https://via.placeholder.com/150" alt="Project 1" />
        <img src="https://via.placeholder.com/150" alt="Project 2" />
        <img src="https://via.placeholder.com/150" alt="Project 3" />
        {/* Add more project images */}
      </div>
    </div>
  );
};

export default Portfolio;
