import React from 'react';
import './Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h4>About Us</h4>
          <p>A platform that aims to bring the service provider and the customer closer together.</p>
        </div>
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Main</Link></li>
            <li><Link to="/items">Requests</Link></li>
            <li><Link to="/contact">Messages</Link></li>
            <li><Link to="/friend-requests">Friend Requests</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <div className="contact-details">
            <p><i className="fas fa-envelope"></i> career@gmail.com</p>
            <p><i className="fas fa-phone-alt"></i> (+970) 597 193 350</p>
          </div>
        </div>
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Career. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
