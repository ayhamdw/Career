import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaProjectDiagram, FaImage, FaUserEdit, FaUserFriends, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="user-info">
        <img
          src="https://via.placeholder.com/100"
          alt="User"
          className="user-picture"
        />
        <h2 className="user-name">Shareef</h2>
      </div>

      <ul className="sidebar-links">
        <Link to="/settings/projects" className="sidebar-link">
          <li>
            <FaProjectDiagram className="icon" />
            <span>Projects (10)</span>
          </li>
        </Link>
        <Link to="/settings/portfolio" className="sidebar-link">
          <li>
            <FaImage className="icon" />
            <span>Portfolio</span>
          </li>
        </Link>
        <Link to="/settings/change-info" className="sidebar-link">
          <li>
            <FaUserEdit className="icon" />
            <span>Change Information</span>
          </li>
        </Link>

        <Link to="/settings/friend-requests" className="sidebar-link">
          <li>
            <FaUserFriends className="icon" />
            <span>Friend Requests</span>
          </li>
        </Link>
        
        <Link to="/logout" className="sidebar-link">
          <li>
            <FaSignOutAlt className="icon" />
            <span>Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
