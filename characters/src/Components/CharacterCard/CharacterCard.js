import React from 'react';
import styles from './CharacterCard.module.scss';

/**
 * Character card component for displaying individual character information
 * Supports both grid and list view modes
 */
const CharacterCard = ({ character, onClick, viewMode = 'grid' }) => {
  /**
   * Get status badge styling based on character status
   */
  const getStatusBadge = status => {
    const statusConfig = {
      Alive: { color: 'success', icon: '●' },
      Dead: { color: 'danger', icon: '●' },
      unknown: { color: 'secondary', icon: '?' },
    };

    const config = statusConfig[status] || statusConfig['unknown'];
    return {
      className: `badge bg-${config.color} ${styles.statusBadge}`,
      icon: config.icon,
    };
  };

  /**
   * Handle image loading error
   */
  const handleImageError = e => {
    e.target.src =
      'https://via.placeholder.com/300x300/1a1d29/00bcd4?text=No+Image';
  };

  /**
   * Handle card click with keyboard support
   */
  const handleClick = () => {
    onClick?.(character);
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyPress = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const statusBadge = getStatusBadge(character.status);

  if (viewMode === 'list') {
    return (
      <div
        className={`${styles.characterCard} ${styles.listView}`}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role='button'
        aria-label={`View details for ${character.name}`}
      >
        <div className='row g-0 align-items-center'>
          <div className='col-md-2 col-sm-3 col-4'>
            <img
              src={character.image}
              alt={character.name}
              className={styles.characterImageList}
              onError={handleImageError}
              loading='lazy'
            />
          </div>
          <div className='col-md-10 col-sm-9 col-8'>
            <div className={styles.cardBodyList}>
              <div className='row'>
                <div className='col-md-4'>
                  <h5 className={styles.characterName}>{character.name}</h5>
                  <span className={statusBadge.className}>
                    {statusBadge.icon} {character.status}
                  </span>
                </div>
                <div className='col-md-4'>
                  <div className={styles.characterDetail}>
                    <strong>Species:</strong> {character.species}
                  </div>
                  <div className={styles.characterDetail}>
                    <strong>Gender:</strong> {character.gender}
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className={styles.characterDetail}>
                    <strong>Origin:</strong>{' '}
                    {character.origin?.name || 'Unknown'}
                  </div>
                  <div className={styles.characterDetail}>
                    <strong>Location:</strong>{' '}
                    {character.location?.name || 'Unknown'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card ${styles.characterCard} ${styles.gridView}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role='button'
      aria-label={`View details for ${character.name}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={character.image}
          alt={character.name}
          className={`card-img-top ${styles.characterImage}`}
          onError={handleImageError}
          loading='lazy'
        />
        <div className={styles.statusOverlay}>
          <span className={statusBadge.className}>
            {statusBadge.icon} {character.status}
          </span>
        </div>
      </div>

      <div className='card-body'>
        <h5 className={`card-title ${styles.characterName}`}>
          {character.name}
        </h5>

        <div className={styles.characterInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Species:</span>
            <span className={styles.infoValue}>{character.species}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Gender:</span>
            <span className={styles.infoValue}>{character.gender}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Origin:</span>
            <span className={styles.infoValue} title={character.origin?.name}>
              {character.origin?.name || 'Unknown'}
            </span>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.episodeCount}>
            Episodes: {character.episode?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
