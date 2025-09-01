import React from 'react';
import styles from './CharacterInfo.module.scss';

/**
 * Character information component that displays main character details
 * Shows character image, basic info, and status
 */
const CharacterInfo = ({ character }) => {
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
   * Format date string
   */
  const formatDate = dateString => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const statusBadge = getStatusBadge(character.status);

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='row g-4'>
          {/* Character Image */}
          <div className='col-lg-4 col-md-5 col-12'>
            <div className={styles.imageContainer}>
              <img
                src={character.image}
                alt={character.name}
                className={styles.characterImage}
                onError={handleImageError}
              />
              <div className={styles.statusOverlay}>
                <span className={statusBadge.className}>
                  {statusBadge.icon} {character.status}
                </span>
              </div>
            </div>
          </div>

          {/* Character Details */}
          <div className='col-lg-8 col-md-7 col-12'>
            <div className={styles.characterDetails}>
              {/* Name and ID */}
              <div className={styles.nameSection}>
                <h1 className={styles.characterName}>{character.name}</h1>
                <span className={styles.characterId}>ID: {character.id}</span>
              </div>

              {/* Basic Information */}
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>Species</dt>
                  <dd className={styles.infoValue}>{character.species}</dd>
                </div>

                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>Gender</dt>
                  <dd className={styles.infoValue}>{character.gender}</dd>
                </div>

                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>Status</dt>
                  <dd className={styles.infoValue}>
                    <span className={statusBadge.className}>
                      {statusBadge.icon} {character.status}
                    </span>
                  </dd>
                </div>

                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>Type</dt>
                  <dd className={styles.infoValue}>
                    {character.type || 'N/A'}
                  </dd>
                </div>

                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>Origin</dt>
                  <dd
                    className={styles.infoValue}
                    title={character.origin?.name}
                  >
                    {character.origin?.name || 'Unknown'}
                  </dd>
                </div>

                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>Location</dt>
                  <dd
                    className={styles.infoValue}
                    title={character.location?.name}
                  >
                    {character.location?.name || 'Unknown'}
                  </dd>
                </div>
              </div>

              {/* Metadata */}
              <div className={styles.metadata}>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Created:</span>
                  <span className={styles.metadataValue}>
                    {formatDate(character.created)}
                  </span>
                </div>
                <div className={styles.metadataItem}>
                  <span className={styles.metadataLabel}>Episodes:</span>
                  <span className={styles.metadataValue}>
                    {character.episode?.length || 0} appearances
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
