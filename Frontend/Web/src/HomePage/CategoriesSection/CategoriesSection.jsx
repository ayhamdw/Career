import React from 'react';
import styles from './CategoriesSection.module.css';
import {Link} from 'react-router-dom'

import HomeServicesImage from './images/HomeServices.png'
import TechnicalServices from './images/TechnicalServices.png'
import EducationalServices from './images/EducationalServices.png'
import Healthcare from './images/Healthcare.webp'
import CreativeServices from './images/CreativeServices.png'
import LegalFinancialServices from './images/LegalFinancialServices.webp'

const CategoriesSection = () => {
  return (
    <div className={styles.container}>
      <section className={styles.courses}>
        <div className={styles.innerContainer}>

          <h1 className={styles.headerTitle}>Choose a Category</h1>

          <div className={styles.courseCards}>
            <div className={styles.courseCard}>
              <img src={HomeServicesImage} alt="Home Services" />
              <h2>Home Services</h2>
              <p>
                A career in Home Services involves providing essential maintenance
                and repair services for residential properties, such as plumbing,
                electrical work, cleaning, landscaping, and general home improvement
                tasks. It requires technical skills and offers opportunities for specialization.
              </p>
              <Link to="/service-provider">Get it Now</Link>
            </div>
            <div className={styles.courseCard}>
              <img src={TechnicalServices} alt="Technical Services" />
              {/* <div className={styles.cardInfo}>
                <div className={styles.grow}>
                  <span>6 Weeks</span>
                  <span>Intermediate</span>
                </div>
                <span>By Emily Johnson</span>
              </div> */}
              <h2>Technical Services</h2>
              <p>
                A career in Technical Services involves providing support
                and maintenance for technology systems and equipment, such as
                computers, networks, software, and hardware. It requires technical
                expertise to troubleshoot, repair, and optimize systems, offering
                opportunities for specialization in various tech fields.
              </p>
              <Link to="/service-provider">Get it Now</Link>
            </div>
            <div className={styles.courseCard}>
              <img src={EducationalServices} alt="Educational Services" />
              {/* <div className={styles.cardInfo}>
                <div className={styles.grow}>
                  <span>8 Weeks</span>
                  <span>Intermediate</span>
                </div>
                <span>By David Brown</span>
              </div> */}
              <h2>Educational Services</h2>
              <p>
                A career in Educational Services focuses on teaching, training, and supporting learners of
                all ages. It includes roles like teachers, tutors, counselors, and administrators,
                aiming to provide knowledge, skills, and guidance for personal and professional growth.
              </p>
              <Link to="/service-provider">Get it Now</Link>
            </div>

            <div className={styles.courseCard}>
              <img src={Healthcare} alt="Healthcare" />
              {/* <div className={styles.cardInfo}>
                <div className={styles.grow}>
                  <span>10 Weeks</span>
                  <span>Beginner</span>
                </div>
                <span>By Sarah Thompson</span>
              </div> */}
              <h2>Healthcare</h2>
              <p>
                A career in Healthcare focuses on helping people stay healthy,
                recover from illness, and improve their well-being. It includes roles
                like doctors, nurses, therapists, and medical technicians, all working
                to provide care, treatment, and support to patients.
              </p>
              <Link to="/service-provider">Get it Now</Link>
            </div>

            <div className={styles.courseCard}>
              <img src={CreativeServices} alt="Creative Services" />
              {/* <div className={styles.cardInfo}>
                <div className={styles.grow}>
                  <span>10 Weeks</span>
                  <span>Intermediate</span>
                </div>
                <span>By Michael Adams</span>
              </div> */}
              <h2>Creative Services</h2>
              <p>
                A career in Creative Services focuses on producing original and innovative work,
                such as design, writing, marketing, and content creation. It includes roles like
                graphic designers, writers, artists, and marketers, helping to communicate ideas
                and engage audiences.
              </p>
              <Link to="/service-provider">Get it Now</Link>
            </div>

            <div className={styles.courseCard}>
              <img src={LegalFinancialServices} alt="Legal & Financial Services" />
              {/* <div className={styles.cardInfo}>
                <div className={styles.grow}>
                  <span>6 Weeks</span>
                  <span>Advanced</span>
                </div>
                <span>By Jennifer Wilson</span>
              </div> */}
              <h2>Legal & Financial Services</h2>
              <p>
                A career in Legal & Financial Services involves providing support with laws, 
                regulations, money management, and financial planning. It includes roles like 
                lawyers, accountants, financial advisors, and consultants, helping individuals 
                and businesses make informed decisions and stay compliant.
              </p>
              <Link to="/service-provider">Get it Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesSection;
