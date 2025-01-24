import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Community.module.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import s3 from 'react-aws-s3-typescript'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";





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
  const [savedPosts, setSavedPosts] = useState([]);
  const myId = localStorage.getItem("id")


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getSavedPostIds = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/community/getSavedPostsIds/${myId}`);

        setSavedPosts(response.data.savedPosts)
        console.log("Saved Posts: ", response.data.savedPosts)
        console.log("Saved Posts useState: ", savedPosts)
      }
      catch (error) {
        console.log("Error Get Saved Post ID's: ", error)
      }
    }
    getSavedPostIds();
  }, [])



  const toggleFavorite = async (_postId, _userId) => {
    const isAlreadySaved = savedPosts.includes(_postId);

    const updatedSavedPosts = isAlreadySaved
      ? savedPosts.filter(id => id !== _postId)
      : [...savedPosts, _postId];
    setSavedPosts(updatedSavedPosts);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/community/savePost`, {
        postId: _postId,
        userId: _userId
      });
      console.log("response: ", response)
    }
    catch (error) {
      console.log("Error Save Post: ", error)
    }
  };


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
      accessKeyId: import.meta.env.VITE_AWS_ID,
      secretAccessKey: import.meta.env.VITE_AWS_KEY,
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: import.meta.env.VITE_S3_URL,
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

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userData, setUserData] = useState(null);



  const handleApplyForThisJop = async (proficientId, userId, requestDateTime, [longitude, latitude], isCertified) => {
    try {
      const token = localStorage.getItem("token");

      if (!isCertified) {
        setUserData({ proficientId, userId, requestDateTime, location: { longitude, latitude }, isCertified });
        setIsPopupVisible(true);
        return;
      }

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
      console.log("Error applying for the job: ", error);
    }
  };

  const handleConfirmApplication = async () => {
    const { proficientId, userId, requestDateTime, location } = userData;
    await handleApplyForThisJop(proficientId, userId, requestDateTime, [location.longitude, location.latitude], true);
    toast.success("Submited Successfully ");
    setIsPopupVisible(false);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); 
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
              const isFavorite = savedPosts.includes(post._id);
              const isCertified = post.user.certificate.isCertified;
              return (
                <div
                  className={`${styles.postCard} ${isCurrentUser ? styles.myPost : ""} ${post.saved ? styles.savedPost : ""}`}
                  key={post._id}
                >
                  {/* Poster Info Section */}
                  <div className={styles.posterInfo}>

                    <div className={styles.posterDetails}>
                      <img
                        src={post.user.profile.profileImage}
                        alt={`${post.user.profile.firstName} ${post.user.profile.lastName}`}
                        className={styles.posterImage}
                      />
                      <p className={styles.posterName}>
                        {post.user.profile.firstName} {post.user.profile.lastName}
                      </p>
                    </div>

                    {!isCurrentUser && (
                      <div className={isFavorite ? styles.favoriteIconTrue : styles.favoriteIconFalse} onClick={() => toggleFavorite(post._id, currentUserId)}>
                        {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                      </div>
                    )}
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
                          userCoordinates,
                          isCertified,
                        )}
                      >
                        Apply for this Job
                      </button>
                    )}

                    <div>
                      <CustomPopup
                        show={isPopupVisible}
                        onClose={handleClosePopup}
                        onConfirm={handleConfirmApplication}
                      />
                      {/* Add your other components or UI here */}
                    </div>

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


const CustomPopup = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white rounded-lg p-8 w-96 max-w-lg shadow-2xl relative">
        {/* <button
          className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-gray-800 transition duration-300"
          onClick={onClose}
        >
          &times;
        </button> */}
        <p className="text-xl text-gray-800 mb-6 text-center font-medium">
          This user is not officially verified. Are you sure you want to proceed?
        </p>
        <div className="flex justify-around gap-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300 shadow-md hover:shadow-lg"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none transition duration-300 shadow-md hover:shadow-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
