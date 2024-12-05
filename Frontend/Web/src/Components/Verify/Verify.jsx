import React, { useState } from 'react';
import style from './Verify.module.css';
import verifyLogo from './verifyLogo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for HTTP requests

function Verify() {
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');  // Error handling
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');  // Example storage

  const handleChange = (index, newValue) => {
    const updatedValues = [...values];
    
    if (newValue === '' && values[index] !== '') {
      updatedValues[index] = '';
      setValues(updatedValues);
    } else if (/^\d?$/.test(newValue)) {
      updatedValues[index] = newValue;
      setValues(updatedValues);

      if (newValue && index < values.length - 1) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && values[index] === '' && index > 0) {
      document.getElementById(`digit-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const code = values.join('');  
    
    try {
      const response = await axios.post('http://localhost:7777/api/auth/verify-code', {
        email: userEmail,
        code: code,
      });

      if (response.data.success) {
        navigate('/');  
      } else {
        setErrorMessage('Invalid code, please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={style.containerVerify}>
      <div className={style.verifyCard}>
        <img src={verifyLogo} alt="verifyLogo" className={style.img} />
        <p className={style.check}>Please Check Your Email</p>
        <p className={style.sent}>We sent a code to your email</p>
        <div className={style.digits}>
          {values.map((digit, index) => (
            <input
              key={index}
              className={style.inputDigit}
              type="text"
              id={`digit-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}  
              maxLength={1}
            />
          ))}
        </div>
        {errorMessage && <p className={style.error}>{errorMessage}</p>}  {/* Error message */}
        <button className={style.cancelButton} onClick={() => navigate('/signin')}>Cancel</button>
        <button className={style.verifyButton} onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}

export default Verify;
