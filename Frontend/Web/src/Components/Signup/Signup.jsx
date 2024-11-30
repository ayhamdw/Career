import { useState, useEffect } from 'react';
import style from './Signup.module.css';
import axios from 'axios';

function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    city: '',
    dateOfBirth: '',
    career: '',
    careerCategory: '',
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    experience: '',
    profileImage: null,
    coordinates: [null, null],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUser((prev) => ({
            ...prev,
            coordinates: [latitude.toString(), longitude.toString()],
          }));
        },
        (error) => {
          console.log('Error retrieving geolocation: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'coordinates[0]' || name === 'coordinates[1]') {
      setUser((prev) => ({
        ...prev,
        coordinates: name === 'coordinates[0]' ? [value, prev.coordinates[1]] : [prev.coordinates[0], value],
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password.toLowerCase().includes('password')) {
      alert('Password must not contain the word "password".');
      return;
    }

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('gender', user.gender);
    formData.append('city', user.city);
    formData.append('dateOfBirth', user.dateOfBirth);
    formData.append('careerCategory', user.careerCategory);

    // Send profile data as a nested object
    formData.append('profile[firstName]', user.firstName);
    formData.append('profile[lastName]', user.lastName);
    formData.append('profile[phone]', user.phone);
    formData.append('profile[bio]', user.bio);
    formData.append('profile[experience]', user.experience);
    formData.append('profile[profileImage]', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...");
    
    formData.append('profile[location][type]', "Point");
    // Send profileImage if it exists
    // if (user.profileImage) {
    //   formData.append('profile[profileImage]', user.profileImage);
    // }

    
    formData.append('profile[location][coordinates][0]', user.coordinates[0]);
    formData.append('profile[location][coordinates][1]', user.coordinates[1]);

    
    formData.append('tokens[0][token]', 'validTokenHere');
    formData.append('friendRequests[0]', '5f9a8b8f8c8d8e8b8f8a8b8c'); 
    formData.append('friends[0]', '5f9a8b8f8c8d8e8b8f8a8b8c'); 
    formData.append('sendRequests[0]', '5f9a8b8f8c8d8e8b8f8a8b8c'); 
  
    console.log('Form Data:', formData); 

    try {
      const { data } = await axios.post('http://localhost:7777/api/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Successfully registered!');
      setUser({
        username: '', email: '', password: '', role: '', gender: '', city: '',
        dateOfBirth: '', careerCategory: '', firstName: '', lastName: '',
        phone: '', bio: '', experience: '', profileImage: null, coordinates: ['', ''],
      });
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
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
            <div className={style.field}>
              <label>Username</label>
              <input type="text" name="username" value={user.username} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className={style.field}>
              <label>Email</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} required />
            </div>

            {/* Password */}
            <div className={style.field}>
              <label>Password</label>
              <input type="password" name="password" value={user.password} onChange={handleChange} required />
            </div>

            {/* Role */}
            <div className={style.field}>
              <label>Role</label>
              <select name="role" value={user.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="user">Client</option>
                <option value="admin">Service Provider</option>
              </select>
            </div>

            {/* Gender */}
            <div className={style.field}>
              <label>Gender</label>
              <select name="gender" value={user.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* City */}
            <div className={style.field}>
              <label>City</label>
              <input type="text" name="city" value={user.city} onChange={handleChange} required />
            </div>

            {/* Date of Birth */}
            <div className={style.field}>
              <label>Date of Birth</label>
              <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} required />
            </div>

            {/* Career Category */}
            <div className={style.field}>
              <label>Career Category</label>
              <select name="careerCategory" value={user.careerCategory} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Home Services">Home Services</option>
                <option value="Technical Services">Technical Services</option>
                <option value="Educational Services">Educational Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Creative Services">Creative Services</option>
                <option value="Legal & Financial Services">Legal & Financial Services</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* First Name */}
            <div className={style.field}>
              <label>First Name</label>
              <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
            </div>

            {/* Last Name */}
            <div className={style.field}>
              <label>Last Name</label>
              <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
            </div>

            {/* Phone */}
            <div className={style.field}>
              <label>Phone</label>
              <input type="text" name="phone" value={user.phone} onChange={handleChange} required />
            </div>

            {/* Bio */}
            <div className={style.field}>
              <label>Bio</label>
              <textarea name="bio" value={user.bio} onChange={handleChange} placeholder="Tell us a little about yourself" rows="4" required />
            </div>

            {/* Experience */}
            <div className={style.field}>
              <label>Your Experience (Number of Years)</label>
              <input type="text" name="experience" value={user.experience} onChange={handleChange} required />
            </div>

            {/* Profile Image */}
            <div className={style.imageField}>
              <label htmlFor="profileImage">Profile Image</label>
              <input type="file" name="profileImage" id="profileImage" accept="image/*" onChange={handleFileChange} />
            </div>

            <button type="submit" className={style.signUpButton}>Create an Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
