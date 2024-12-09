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
        <h2 className="user-name">John Doe</h2>
      </div>

      <ul className="sidebar-links">
        <li>
          <FaProjectDiagram className="icon" />
          <Link to="/projects">Projects (10)</Link>
        </li>
        <li>
          <FaImage className="icon" />
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <FaUserEdit className="icon" />
          <Link to="/change-info">Change Information</Link>
        </li>
        <li>
          <FaUserFriends className="icon" />
          <Link to="/friend-requests">Friend Requests</Link>
        </li>
        <li>
          <FaSignOutAlt className="icon" />
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
