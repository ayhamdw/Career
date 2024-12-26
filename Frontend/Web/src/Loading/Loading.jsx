import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
            <h2 className={styles.text}>Loading...</h2>
        </div>
    );
};

export default Loading;
