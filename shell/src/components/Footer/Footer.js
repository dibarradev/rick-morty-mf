import React from 'react';
import styles from './Footer.module.scss';

/**
 * Footer component for the shell application
 * Provides consistent footer across all microfrontends
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} bg-dark text-light`}>
      <div className='container-fluid'>
        <div className='row align-items-center'>
          <div className='col-md-6 col-12'>
            <p className={`mb-0 ${styles.copyright}`}>
              © {currentYear} Rick and Morty App.
            </p>
          </div>
          <div className='col-md-6 col-12'>
            <div className={styles.links}>
              <a
                href='https://rickandmortyapi.com/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.apiLink}
              >
                Rick and Morty API
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
