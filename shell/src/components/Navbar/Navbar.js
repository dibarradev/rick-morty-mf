import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';

/**
 * Navigation component for the shell application
 * Provides navigation between different microfrontends
 */
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
      <div className='container'>
        <Link className={`navbar-brand ${styles.brand}`} to='/'>
          <img
            src='img/rick-&-morty-logo.svg.webp'
            alt='Rick and Morty'
            className={styles.logo}
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          <span className={styles.fallbackText} style={{ display: 'none' }}>
            Rick & Morty
          </span>
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to='/'
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={`nav-link ${location.pathname === '/characters' ? 'active' : ''}`}
                to='/characters'
              >
                Characters
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
