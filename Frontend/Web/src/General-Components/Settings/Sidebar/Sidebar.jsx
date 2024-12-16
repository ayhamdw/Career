import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Sidebar.module.css";
import { FaProjectDiagram, FaImage, FaUserEdit, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import axios from "axios"


const Sidebar = () => {
  const { logout } = useAuth(); 
const navigate = useNavigate();

const handleLogout = () => {
  logout(); 
  navigate("/signin"); 
  window.location.reload();
};


const [userFirstName,setUserFirstName] = useState("");
const [userLastName,setUserLastName] = useState("");

useEffect(()=>{
  
  const fetchFirstName = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("http://localhost:7777/api/user/firstName",{email});
      setUserFirstName(response.data.firstName);
      console.log(response.data.firstName)
      
    }catch(error){
        console.error("Error Fetching user FirstName: ", error);
    }
  }
  const fetchLastName = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("http://localhost:7777/api/user/lastName",{email});
      setUserLastName(response.data.lastName);
      console.log(response.data.lastName)
      
    }catch(error){
        console.error("Error Fetching user LastName: ", error);
    }
  }

  fetchFirstName();
  fetchLastName();

},[]);
  return (
    <div className={style.sidebarContainer}>
      <div className={style.userInfo}>
        <img
          src="https://via.placeholder.com/100"
          alt="User"
          className={style.userPicture}
        />
        <h2 className={style.userName}>{userFirstName} {userLastName}</h2>
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
        
        {/* Replace Link with a button or div for logout */}
        <div className={style.sidebarLink} onClick={handleLogout}>
          <li>
            <FaSignOutAlt className={style.icon} />
            <span>Logout</span>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
