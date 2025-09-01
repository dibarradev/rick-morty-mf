import React from 'react';
import styles from './LoadingSpinner.module.scss';

/**
 * Loading spinner component for the character detail microfrontend
 * Provides visual feedback during data loading
 */
const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const spinnerClass = `${styles.spinner} ${styles[size]}`;

  return (
    <div className={styles.container}>
      <div className={spinnerClass}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
