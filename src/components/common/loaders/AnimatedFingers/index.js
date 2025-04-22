import React from 'react';
import styles from './hand.module.css';

export const AnimatedFingers = () => {
  return (
    <div className={styles.hand}>
      <div className={styles.finger}></div>
      <div className={styles.finger}></div>
      <div className={styles.finger}></div>
      <div className={styles.finger}></div>
      <div className={styles.palm}></div>
      <div className={styles.thumb}></div>
    </div>
  );
};

export default AnimatedFingers;
