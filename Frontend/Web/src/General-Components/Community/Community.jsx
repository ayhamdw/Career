import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Community.module.css";
import userImage from './poster.png';
import { toast } from 'react-toastify';




const Community = ({ userCareer }) => {

  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    careerCategory: "",
    location: "",
    numberOfWorker: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLasttName] = useState("");
  const [userCoordinates, setUserCoordinates] = useState([]);

  const categories = [
    "Home Services",
    "Technical Services",
    "Educational Services",
    "Healthcare",
    "Creative Services",
    "Legal & Financial Services",
    "Other",
  ];

  const cities = [
    "Nablus",
    "Ramallah",
    "Jerusalem",
    "Hebron",
    "Jenin",
    "Bethlehem",
    "Tulkarm",
    "Qalqilya",
    "Jericho",
    "Gaza",
  ];





  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post("http://localhost:7777/api/user/id", { email });
        setCurrentUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };


    const fetchUserRole = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post("http://localhost:7777/api/user/role", { email });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/community/posts");
        setPosts(response.data);
        // console.log("posts: ", JSON.stringify(response.data, null, 2));
        response.data.forEach(post => {
          console.log("Post data: ", post.user._id);
        });

      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

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
        setUserLasttName(response.data.lastName);
        console.log(response.data.lastName)
        
      }catch(error){
          console.error("Error Fetching user LastName: ", error);
      }
    }

    const fetchCoordinates = async () => {
      try{
        const email = localStorage.getItem("userEmail");
        const response = await axios.post(`http://localhost:7777/api/user/coordinates`,{email});
        const {longitude, latitude} = response.data;
        setUserCoordinates([longitude,latitude]);
        console.log(userCoordinates);
      }
      catch(error){
        console.error("Coordinates Error: ",error);
      }
    }


    fetchCurrentUser();
    fetchUserRole();
    fetchPosts();
    fetchFirstName();
    fetchLastName();
    fetchCoordinates();
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to log in first.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    try {
      const post = {
        title: form.title,
        content: form.content,
        careerCategory: form.careerCategory,
        location: form.location,
        numberOfWorker: form.numberOfWorker,
        userRole: userRole,
        userFirstName: userFirstName,
        userLastName: userLastName,

      };

      const response = await axios.post(
        "http://localhost:7777/api/community/post",
        post,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      window.location.reload();


      
      setPosts([response.data, ...posts]);
      
      setForm({ title: "", content: "", careerCategory: "", location: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
    }
  };



  const handleDeletePost = async (postId) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if(isConfirmed){
          const token = localStorage.getItem('token');
  
    if (!token) {
      toast.error("You need to log in first.");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:7777/api/community/deletePost/${postId}`);
      toast.success(response.data.message);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error(error.response?.data?.message || 'Failed to delete post.');
    }

    }

  };

  const handleApplyForThisJop = async (proficientId, userId, requestDateTime, [longitude,latitude]) => {
    try {
      const token = localStorage.getItem("token"); 
  
      if (!token) {
        console.log("No token found. Please log in again.");
        return;
      }
        const response = await axios.post(
        `http://localhost:7777/api/proficient/booking-proficient`, 
        {
          proficientId,
          userId,
          requestDateTime,
          location:{
            latitude,
            longitude
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
    } catch (error) {
      console.log("Error Apply Job: ", error);
    }
  };
  

  return (
    <div className={styles.communityContainer}>
      <div className={styles.mainContent}>
        <div className={styles.rightSection}>
          <h3>Featured Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>

          <h3>Popular Cities</h3>
          <ul>
            {cities.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>

        <div className={styles.postsSection}>
          <button className={styles.createPostBtn} onClick={

            () => {
              const token = localStorage.getItem('token');
              if (!token) {
                toast.error("You need to log in first.");
                setTimeout(() => {
                  window.location.href = "/signin";
                }, 2000);
              }
              setIsModalOpen(true)
            }

          }>
            Create Post
          </button>
          {isModalOpen /*&& userRole === "admin"*/ && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <form onSubmit={handleSubmit}>
                  <h2>Create a New Post</h2>

                  <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                  />

                  <textarea
                    name="content"
                    placeholder="Post Content"
                    value={form.content}
                    onChange={handleInputChange}
                    required
                  />

                  <select
                    name="careerCategory"
                    value={form.careerCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    name="location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Jerusalem">Jerusalem</option>
                    <option value="Gaza">Gaza</option>
                    <option value="Ramallah">Ramallah</option>
                    <option value="Nablus">Nablus</option>
                    <option value="Hebron">Hebron</option>
                    <option value="Bethlehem">Bethlehem</option>
                    <option value="Jenin">Jenin</option>
                    <option value="Tulkarem">Tulkarem</option>
                    <option value="Qalqilya">Qalqilya</option>
                    <option value="Salfit">Salfit</option>
                    <option value="Nablus">Nablus</option>
                    <option value="Khan Younis">Khan Younis</option>
                    <option value="Rafah">Rafah</option>
                    <option value="Tubas">Tubas</option>
                    <option value="Jericho">Jericho</option>
                    <option value="Ariha">Ariha</option>
                  </select>


                  <input type="number"
                    placeholder="number of Worker"
                    onChange={handleInputChange}
                    required name="numberOfWorker"
                    value={form.numberOfWorker}
                  />


                  <button type="submit" className={styles.submitBtn}>
                    Post
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          {/* {isModalOpen && userRole === "user" && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <form onSubmit={handleSubmit}>
                  <h2>Create a New Post</h2>

                  <input
                    type="text"
                    name="title"
                    placeholder="Post Title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                  />

                  <textarea
                    name="content"
                    placeholder="Post Content"
                    value={form.content}
                    onChange={handleInputChange}
                    required
                  />

                  <select
                    name="careerCategory"
                    value={form.careerCategory}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                  />

                  <button type="submit" className={styles.submitBtn}>
                    Post
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )} */}

          <div className={styles.postList}>
            {posts.slice().reverse().map((post) => (
              <div className={`${styles.postCard} ${post.user._id === currentUserId ? styles.myPost : ""}`} key={post._id}>
              <div className={styles.posterInfo}>
                <img src={userImage} alt="User" className={styles.posterImage} />
                <div>
                  <p className={styles.posterName}>{post.userFirstName} {post.userLastName}</p>
                  <p className={styles.posterCareer}>{post.userRole === "admin" ? "Service Provider" : "Client"}</p>
                </div>
              </div>
            
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.postContent}>{post.content}</p>
              
              <div className={styles.postDetails}>
                {/* <p><strong>Name</strong> {post.userFirstName} {post.userLastName}</p> */}
                <p><strong>Category:</strong> {post.careerCategory}</p>
                <p><strong>Location:</strong> {post.location}</p>
                <p><strong>Number of Workers Required:</strong> {post.numberOfWorker}</p>
                <p><strong>Posted on:</strong> {new Date(post.postDate).toLocaleString()}</p>
              </div>
            
              <div className={styles.actions}>
                {(post.user._id !== currentUserId) && (
                  <button className={styles.applyBtn} onClick={()=> handleApplyForThisJop(post.user._id,currentUserId, new Date().toISOString(), userCoordinates)}>Apply for this Job</button>
                )}
                {(post.user._id === currentUserId) && (
                  <button className={styles.deleteBtn} onClick={()=>handleDeletePost(post._id)}>Delete post</button>
                )}
              </div>
            </div>
            
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;