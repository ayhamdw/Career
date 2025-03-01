import React,{useEffect,useState} from "react";
import axios from "axios"
import { Routes, Route } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import SavedPosts from "./Sidebar/components/SavedPosts/SavedPosts";
import Portfolio from "./Sidebar/components/Portfolio/Portfolio";
import ChangeInfo from "./Sidebar/components/ChangeInformation/ChangeInformation";
import FriendRequests from "./Sidebar/components/FriendRequests/FriendRequests";
import Friends from './Sidebar/components/Friends/Friends'
import UploadCertificate from './Sidebar/components/UploadCertificate/UploadCertificate'
import "./Settings.css";

const Settings = () => {

  const [userFirstName,setUserFirstName] = useState("");
  const [userLastName,setUserLastName] = useState("");
  const [bio,setBio] = useState("");
  const [userInfo,setUserInfo] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 


useEffect(()=>{
  
  const fetchFirstName = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post(`${import.meta.env.VITE_API}/user/firstName`,{email});
      setUserFirstName(response.data.firstName);
      
    }catch(error){
        console.error("Error Fetching user FirstName: ", error);
    }
  }
  const fetchLastName = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post(`${import.meta.env.VITE_API}/user/lastName`,{email});
      setUserLastName(response.data.lastName);
      
    }catch(error){
        console.error("Error Fetching user LastName: ", error);
    }
  }
  const fetchBio = async () =>{
    try{
      const email = localStorage.getItem("userEmail");
      const response = await axios.post(`${import.meta.env.VITE_API}/user/bio`,{email});
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
      const response = await axios.post(`${import.meta.env.VITE_API}/user/user`,{email});
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
          <Route path="SavedPosts" element={<SavedPosts />} />
          <Route path="portfolio" element={<Portfolio userFirstName={userFirstName} userLastName={userLastName} bio={bio}/>} />
          <Route path="change-info" element={<ChangeInfo user={userInfo}/>} />
          <Route path="friend-requests" element={<FriendRequests />} />
          <Route path="friends" element={<Friends />} />
          <Route path="upload-certificate" element={<UploadCertificate />} />
          <Route
            path=""
            element={<SavedPosts />} 
          />
        </Routes>
      
    </div>
  );
};

export default Settings;
