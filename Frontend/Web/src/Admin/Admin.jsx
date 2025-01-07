import React from 'react'
import style from './Admin.module.css'
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom'
import { MdHome } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";

function Admin(){

    return(
        <div className={style.container}>
            <div className={style.sidebar}>
                <div className={style.sidebarHeader}>
                    <img src={logo} alt="Logo" />
                    <p className={style.careerName}>areer</p>
                </div>

                <div className={style.sidebarContent}>
                    <ul>
                        <li> <Link to="/statistics" className={style.sidebarItem}> <MdHome className={style.homeLogo}/> Statistics</Link> </li>
                        <li> <Link to="/users" className={style.sidebarItem}> <FaUsersGear/>Users</Link> </li>
                        <li> <Link to="/certificates" className={style.sidebarItem}>Certificates</Link> </li>                       
                        
                    </ul>
                </div>
            </div>

            <div className={style.contentPage}>
                <div className={style.navbar}>
                    Navbar
                </div>
                <div className={style.content}>
                    content
                </div>
            </div>

        </div>
    );
}

export default Admin;