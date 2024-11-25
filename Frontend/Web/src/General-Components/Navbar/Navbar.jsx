import React, { useState } from 'react'
import '../../index.css'
import './Navbar.css'
import '../../main.css'
import { Link } from 'react-router-dom'
import NavLogo from './logo.png'



function Navbar() {
  const [showMenu, setShowMenu] = useState(true);

  function showMenuBar() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className='container'>
        <div className={showMenu ? 'closeNav' : 'openNav'}>
          <div className='Logo'>
            <img src={NavLogo} alt="Career Logo" />
          </div>
          <div className={showMenu ? 'navSections' : 'navSectionsOpen'}>
            <Link className='navSection' to='/'>
              <p>Main</p>
            </Link>
            <Link className='navSection'>
              <p>Requests</p>
            </Link>
            <Link className='navSection'>
              <p>Messages</p>
            </Link>
            <Link className='navSection'>
              <p>Friend Requests</p>
            </Link>
            <Link className='navSection'>
              <p>Settings</p>
            </Link>
          </div>
          <div className='logining'>
            <Link className='signIn' to='/signin'>Sign in</Link>
            <Link className='signUp' to='/signup'>Sign Up</Link>
          </div>
          <button className={showMenu ? 'burger-menu-close' : 'burger-menu-open'} onClick={showMenuBar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
        </div>
      </div>

    </>
  )
}

export default Navbar