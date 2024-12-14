import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Community.module.css";
import userImage from './poster.png';

const Community = ({ userCareer }) => {
  const token = localStorage.getItem('authToken');
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    careerCategory: "",
    location: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

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
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "San Diego",
    "Dallas",
    "Austin",
    "Seattle",
    "Miami",
  ];

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post("http://localhost:7777/api/user/role", { email });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:7777/api/community/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = {
        title: form.title,
        content: form.content,
        careerCategory: form.careerCategory,
        location: form.location,
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

      setPosts([response.data, ...posts]);
      setForm({ title: "", content: "", careerCategory: "", location: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.communityContainer}>
      <header>
        <h1>Community Posts</h1>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.postsSection}>
          <button className={styles.createPostBtn} onClick={() => setIsModalOpen(true)}>
            Create Post
          </button>

          {isModalOpen && (
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
          )}

          <div className={styles.postList}>
            {posts.map((post) => (
              <div className={styles.postCard} key={post._id}>
                <div className={styles.posterInfo}>
                  <img src={userImage} alt="User" className={styles.posterImage} />
                  <p className={styles.posterCareer}>{userCareer}</p>
                </div>

                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p><strong>Category:</strong> {post.careerCategory}</p>
                <p><strong>Location:</strong> {post.location}</p>
                <p><strong>Posted on:</strong> {new Date(post.postDate).toLocaleString()}</p>

                <div className={styles.actions}>
                  {/* Apply button logic */}
                  {post.userRole === "admin" && userRole === "admin" && (
                    <button className={styles.applyBtn}>
                      Apply for this Job
                    </button>
                  )}
                  {post.userRole !== "admin" && userRole === "admin" && (
                    <button className={styles.applyBtn}>
                      Apply for this Job
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Community;
