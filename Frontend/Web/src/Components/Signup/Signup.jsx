import { useState, useEffect } from "react";
import style from "./Signup.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";



function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    gender: "",
    city: "",
    dateOfBirth: "",
    career: "",
    careerCategory: "",
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    verificationCode: "",
    experience: "",
    profileImage: null,
    coordinates: [null, null],
    sendProficientRequests: ["674f0eee59fa49413982b509"],
    receiveProficientRequest: ["674f0eee59fa49413982b509"],
    resetCode: 0,
    resetCodeExpires: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude + "," + longitude);
          setUser((prev) => ({
            ...prev,
            coordinates: [latitude.toString(), longitude.toString()],
          }));
        },
        (error) => {
          console.log("Error retrieving geolocation: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const [emails, setEmails] = useState([]);
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usernames, setUsernames] = useState([]);
  const [usernameExist, setUsernameExist] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/api/auth/emails"
        );
        setEmails(response.data);
      } catch (error) {
        console.log("Error fetching emails: ", error);
      }
    };
    fetchEmails();
  }, []);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const responseUsers = await axios.get(
          "http://localhost:7777/api/auth/usernames"
        );
        setUsernames(responseUsers.data);
      } catch (error) {
        console.log("Error fetching Usernames: ", error);
      }
    };
    fetchUsernames();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "coordinates[0]" || name === "coordinates[1]") {
      setUser((prev) => ({
        ...prev,
        coordinates:
          name === "coordinates[0]"
            ? [value, prev.coordinates[1]]
            : [prev.coordinates[0], value],
      }));
    }
    if (name === "email") {
      setUser((prev) => ({
        ...prev,
        email: value,
      }));
      const emailExists = emails.some((email) => email.email === value);
      setEmailExists(emailExists);
      if (emailExists) {
        setErrorMessage("This email is already registered.");
      } else {
        setErrorMessage("");
      }
    }

    if (name === "username") {
      setUser((prev) => ({ ...prev, username: value }));
      const usernameExist = usernames.some(
        (username) => username.username === value
      );
      setUsernameExist(usernameExist);
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      if (file.type.startsWith('image/')) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset'); // Cloudinary upload preset
  
        try {
          // Upload the file to Cloudinary (replace with your API for other services)
          const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
            method: 'POST',
            body: formData,
          });
  
          const data = await response.json();
          if (data.secure_url) {
            setUser((prev) => ({
              ...prev,
              profileImage: data.secure_url, // Store the image URL in state
            }));
            toast.success('Image uploaded successfully!');
          }
        } catch (error) {
          toast.error('Error uploading image');
        }
      } else {
        toast.error('Please upload a valid image file');
      }
    }
  };
  


  


  const notifySuccess = () => {
    toast.success("Successfully registered!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const formData = new FormData();

  const sendVerificationCode = async (email) => {
    const code = Math.floor(100000 + Math.random() * 900000);
    user.verificationCode = code;
    setUser((prev) => ({
      ...prev,
      verificationCode: code,
    }));

    try {
      await axios.post("http://localhost:7777/api/send/send-verification", {
        email,
        code,
      });
      toast.info("Verification code sent to your email!", {
        position: "top-right",
      });
      console.log(code);
    } catch (error) {
      console.error(
        "Error sending verification code:",
        error.response?.data || error.message
      );
      toast.error("Failed to send verification code.");
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password.toLowerCase().includes("password")) {
      alert('Password must not contain the word "password".');
      return;
    }

    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);
    formData.append("gender", user.gender);
    formData.append("city", user.city);
    formData.append("dateOfBirth", user.dateOfBirth);
    formData.append("careerCategory", user.careerCategory);

    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', 'user');
    formData.append('gender', user.gender);
    formData.append('city', user.city);
    formData.append('dateOfBirth', user.dateOfBirth);
    formData.append('careerCategory', user.careerCategory);
    
    // Send profile data as a nested object
    formData.append('profile[firstName]', user.firstName);
    formData.append('profile[lastName]', user.lastName);
    formData.append('profile[phone]', user.phone);
    formData.append('profile[bio]', '');
    formData.append('profile[experience]', user.experience);
    formData.append('profile[profileImage]', 'https://placehold.co/400');
    
    formData.append('profile[location][type]', "Point");
    // Send profileImage if it exists
    // if (user.profileImage) {
    //   formData.append('profile[profileImage]', user.profileImage);
    // }

    formData.append("profile[location][coordinates][0]", user.coordinates[0]);
    formData.append("profile[location][coordinates][1]", user.coordinates[1]);


    formData.append('profile[location][coordinates][0]', user.coordinates[0]);
    formData.append('profile[location][coordinates][1]', user.coordinates[1]);


    formData.append('friendRequests[0]', '5f9a8b8f8c8d8e8b8f8a8b8c');
    formData.append('friends[0]', '5f9a8b8f8c8d8e8b8f8a8b8c');
    formData.append('sendRequests[0]', '5f9a8b8f8c8d8e8b8f8a8b8c');
    formData.append('tokens[0][token]', "actual api");
    formData.append('sendProficientRequests[]', user.sendProficientRequests[0]);
    formData.append('receiveProficientRequest[]', user.receiveProficientRequest[0]);


    if (!user.verificationCode) {
      sendVerificationCode(user.email);
    }

    formData.append("verificationCode", user.verificationCode);
    console.log("verificationCode: " + user.verificationCode);

    try {
      const response = await axios.post(
        "http://localhost:7777/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      formData.append("tokens[0][token]", token);

      notifySuccess();
      navigate("/signin");
      setUser({
        username: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        city: "",
        dateOfBirth: "",
        careerCategory: "",
        firstName: "",
        lastName: "",
        phone: "",
        bio: "",
        experience: "",
        profileImage: null,
        coordinates: ["", ""],
      });
    } catch (error) {
      console.error(
        "Error during registration: ",
        error.response?.data || error.message
      );
      toast.error("Registration failed.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.signUpForm}>
        <div className={style.inputPart}>
          <div className={style.headerInput}>
            <p>Sign Up</p>
          </div>
          <form onSubmit={handleSubmit} className={style.inputFields}>
            {/* Username */}
            {/* <div className={style.field}>
              <label>Username</label>


            {/* Email */}
            <div className={style.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                style={{ border: emailExists ? "1px solid red" : "" }}
              />
              {emailExists && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>

            {/* Password */}
            <div className={style.field}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            {/* <div className={style.field}>
              <label>Role</label>

            </div> */}

            {/* Gender */}
            <div className={style.field}>
              <label>Gender</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* City */}
            <div className={style.field}>
              <label>City</label>
              <select
                name="city"
                value={user.city}
                onChange={handleChange}
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
            </div>

            {/* Date of Birth */}
            <div className={style.field}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            {/* Career Category */}
            <div className={style.field}>
              <label>Career Category</label>
              <select
                name="careerCategory"
                value={user.careerCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Home Services">Home Services</option>
                <option value="Technical Services">Technical Services</option>
                <option value="Educational Services">
                  Educational Services
                </option>
                <option value="Healthcare">Healthcare</option>
                <option value="Creative Services">Creative Services</option>
                <option value="Legal & Financial Services">
                  Legal & Financial Services
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* First Name */}
            <div className={style.field}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                required
                style={{
                  border:
                    user.firstName && user.firstName.length < 3
                      ? "1px solid red"
                      : "",
                }}
              />
              {user.firstName && user.firstName.length < 3 && (
                <p style={{ color: "red" }}>
                  First Name must be at least 3 characters long.
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className={style.field}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
                style={{
                  border:
                    user.lastName && user.lastName.length < 3
                      ? "1px solid red"
                      : "",
                }}
              />
              {user.lastName && user.lastName.length < 3 && (
                <p style={{ color: "red" }}>
                  Last Name must be at least 3 characters long.
                </p>
              )}
            </div>

            {/* Phone */}
            {/* <div className={style.field}>
              <label>Phone</label>

              <label>Your Experience (Number of Years)</label>


            {/* Profile Image */}
            <div className={style.imageField}>
              <label htmlFor="profileImage">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                onChange={handleFileChange}
              />

              <input type="text" name="experience" value={user.experience} onChange={handleChange} required />
            </div> */}

            {/* Profile Image */}
            <div className={style.imageField}>
              <label htmlFor="profileImage">Profile Image (Optional)</label>
              <input type="file" name="profileImage" id="profileImage" accept="image/*" onChange={handleFileChange} />
            </div>

            <button type="submit" className={style.signUpButton}>
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
