import React, { useState } from 'react';
import style from './Verify.module.css';
import verifyLogo from './verifyLogo.png';

function Verify() {
  const [values, setValues] = useState(['', '', '', '', '', '']);

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
        <button className={style.cancelButton}>Cancel</button>
        <button className={style.verifyButton}>Verify</button>
      </div>
    </div>
  );
}

export default Verify;
