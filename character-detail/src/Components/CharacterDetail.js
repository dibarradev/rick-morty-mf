import React from 'react';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import EpisodesList from './EpisodesList/EpisodesList';
import LocationInfo from './LocationInfo/LocationInfo';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import styles from './CharacterDetail.module.scss';

/**
 * Main CharacterDetail component that displays detailed character information
 * Includes character info, episodes list, and location details
 */
const CharacterDetail = ({ characterId }) => {
  const { character, episodes, location, loading, error, retry, goBack } =
    useCharacterDetail(characterId);

  if (loading) {
    return (
      <div className={styles.detailContainer}>
        <LoadingSpinner
          size='large'
          message='Loading character details from the multiverse...'
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailContainer}>
        <ErrorMessage
          message={error}
          onRetry={retry}
          onGoBack={goBack}
          type='error'
        />
      </div>
    );
  }

  if (!character) {
    return (
      <div className={styles.detailContainer}>
        <ErrorMessage
          message='Character not found'
          onGoBack={goBack}
          retryText='Go Back'
          type='info'
        />
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      {/* Header with Back Button */}
      <div className={styles.header}>
        <button
          className={`btn btn-outline-primary ${styles.backButton}`}
          onClick={goBack}
          aria-label='Go back to characters list'
        >
          <span aria-hidden='true'>‹</span> Back to Characters
        </button>
      </div>

      {/* Character Information */}
      <div className={styles.contentSection}>
        <CharacterInfo character={character} />
      </div>

      {/* Location Information */}
      {(character.location || character.origin) && (
        <div className={styles.contentSection}>
          <LocationInfo character={character} location={location} />
        </div>
      )}

      {/* Episodes List */}
      {episodes.length > 0 && (
        <div className={styles.contentSection}>
          <EpisodesList episodes={episodes} characterName={character.name} />
        </div>
      )}

      {/* Character Stats Summary */}
      <div className={styles.contentSection}>
        <div className='card'>
          <div className='card-body'>
            <h3 className={styles.sectionTitle}>Quick Stats</h3>
            <div className='row g-3'>
              <div className='col-md-3 col-sm-6'>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{episodes.length}</div>
                  <div className={styles.statLabel}>Episodes</div>
                </div>
              </div>
              <div className='col-md-3 col-sm-6'>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {character.status === 'Alive'
                      ? '✅'
                      : character.status === 'Dead'
                        ? '💀'
                        : '❓'}
                  </div>
                  <div className={styles.statLabel}>Status</div>
                </div>
              </div>
              <div className='col-md-3 col-sm-6'>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{character.species}</div>
                  <div className={styles.statLabel}>Species</div>
                </div>
              </div>
              <div className='col-md-3 col-sm-6'>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{character.gender}</div>
                  <div className={styles.statLabel}>Gender</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
