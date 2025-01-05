import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Community.module.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import s3 from 'react-aws-s3-typescript'





const Community = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    careerCategory: "",
    location: "",
    numberOfWorker: 0,
    photos: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLasttName] = useState("");
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewImages, setPreviewImages] = useState([]);





  useEffect(() => {
    console.log("selectedCategories: ", selectedCategories);
    console.log("selectedCities: ", selectedCities);
  }, [selectedCategories, selectedCities]);



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
    "Tubas",
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCity = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(post.careerCategory);
    const matchesCity =
      selectedCities.length === 0 || selectedCities.includes(post.location);

    const matchesSearchQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCity && matchesSearchQuery;
  });





  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post(`${import.meta.env.VITE_API}/user/id`, { email });
        setCurrentUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };


    const fetchUserRole = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post(`${import.meta.env.VITE_API}/user/role`, { email });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/community/posts`);
        setPosts(response.data);
        response.data.forEach(post => {
          console.log("Post data: ", post.user);
        });

      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchFirstName = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post(`${import.meta.env.VITE_API}/user/firstName`, { email });
        setUserFirstName(response.data.firstName);
        console.log(response.data.firstName)

      } catch (error) {
        console.error("Error Fetching user FirstName: ", error);
      }
    }
    const fetchLastName = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post(`${import.meta.env.VITE_API}/user/lastName`, { email });
        setUserLasttName(response.data.lastName);
        console.log(response.data.lastName)

      } catch (error) {
        console.error("Error Fetching user LastName: ", error);
      }
    }

    const fetchCoordinates = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.post(`${import.meta.env.VITE_API}/user/coordinates`, { email });
        const { longitude, latitude } = response.data;
        setUserCoordinates([longitude, latitude]);
        console.log(userCoordinates);
      }
      catch (error) {
        console.error("Coordinates Error: ", error);
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
    switch (name) {
      case 'title':
        setForm((prevForm) => ({ ...prevForm, title: value }));
        break;
      case 'content':
        setForm((prevForm) => ({ ...prevForm, content: value }));
        break;
      case 'numberOfWorker':
        setForm((prevForm) => ({ ...prevForm, numberOfWorker: value }));
        break;
      case 'careerCategory':
        setForm((prevForm) => ({ ...prevForm, careerCategory: value }));
        break;
      case 'location':
        setForm((prevForm) => ({ ...prevForm, location: value }));
        break;
      default:
        break;
    }
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prevState) => ({
      ...prevState,
      photos: [...files],
    }));
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreview) => [...prevPreview, ...previewUrls]);
  };

  const handleRemoveImage = (index) => {
    setForm((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prevPreview) =>
      prevPreview.filter((_, i) => i !== index)
    );
  };


  const handleUpload = async (image) => {
    const Reacts3Client = new s3({
      accessKeyId: "AKIA5MSUBQC3OE6ZOF4Z",
      secretAccessKey: "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",
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: "https://career-images-s3.s3.eu-north-1.amazonaws.com",
    });

    try {
      const data = await Reacts3Client.uploadFile(image);
      return data.location;
    } catch (err) {
      console.error("Error uploading image: ", err);
      throw err;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in first.");
      setTimeout(() => window.location.href = "/login", 2000);
      return;
    }


    try {

      const imageUrls = await Promise.all(
        form.photos.map((image) => handleUpload(image))
      );

      const post = {
        title: form.title,
        content: form.content,
        careerCategory: form.careerCategory,
        location: form.location,
        numberOfWorker: form.numberOfWorker,
        userRole: userRole,
        photos: imageUrls
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API}/community/post`,
        post,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      setPosts([response.data, ...posts]);
      setForm({ title: "", content: "", careerCategory: "", location: "", numberOfWorker: "", images: [] });
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error.response ? error.response.data : error.message);
      toast.error("Error creating post.");
    }
  };



  const handleDeletePost = async (postId) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
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

  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleApplyForThisJop = async (proficientId, userId, requestDateTime, [longitude, latitude]) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsModalVisible(true);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API}/proficient/booking-proficient`,
        {
          proficientId,
          userId,
          requestDateTime,
          location: {
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

  const loginModal = () => {
    setIsModalVisible(false);
    navigate('/signin');
  };

  const closeModal = () => {
    setIsModalVisible(false);
  }

  return (
    <div className={styles.communityContainer}>
      <div className={styles.mainContent}>
        <div className={styles.rightSection}>
          <h3>Featured Categories</h3>
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                className={`${styles.listItem} ${selectedCategories.includes(category) ? styles.active : ""
                  }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <h3>Popular Cities</h3>
          <ul>
            {cities.map((city, index) => (
              <li
                key={index}
                className={`${styles.listItem} ${selectedCities.includes(city) ? styles.active : ""
                  }`}
                onClick={() => toggleCity(city)}
              >
                {city}
              </li>
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
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.inputSearch}
          />
          {isModalOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="title">Post Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter post title"
                      value={form.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="content">Post Content</label>
                    <textarea
                      id="content"
                      name="content"
                      placeholder="Enter post content"
                      value={form.content}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="careerCategory">Career Category</label>
                    <select
                      id="careerCategory"
                      name="careerCategory"
                      value={form.careerCategory}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <select
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a city</option>
                      {[
                        "Jerusalem",
                        "Gaza",
                        "Ramallah",
                        "Nablus",
                        "Hebron",
                        "Bethlehem",
                        "Jenin",
                        "Tulkarem",
                        "Qalqilya",
                        "Salfit",
                        "Khan Younis",
                        "Rafah",
                        "Tubas",
                        "Jericho",
                      ].map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="numberOfWorker">Number of Workers</label>
                    <input
                      type="number"
                      id="numberOfWorker"
                      name="numberOfWorker"
                      placeholder="Enter number of workers"
                      value={form.numberOfWorker}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="images">Upload Images</label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    {previewImages.length > 0 && (
                      <div className={styles.imagePreview}>
                        {previewImages.map((image, index) => (
                          <div key={index} className={styles.previewContainer}>
                            <img
                              src={image}
                              alt={`preview-${index}`}
                              className={styles.previewImage}
                            />
                            <button
                              type="button"
                              className={styles.removeImageButton}
                              onClick={() => handleRemoveImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.buttonGroup}>
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
                  </div>
                </form>
              </div>



            </div>
          )}



          <div className={styles.postList}>
            {filteredPosts.slice().reverse().map((post) => {
              const isCurrentUser = post.user._id === currentUserId;

              return (
                <div
                  className={`${styles.postCard} ${isCurrentUser ? styles.myPost : ""}`}
                  key={post._id}
                >
                  {/* Poster Info Section */}
                  <div className={styles.posterInfo}>
                    <img
                      src={post.user.profile.profileImage}
                      alt={`${post.user.profile.firstName} ${post.user.profile.lastName}`}
                      className={styles.posterImage}
                    />
                    <div className={styles.posterDetails}>
                      <p className={styles.posterName}>
                        {post.user.profile.firstName} {post.user.profile.lastName}
                      </p>
                      {/* <p className={styles.posterCity}>{post.user.city}</p> */}
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className={styles.postTitle}>
                    <span className={styles.jobDesc}>Title:</span> {post.title}
                  </h3>

                  {/* Post Content */}
                  <p className={styles.postContent}>
                    <span className={styles.jobDesc}>Job Description:</span> {post.content}
                  </p>

                  {/* Post Details Section */}
                  <div className={styles.postDetails}>
                    <p><strong>Category:</strong> {post.careerCategory}</p>
                    <p><strong>Location:</strong> {post.location}</p>
                    <p><strong>Number of Workers Required:</strong> {post.numberOfWorker}</p>
                    <p><strong>Posted on:</strong> {new Date(post.postDate).toLocaleString()}</p>
                  </div>

                  {/* Image Gallery Section */}
                  {post.images && post.images.length > 0 && (
                    <div className={styles.imageGallery}>
                      {post.images.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Post image ${index + 1}`}
                          className={styles.postImage}
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions Section */}
                  <div className={styles.actions}>
                    {/* Apply Button (for non-current user) */}
                    {!isCurrentUser && (
                      <button
                        className={styles.applyBtn}
                        onClick={() => handleApplyForThisJop(
                          post.user._id,
                          currentUserId,
                          new Date().toISOString(),
                          userCoordinates
                        )}
                      >
                        Apply for this Job
                      </button>
                    )}

                    {/* Modal for Unauthenticated User */}
                    {isModalVisible && (
                      <Modal
                        message="You didn't log in. Please log in and try again."
                        onClose={closeModal}
                        onLogin={loginModal}
                      />
                    )}

                    {/* Delete Button (for current user) */}
                    {isCurrentUser && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                </div>


              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Community;



const Modal = ({ message, onClose, onLogin }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContentModal}>
          <h2 className={styles.modalTitle}>Login Required</h2>
          <p className={styles.modalMessage}>{message}</p>
          <div className={styles.modalButtons}>
            <button onClick={onClose} className={styles.modalCloseBtn}>Close</button>
            <button onClick={onLogin} className={styles.modalLoginBtn}>Go to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};