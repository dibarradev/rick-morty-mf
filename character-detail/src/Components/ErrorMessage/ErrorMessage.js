import React from 'react';
import styles from './ErrorMessage.module.scss';

/**
 * Error message component for displaying errors and providing action buttons
 * Supports both retry and navigation actions
 */
const ErrorMessage = ({
  message,
  onRetry,
  onGoBack,
  retryText = 'Try Again',
  type = 'error',
  details,
}) => {
  const getIconForType = type => {
    switch (type) {
      case 'error':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'info':
        return 'ℹ️';
      default:
        return '⚠️';
    }
  };

  const getClassForType = type => {
    switch (type) {
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.error;
    }
  };

  return (
    <div className={`${styles.errorContainer} ${getClassForType(type)}`}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>{getIconForType(type)}</div>

        <h2 className={styles.errorTitle}>
          {type === 'info' ? 'Not Found' : 'Something went wrong'}
        </h2>

        <p className={styles.errorMessage}>{message}</p>

        {details && (
          <details className={styles.errorDetails}>
            <summary>Technical Details</summary>
            <pre className={styles.errorDetailsContent}>{details}</pre>
          </details>
        )}

        <div className={styles.actionButtons}>
          {onRetry && (
            <button
              className={`btn ${type === 'info' ? 'btn-primary' : 'btn-outline-primary'} ${styles.actionButton}`}
              onClick={onRetry}
            >
              {retryText}
            </button>
          )}

          {onGoBack && (
            <button
              className={`btn btn-outline-secondary ${styles.actionButton}`}
              onClick={onGoBack}
            >
              <span aria-hidden='true'>‹</span> Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
