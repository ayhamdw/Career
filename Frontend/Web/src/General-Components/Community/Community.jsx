import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Community.module.css";

const Community = ({ userImage, userCareer }) => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    type: "",
    location: "",
    workersNeeded: "",
    description: "",
    city: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const email = localStorage.getItem("userEmail"); 
        const response = await axios.post("http://localhost:7777/api/user/role", { email }); 
        console.log(response.data.role);
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      role: userRole,
      ...form,
      posterImage: userImage,
      posterCareer: userCareer,
      date: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setForm({ type: "", location: "", workersNeeded: "", description: "", city: "" });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.communityContainer}>
      <header>
        <h1>Community Posts</h1>
      </header>
      <button
        className={styles.createPostBtn}
        onClick={() => setIsModalOpen(true)}
      >
        Create Post
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            
            <form onSubmit={handleSubmit}>
              {userRole === "admin" && (
                <>
                <h2>Request workers</h2>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a city</option>
                    <option value="Nablus">Nablus</option>
                    <option value="Ramallah">Ramallah</option>
                    <option value="Hebron">Hebron</option>
                    <option value="Bethlehem">Bethlehem</option>
                    <option value="Jenin">Jenin</option>
                    <option value="Jericho">Jericho</option>
                    <option value="Gaza">Gaza</option>
                    <option value="Rafah">Rafah</option>
                    <option value="Tulkarm">Tulkarm</option>
                    <option value="Qalqilya">Qalqilya</option>
                    <option value="Salfit">Salfit</option>
                    <option value="Tubas">Tubas</option>
                    <option value="Jerusalem">Jerusalem</option>
                    <option value="Khan Yunis">Khan Yunis</option>
                    <option value="Deir al-Balah">Deir al-Balah</option>
                  </select>

                  <input
                    type="number"
                    name="workersNeeded"
                    placeholder="Number of workers needed"
                    value={form.workersNeeded}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Category</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Technical Services">Technical Services</option>
                    <option value="Educational Services">Educational Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Creative Services">Creative Services</option>
                    <option value="Legal & Financial Services">Legal & Financial Services</option>
                    <option value="Other">Other</option>
                  </select>
                </>
              )}

              {userRole === "user" && (
                <>
                  <h2>Request Service Provider</h2>
                  <input
                    type="text"
                    name="location"
                    placeholder="Your location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Category</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Technical Services">Technical Services</option>
                    <option value="Educational Services">Educational Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Creative Services">Creative Services</option>
                    <option value="Legal & Financial Services">Legal & Financial Services</option>
                    <option value="Other">Other</option>
                  </select>
                </>
              )}

              <textarea
                name="description"
                placeholder="Describe your request"
                value={form.description}
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
        {posts.map((post, index) => (
          <div className={styles.postCard} key={index}>
            <div className={styles.posterInfo}>
              <img
                src={post.posterImage}
                alt="Poster"
                className={styles.posterImage}
              />
              <p className={styles.posterCareer}>{post.posterCareer}</p>
            </div>
            <p>
              <strong>Role:</strong> {post.role}
            </p>
            <p>
              <strong>Description:</strong> {post.description}
            </p>
            {post.role === "admin" && (
              <>
                <p>
                  <strong>City:</strong> {post.city}
                </p>
                <p>
                  <strong>Workers Needed:</strong> {post.workersNeeded}
                </p>
              </>
            )}
            <p>
              <strong>Posted on:</strong> {post.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
