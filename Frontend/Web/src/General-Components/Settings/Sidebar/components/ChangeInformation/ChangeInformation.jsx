import React, { useState } from 'react';
import './ChangeInformation.css';

const ChangeInformation = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="change-information-container">
      <h1>Change Your Information</h1>
      <form onSubmit={handleSubmit}>

        {/* Personal Information Card */}
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
                placeholder="Enter your first name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
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
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
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
                placeholder="Enter your career"
              />
            </div>
            <div className="form-group">
              <label>Career Category</label>
              <input
                type="text"
                name="careerCategory"
                value={formData.careerCategory}
                onChange={handleChange}
                placeholder="Enter your career category"
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
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a new password"
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
                placeholder="Write a short bio"
              />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Describe your experience"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ChangeInformation;
