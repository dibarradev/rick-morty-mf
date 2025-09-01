import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import HomePage from './pages/HomePage/HomePage';
import styles from './App.module.scss';

// Lazy load microfrontends
const Characters = React.lazy(() => import('characters/Characters'));

/**
 * Main App component that orchestrates the shell application
 * Handles routing and layout for all microfrontends
 */
function App() {
  return (
    <ErrorBoundary>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.mainContent}>
          <div className='container'>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/characters' element={<Characters />} />
                <Route path='*' element={<HomePage />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
