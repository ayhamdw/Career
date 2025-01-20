import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import GoogleLogo from '../../assets/Google.png';
import Logo from '../../assets/logo.png'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import style from './Signin.module.css';


function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const token = localStorage.getItem("token");

  const handleGoogleSignIn = async (response) => {
    if (response.credential) {
      const userData = JSON.parse(atob(response.credential.split('.')[1]));
      const { email } = userData;
  
      try {
        const res = await axios.post(`${import.meta.env.VITE_API}/auth/signin-google`, { email });
  
        console.log('Login successful', res.data);
  
        if (res.status === 200) {
          const { token, verificationStatus, user } = res.data;
          localStorage.setItem('token', token);
          localStorage.setItem('id', user._id);
          localStorage.setItem('firstName', user.profile.firstName);
          localStorage.setItem('userEmail', email);
          login(token);
  
          try {
            const roleResponse = await axios.post(`${import.meta.env.VITE_API}/user/role`, { email });
            if (roleResponse.data.role === 'user') {
              navigate(verificationStatus ? '/' : '/verify');
            } else {
              navigate('/admin');
            }
          } catch (err) {
            setError('Failed to retrieve user role');
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
  };
  

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

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/auth/login`, { email, password });
      if (response.status === 200) {
        const { token, verificationStatus, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('id', user._id);
        localStorage.setItem('firstName', user.profile.firstName);
        login(token);
        localStorage.setItem('userEmail', email);

        try {
          const roleResponse = await axios.post(`${import.meta.env.VITE_API}/user/role`, { email });
          if (roleResponse.data.role === 'user') {
            navigate(verificationStatus ? '/' : '/verify');
          } else {
            navigate('/admin');
          }
        } catch (err) {
          setError('Failed to retrieve user role');
        }
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
        <img src={Logo} className={style.mainLogo} />

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


        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => console.log("Google login failed")}
          />
        </GoogleOAuthProvider>


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
