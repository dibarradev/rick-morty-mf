import React from 'react';
import { useCharacterDetail } from '../../hooks/useCharacterDetail';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './CharacterDetail.module.scss';

/**
 * CharacterDetail component for the Characters microfrontend
 * Simplified version that displays detailed character information
 */
const CharacterDetail = ({ characterId, onGoBack }) => {
  const { character, episodes, location, loading, error, retry, goBack } =
    useCharacterDetail(characterId, onGoBack);

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
        <div className='card'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img
                src={character.image}
                alt={character.name}
                className={`${styles.characterImage} card-img-top`}
                loading='lazy'
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h1 className={`card-title ${styles.characterName}`}>
                  {character.name}
                </h1>

                <div className={styles.characterInfo}>
                  <div
                    className={`${styles.statusBadge} ${styles[character.status?.toLowerCase()]}`}
                  >
                    <span className={styles.statusIndicator}></span>
                    {character.status} - {character.species}
                  </div>

                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Gender:</span>
                      <span className={styles.infoValue}>
                        {character.gender}
                      </span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Origin:</span>
                      <span className={styles.infoValue}>
                        {character.origin?.name}
                      </span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>
                        Last known location:
                      </span>
                      <span className={styles.infoValue}>
                        {character.location?.name}
                      </span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Type:</span>
                      <span className={styles.infoValue}>
                        {character.type || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Information */}
      {location && (
        <div className={styles.contentSection}>
          <div className='card'>
            <div className='card-body'>
              <h3 className={styles.sectionTitle}>📍 Location Details</h3>
              <div className={styles.locationInfo}>
                <h4>{location.name}</h4>
                <p>
                  <strong>Type:</strong> {location.type}
                </p>
                <p>
                  <strong>Dimension:</strong> {location.dimension}
                </p>
                <p>
                  <strong>Residents:</strong> {location.residents?.length || 0}{' '}
                  characters
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Episodes List */}
      {episodes.length > 0 && (
        <div className={styles.contentSection}>
          <div className='card'>
            <div className='card-body'>
              <h3 className={styles.sectionTitle}>
                📺 Episodes ({episodes.length})
              </h3>
              <div className={styles.episodesList}>
                {episodes.map(episode => (
                  <div key={episode.id} className={styles.episodeItem}>
                    <div className={styles.episodeNumber}>
                      {episode.episode}
                    </div>
                    <div className={styles.episodeDetails}>
                      <h4 className={styles.episodeTitle}>{episode.name}</h4>
                      <p className={styles.episodeDate}>
                        Air Date: {episode.air_date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
