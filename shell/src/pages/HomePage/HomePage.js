import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

/**
 * Home page component that serves as the landing page
 * Provides introduction and navigation to microfrontends
 */
const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8 col-md-10 col-12'>
            {/* Hero Section */}
            <div className={styles.heroSection}>
              <h1 className={styles.title}>
                Welcome to the Rick and Morty Universe
              </h1>
              <p className={styles.subtitle}>
                Explore characters and episodes from the multiverse using our
                microfrontends architecture powered by React and Webpack Module
                Federation.
              </p>
            </div>

            {/* Features Grid */}
            <div className='row'>
              <div className='col-md-12'>
                <div className={`card h-100 ${styles.featureCard}`}>
                  <div className='card-body'>
                    <img
                      src='img/rick-morty.webp'
                      alt='Character'
                      className={styles.featureImage}
                    />
                    <h3 className='card-title'>Characters</h3>
                    <p className='card-text'>
                      Browse through all characters from the Rick and Morty
                      universe. Filter by name, status, and species to find your
                      favorites.
                    </p>
                    <Link to='/characters' className='btn btn-primary'>
                      Explore Characters
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
