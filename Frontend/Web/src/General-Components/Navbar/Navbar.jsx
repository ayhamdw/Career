import React, { useState } from 'react'
import '../../index.css'
import './Navbar.css'
import '../../main.css'
import { Link } from 'react-router-dom'
import logo from './logo.png'; // Update with your actual logo path




function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="navbar">
      <div className="containerNav">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <Link to="/" className="logo-text">Career</Link>
          </div>

          {/* Navigation Links */}
          <nav
            className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}
            role="navigation"
          >
            <ul>
              <li><Link to="/" className="nav-item">Home</Link></li>
              <li><Link to="/requests" className="nav-item">Requests</Link></li>
              <li><Link to="/messages" className="nav-item">Messages</Link></li>
              <li><Link to="/Find-job" className="nav-item">Find a job</Link></li>
              <li><Link to="/settings" className="nav-item">Profile</Link></li>
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Authentication Links */}
          <div className="auth-links">
            <Link to="/signin" className="auth-btn">Sign In</Link>
            <Link to="/signup" className="auth-btn auth-btn-signup">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </button>
        </div>

        {/* Backdrop for Mobile Menu */}
        {isMobileMenuOpen && <div className="menu-backdrop" onClick={toggleMobileMenu}></div>}
      </div>
    </header>
  );
}

export default Navbar