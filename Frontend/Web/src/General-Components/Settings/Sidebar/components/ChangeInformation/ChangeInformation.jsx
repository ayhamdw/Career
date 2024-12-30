import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangeInformation.css';

const ChangeInformation = ({ user }) => {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    gender: user.gender || '',
    city: user.city || '',
    dateOfBirth: user.dateOfBirth || '',
    career: user.career || '',
    careerCategory: user.careerCategory || '',
    profile: {
      firstName: user.profile.firstName || '',
      lastName: user.profile.lastName || '',
      phone: user.profile.phone || '',
      bio: user.profile.bio || '',
      experience: user.profile.experience || '',
    }
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API}/user/updateInfo/${user._id}`,
        formData
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user information");
    }
  };

  const handleClose = () => {
    setSuccess(!success);
  };

  return (
    <div className="change-information-container">
      <h1 className="page-title">Change Your Information</h1>
      <form onSubmit={handleUpdate} className="information-form">
        <div className="card">
          <div className="card-header">
            <h2>Personal Information</h2>
          </div>
          <div className="card-body grid-container">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={user.profile.firstName}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={user.profile.lastName}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="card">
          <div className="card-header">
            <h2>Contact Information</h2>
          </div>
          <div className="card-body grid-container">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={user.email}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={user.profile.phone}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder={user.city}
              />
            </div>
          </div>
        </div>

        {/* Career Information Card */}
        <div className="card">
          <div className="card-header">
            <h2>Career Information</h2>
          </div>
          <div className="card-body grid-container">
            <div className="form-group">
              <label>Career</label>
              <input
                type="text"
                name="career"
                value={formData.career}
                onChange={handleChange}
                placeholder={user.career}
              />
            </div>
            <div className="form-group">
              <label>Career Category</label>
              <input
                type="text"
                name="careerCategory"
                value={formData.careerCategory}
                onChange={handleChange}
                placeholder={user.careerCategory}
              />
            </div>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="card">
          <div className="card-header">
            <h2>Account Information</h2>
          </div>
          <div className="card-body grid-container">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={user.username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Biography & Experience Card */}
        <div className="card">
          <div className="card-header">
            <h2>Biography & Experience</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder={user.profile.bio}
              />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder={user.profile.experience}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>

      {success && (
        <div className="overlay">
          <div className="success-message-container">
            <div className="success-message">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="message-text">
                <p>Your data has been updated successfully!</p>
              </div>
              <button className="close-button" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeInformation;
