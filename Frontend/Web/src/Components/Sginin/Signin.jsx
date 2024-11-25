import React from 'react'
import style from './Sginin.module.css'
import {Link} from 'react-router-dom'
import Logo from './logo.png'
function Sginin() {
  return (
    <div className={style.container}>
      <div className={style.sgininForm}>
        <div className={style.inpustPart}>
          <div className={style.headerInput}>
            <p>Sign In</p>
          </div>
          <div className={style.inputFields}>
            <div className={style.field}>
              <label htmlFor="username">Username</label>
              <input type="text" name='username' />
            </div>
            <div className={style.field}>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' />
            </div>
          </div>
          <button className={style.sgininButton}>Sgin in</button>
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
          <Link to='/login'>Sgin Up</Link>

        </div>

      </div>
    </div>
  )
}

export default Sginin