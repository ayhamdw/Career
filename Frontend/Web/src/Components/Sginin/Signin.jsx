import React, { useState } from 'react';
import style from './Signin.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import GoogleLogo from '../../assets/Google.png';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const validateEmail = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API}/auth/validate-email`, { email });
      if (response.status === 200 && response.data.exists) {
        setEmailValidated(true);
        setError('');
      } else {
        setError('Email not found. Please sign up first.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/auth/login`, { email, password });
      if (response.status === 200) {
        const { token, verificationStatus, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('id', user._id);
        localStorage.setItem('firstName', user.profile.firstName);
        login(token);
        localStorage.setItem('userEmail', email);
        navigate(verificationStatus ? '/' : '/verify');
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formWrapper}>
        <h2>Welcome back</h2>
        <p className={style.subText}>Sign in to your account</p>

        {/* Email Input */}
        <div className={style.inputGroup}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {emailValidated && (
          /* Password Input */
          <div className={style.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        {error && <p className={style.error}>{error}</p>}

        {/* Button to Validate Email or Sign In */}
        <button
          className={style.primaryButton}
          onClick={emailValidated ? handleSignin : validateEmail}
          disabled={loading}
        >
          {loading ? 'Loading...' : emailValidated ? 'Sign In' : 'Continue'}
        </button>

        <p className={style.orDivider}>OR</p>

        <div className={style.authButtons}>
          <button className={style.googleButton}>
            <img src={GoogleLogo} alt="Google Logo" /> Continue with Google
          </button>
        </div>

        <div className={style.footerText}>
          <p>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
