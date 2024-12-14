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

  const [commentText, setCommentText] = useState(""); // State for the comment input

  // Define categories and cities
  const categories = [
    "Home Improvement",
    "Electronics",
    "Transportation",
    "Health & Fitness",
    "Education",
    "Gardening",
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
      liked: false, // Adding a liked state for heart button
      comments: [] // Array to store comments
    };

    setPosts([newPost, ...posts]);
    setForm({ type: "", location: "", workersNeeded: "", description: "", city: "" });
    setIsModalOpen(false);
  };

  const toggleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].liked = !updatedPosts[index].liked;
    setPosts(updatedPosts);
  };

  const handleAddComment = (index) => {
    if (commentText.trim() !== "") {
      const updatedPosts = [...posts];
      updatedPosts[index].comments.push(commentText);
      setPosts(updatedPosts);
      setCommentText(""); // Clear the input field after adding the comment
    }
  };

  return (
    <div className={styles.communityContainer}>
      <header>
        <h1>Community Posts</h1>
      </header>

      <div className={styles.mainContent}>
        {/* Left Section with Posts */}
        <div className={styles.postsSection}>
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
                      <select name="city" value={form.city} onChange={handleInputChange} required>
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="workersNeeded"
                        placeholder="Number of workers needed"
                        value={form.workersNeeded}
                        onChange={handleInputChange}
                        required
                      />
                      <select name="type" value={form.type} onChange={handleInputChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
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
                      <select name="type" value={form.type} onChange={handleInputChange} required>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
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
                  <img src={post.posterImage} alt="Poster" className={styles.posterImage} />
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
                <div className={styles.actions}>
                  {/* Comment Section */}
                  <textarea
                    className={styles.commentTextarea}
                    placeholder="Add your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className={styles.addCommentBtn}
                    onClick={() => handleAddComment(index)}
                  >
                    Add Comment
                  </button>

                  {/* Like Button */}
                  <button
                    className={`${styles.likeBtn} ${post.liked ? styles.liked : ""}`}
                    onClick={() => toggleLike(index)}
                  >
                    ❤️ Like
                  </button>
                </div>

                {/* Display Comments */}
                {post.comments.length > 0 && (
                  <div className={styles.comments}>
                    <h4>Comments:</h4>
                    <ul>
                      {post.comments.map((comment, i) => (
                        <li key={i}>{comment}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
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
