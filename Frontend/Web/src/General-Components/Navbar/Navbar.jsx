import React, { useState, useEffect} from 'react'
import '../../index.css'
import './Navbar.css'
import '../../main.css'
import { Link } from 'react-router-dom'
import logo from '../../../src/assets/logo.png'
import ProfileIcon from './profile.png'; 
import axios from "axios";




function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRequestsDropdownOpen, setIsRequestsDropdownOpen] = useState(false); 

  const [profileImage,setProfileImage] = useState(null);
  const [userName, setUserName] = useState('');

useEffect(()=>{
  const email = localStorage.getItem("userEmail");
  
    const fetchImage= async()=>{
      try{
      const response = await axios.post(`${import.meta.env.VITE_API}/user/user`,{email});
      setProfileImage(response.data.data.profile.profileImage);
      const {firstName, lastName} = response.data.data.profile;
      setUserName(firstName + " "+ lastName);
      console.lof(response.data)
      }
  catch(error){
    console.log("Error");
  }
}
  fetchImage();
},[]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  
    } else {
      setIsAuthenticated(false); 
    }

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleRequestsDropdown = () => {
    setIsRequestsDropdownOpen(!isRequestsDropdownOpen); 
  };

  
  return (
    <header className="navbar">
      <div className="containerNav">
        <div className="navbar-content">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <Link to="/" className="logo-text">Career</Link>
          </div>
          <nav
            className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}
            role="navigation"
          >
            <ul>
              <li><Link to="/" className="nav-item">Home</Link></li>
              <li
                className="nav-item dropdown"
                onClick={toggleRequestsDropdown}
              >
                Requests
                {isRequestsDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><Link to="/requests/sent">Sent Requests</Link></li>
                    <li><Link to="/requests/received">Received Requests</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/messages" className="nav-item">Messages</Link></li>
              <li><Link to="/community" className="nav-item">Community</Link></li>
              <li><Link to="/settings" className="nav-item">Profile</Link></li>
            </ul>
          </nav>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <div className="auth-links">
            {isAuthenticated ? (
              <Link to="/settings" className="profile-icon-link">
                <img src={profileImage} alt="Profile" className="profile-icon" />
                <p>{userName}</p>
              </Link>
            ) : (
              <>
                <Link to="/signin" className="auth-btn">Sign In</Link>
                <Link to="/signup" className="auth-btn auth-btn-signup">Sign Up</Link>
              </>
            )}
          </div>
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
        {isMobileMenuOpen && <div className="menu-backdrop" onClick={toggleMobileMenu}></div>}
      </div>
    </header>
  );
}

export default Navbar