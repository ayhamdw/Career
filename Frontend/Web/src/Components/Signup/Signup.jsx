import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Signup.module.css';
import Logo from './logo.png';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form Data:', formData);
    // Add logic to handle form submission (e.g., API call with image upload)
  };

  return (
    <div className={style.container}>
      <div className={style.signUpForm}>
        <div className={style.inputPart}>
          <div className={style.headerInput}>
            <p>Sign Up</p>
          </div>
          <form onSubmit={handleSubmit} className={style.inputFields}>
            <div className={style.field}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.field}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.field}>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={style.signUpButton}>Sign Up</button>
          </form>
        </div>

        <div className={style.designPart}>
          <h2>Welcome To Career</h2>
          <img src={Logo} alt="Career Logo" />
          <p>Already have an account?</p>
          <Link to='/signin'>Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
