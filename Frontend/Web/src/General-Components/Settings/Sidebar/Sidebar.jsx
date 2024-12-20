import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./Sidebar.module.css";
import { FaProjectDiagram, FaImage, FaUserEdit, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";

const Sidebar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div className={style.sidebarContainer}>
      <div className={style.userInfo}>
        <img
          src={user?.profile?.profileImage || "https://via.placeholder.com/100"}
          alt="User"
          className={style.userPicture}
        />
        <h2 className={style.userName}>
          {user?.profile?.firstName || "Guest"} {user?.profile?.lastName || ""}
        </h2>
      </div>
      <ul className={style.sidebarLinks}>
        <Link to="/settings/projects" className={style.sidebarLink}>
          <li>
            <FaProjectDiagram className={style.icon} />
            <span>Projects (10)</span>
          </li>
        </Link>
        <Link to="/settings/portfolio" className={style.sidebarLink}>
          <li>
            <FaImage className={style.icon} />
            <span>Portfolio</span>
          </li>
        </Link>
        <Link to="/settings/change-info" className={style.sidebarLink}>
          <li>
            <FaUserEdit className={style.icon} />
            <span>Change Information</span>
          </li>
        </Link>
        <Link to="/settings/friend-requests" className={style.sidebarLink}>
          <li>
            <FaUserFriends className={style.icon} />
            <span>Friend Requests</span>
          </li>
        </Link>
        <Link to="/settings/friends" className={style.sidebarLink}>
          <li>
            <FaUserFriends className={style.icon} />
            <span>Friends</span>
          </li>
        </Link>
        <Link className={style.sidebarLink} onClick={handleLogout}>
          <li>
            <FaSignOutAlt className={style.icon} />
            <span>Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
    }),
  }),
};

Sidebar.defaultProps = {
  user: {
    profile: {
      firstName: "Guest",
      lastName: "",
      profilePicture: null,
    },
  },
};

export default Sidebar;
