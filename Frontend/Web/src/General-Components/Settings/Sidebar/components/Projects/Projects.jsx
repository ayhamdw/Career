import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects-page">
      <h2 className="page-title">Your Projects</h2>
      <p className="projects-info">You have 10 projects in total.</p>
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 1</h3>
            <p className="project-type">Web Development</p>
          </div>
          <p className="project-description">
            A responsive web application for managing projects.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 2</h3>
            <p className="project-type">Mobile App</p>
          </div>
          <p className="project-description">
            A mobile app designed to improve user engagement through push notifications.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 3</h3>
            <p className="project-type">Machine Learning</p>
          </div>
          <p className="project-description">
            A machine learning model for predicting trends based on user data.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 4</h3>
            <p className="project-type">Data Analysis</p>
          </div>
          <p className="project-description">
            In-depth analysis of large datasets to extract meaningful insights.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 5</h3>
            <p className="project-type">E-Commerce</p>
          </div>
          <p className="project-description">
            Developed a full-stack e-commerce platform with secure payment gateway integration.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 6</h3>
            <p className="project-type">Cloud Computing</p>
          </div>
          <p className="project-description">
            Built a scalable cloud infrastructure for a high-traffic website.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 7</h3>
            <p className="project-type">Blockchain</p>
          </div>
          <p className="project-description">
            Developed a blockchain-based platform for secure digital transactions.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 8</h3>
            <p className="project-type">Game Development</p>
          </div>
          <p className="project-description">
            Created an immersive 3D game with real-time multiplayer features.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 9</h3>
            <p className="project-type">AI Automation</p>
          </div>
          <p className="project-description">
            Developed an AI system for automating tasks and improving workflow efficiency.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 10</h3>
            <p className="project-type">Networking</p>
          </div>
          <p className="project-description">
            Built a high-speed network infrastructure for large-scale business operations.
          </p>
        </div>
        <div className="project-card">
          <div className="project-card-header">
            <h3 className="project-title">Project 10</h3>
            <p className="project-type">Networking</p>
          </div>
          <p className="project-description">
            Built a high-speed network infrastructure for large-scale business operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
