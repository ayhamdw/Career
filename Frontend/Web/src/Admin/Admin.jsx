import React from 'react';
import style from './Admin.module.css';
import logo from '../assets/logo.png';
import { Link, Routes, Route } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";
import { CiMenuBurger } from "react-icons/ci";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Statistics from './Statistics/Statistics';
import Certificates from './Certificates/Certificates';
import Users from './Users/Users'
import { useAuth } from "../AuthContext";







function Admin() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        localStorage.clear();
        navigate("/signin");
        window.location.reload();
      };


    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <div className={style.sidebarHeader}>
                    <img src={logo} alt="Logo" />
                    <p className={style.careerName}>Career</p>
                </div>

                <div className={style.sidebarContent}>
                    <ul>
                        <li>
                            <Link to="/admin/statistics" className={style.sidebarItem}>
                                <MdHome /> Statistics
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/users" className={style.sidebarItem}>
                                <FaUsersGear /> Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/certificates" className={style.sidebarItem}>
                                <LiaCertificateSolid /> Certificates
                            </Link>
                        </li>

                        <li>
                            <Link onClick={handleLogout} className={style.sidebarItem}>
                                <FaSignOutAlt /> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={style.contentPage}>
                <div className={style.aboveNav}>
                    <img src={logo} alt="Logo" />
                    <p className={style.careerName}>Career</p>
                </div>
                <div className={style.navbar}>
                    <div className={style.left}>
                        <div className={style.burgerIcon}><CiMenuBurger /></div>
                        <input type="text" className={style.searchField} placeholder="Search..." />
                    </div>

                    <div className={style.right}>
                        <div className={style.settingsIcon}>⚙️</div>
                        <div className={style.profileIcon}>👤</div>
                    </div>
                </div>

                <div className={style.content}>
                    <Routes>
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="users" element={<Users />} />
                        <Route path="certificates" element={<Certificates />} />
                        <Route path="" element={<Statistics />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Admin;
