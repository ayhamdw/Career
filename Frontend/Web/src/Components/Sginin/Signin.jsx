import React, {useState} from 'react'
import style from './Sginin.module.css'
import {Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import axios from 'axios';
import { useAuth } from '../../AuthContext';

function Signin() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:7777/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log(response.data.verificationStatus);
      if (response.status === 200) {
        const { token, verificationStatus } = response.data;
        login(token); 
        localStorage.setItem('userEmail', email);
        navigate(verificationStatus ? '/' : '/verify');
      }
      window.location.reload();

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
    finally{
      setLoading(false);
    }
};

  


  return (
    <div className={style.container}>
      <div className={style.sgininForm}>
        <div className={style.inpustPart}>
          <div className={style.headerInput}>
            <p>Sign In</p>
          </div>
          <div className={style.inputFields}>
            <div className={style.field}>
              <label htmlFor="email">Email</label>
              <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={style.field}>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <button className={style.sgininButton} onClick={handleSignin}>Sgin in</button>
          <div className={style.lastLine}>
            <div className={style.remember}>
              <input type="checkbox" name='remember'/>
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link>Forgot Password</Link>
          </div>
        </div>

        <div className={style.designPart}>
          <h2>Welcome To Career</h2>
          <img src={Logo} alt="Career Logo" />
          <p>Don't have an account?</p>
          <Link to='/signup'>Sign Up</Link>

        </div>

      </div>
    </div>
  )
}

export default Signin