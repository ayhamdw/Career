import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <section className={styles.CareerStatistics}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.StatisticsDescription}>
                        <span className={styles.highlight}>CAREER STATISTICS</span>
                        <h2>Connecting Customers and Service Providers</h2>
                        <p className={styles.desc}>
                            Career is an application designed to be the perfect bridge between customers and service providers, offering a seamless and integrated experience to meet users' needs with ease and efficiency.
                        </p>
                        <div className={styles.statistc}>
                            <div className={styles.statItem}>
                                <h2>6,000</h2>
                                <span>Happy Customers</span>
                            </div>
                            <div className={styles.statItem}>
                                <h2>4,000</h2>
                                <span>Service Providers</span>
                            </div>
                            <div className={styles.statItem}>
                                <h2>100</h2>
                                <span>Professions Covered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default AboutUs;
