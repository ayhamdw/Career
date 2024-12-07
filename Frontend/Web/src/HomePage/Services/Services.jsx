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
            <span>WHAT WE GIVE</span>
            <h2>What do You Get From Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              dignissim, sem non convallis molestie.
            </p>
          </div>
          <div className={styles.serviceItems}>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={teacher} alt="" />
              </div>
              <h2>Professional Teacher</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                dignissim, sem non convallis molestie.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={course} alt="" />
              </div>
              <h2>Course Certificate</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                dignissim, sem non convallis molestie.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={learning} alt="" />
              </div>
              <h2>Interesting Learning</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                dignissim, sem non convallis molestie.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={teacher} alt="" />
              </div>
              <h2>Professional Teacher</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                dignissim, sem non convallis molestie.
              </p>
            </div>
            <div className={styles.serviceItem}>
              <div className={styles.circle}>
                <img src={course} alt="" />
              </div>
              <h2>Course Certificate</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                dignissim, sem non convallis molestie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
