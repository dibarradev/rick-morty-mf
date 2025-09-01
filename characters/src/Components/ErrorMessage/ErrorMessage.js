import React from 'react';
import styles from './ErrorMessage.module.scss';

/**
 * Error message component for displaying errors and empty states
 * Provides actionable feedback with retry options
 */
const ErrorMessage = ({
  message,
  onRetry,
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

        <h3 className={styles.errorTitle}>
          {type === 'info' ? 'No Results' : 'Something went wrong'}
        </h3>

        <p className={styles.errorMessage}>{message}</p>

        {details && (
          <details className={styles.errorDetails}>
            <summary>Technical Details</summary>
            <pre className={styles.errorDetailsContent}>{details}</pre>
          </details>
        )}

        {onRetry && (
          <button
            className={`btn ${type === 'info' ? 'btn-primary' : 'btn-outline-primary'} ${styles.retryButton}`}
            onClick={onRetry}
          >
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
