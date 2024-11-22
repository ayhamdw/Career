import React from 'react';
import './Footer.css'; 
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>A platform that aims to bring the service provider and the customer closer together.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Main</Link></li>
            <li><Link to="/items">Requests</Link></li>
            <li><Link to="/contact">Messages</Link></li>
            <li><Link to="/friend-requests">Friend Requests</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: career@gmail.com</p>
          <p>Phone: (+970) 597 193 350</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Career. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
