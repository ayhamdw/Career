import React,{useEffect,useState} from "react";
import axios from "axios"
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Projects from "./Sidebar/components/Projects/Projects";
import Portfolio from "./Sidebar/components/Portfolio/Portfolio";
import ChangeInfo from "./Sidebar/components/ChangeInformation/ChangeInformation";
import FriendRequests from "./Sidebar/components/FriendRequests/FriendRequests";
import Friends from './Sidebar/components/Friends/Friends'
import "./Settings.css";

const Settings = () => {

  const [userFirstName,setUserFirstName] = useState("");
  const [userLastName,setUserLastName] = useState("");
  const [bio,setBio] = useState("");
  const [userInfo,setUserInfo] = useState([]);


useEffect(()=>{
  
  const fetchFirstName = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("http://localhost:7777/api/user/firstName",{email});
      setUserFirstName(response.data.firstName);
      
    }catch(error){
        console.error("Error Fetching user FirstName: ", error);
    }
  }
  const fetchLastName = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("http://localhost:7777/api/user/lastName",{email});
      setUserLastName(response.data.lastName);
      
    }catch(error){
        console.error("Error Fetching user LastName: ", error);
    }
  }
  const fetchBio = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("http://localhost:7777/api/user/bio",{email});
      setBio(response.data.bio);      
    }catch(error){
        console.error("Error Fetching user LastName: ", error);
    }
  }

  fetchFirstName();
  fetchLastName();
  fetchBio();

},[]);



useEffect(()=>{
  const fetchUserInfo = async() =>{
    const email = localStorage.getItem("userEmail");
    try{
      const response = await axios.post(`http://localhost:7777/api/user/user`,{email});
      setUserInfo(response.data.data);
      console.log(userInfo.profile.firstName)
      console.log(response.data.data)
    }
    catch(error){
      console.log("Error Fetch User Info:",error);
    }
  }
  fetchUserInfo();
},[]);


  return (
    <div className="settings-container">
      <Sidebar user={userInfo}/>
      
        <Routes>
          <Route path="projects" element={<Projects />} />
          <Route path="portfolio" element={<Portfolio userFirstName={userFirstName} userLastName={userLastName} bio={bio}/>} />
          <Route path="change-info" element={<ChangeInfo user={userInfo}/>} />
          <Route path="friend-requests" element={<FriendRequests />} />
          <Route path="friends" element={<Friends />} />
          <Route
            path=""
            element={<Projects />} 
          />
        </Routes>
      
    </div>
  );
};

export default Settings;
