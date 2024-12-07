import React from "react";
import styles from "./Services.module.css";
import teacher from './teacher.svg'
import course from './course.svg'
import learning from './learning.svg'

const Services = () => {
  return (
    <section className={styles.Services}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.serviceDescreption}>
            <span>OUR SERVICES</span>
            <h2>What You Can Benefit From Us</h2>
            <p>
              We offer a range of services designed to boost your career prospects. From mentorship by professionals to skill-building courses, we help you build a successful career.
            </p>
          </div>
          <div className={styles.serviceItems}>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={teacher} alt="Mentorship" />
              </div>
              <h2>Professional Mentorship</h2>
              <p>
                Connect with industry experts who provide personalized guidance to help you navigate your career path and achieve your professional goals.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={course} alt="Certification" />
              </div>
              <h2>Career Certifications</h2>
              <p>
                Gain recognized certifications that will enhance your resume and open up new career opportunities in your field of interest.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={learning} alt="Skill Development" />
              </div>
              <h2>Skill Development</h2>
              <p>
                Access a variety of online courses designed to help you acquire new skills and stay competitive in today’s job market.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={teacher} alt="Career Advice" />
              </div>
              <h2>Career Advice</h2>
              <p>
                Receive expert advice on resume writing, interview preparation, and job search strategies tailored to your career aspirations.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={course} alt="Job Placement Assistance" />
              </div>
              <h2>Job Placement Assistance</h2>
              <p>
                Get help finding job openings that match your skills and qualifications, and connect with employers who are looking for talent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
