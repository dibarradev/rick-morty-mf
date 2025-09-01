import React from 'react';
import styles from './LocationInfo.module.scss';

/**
 * Location information component that displays character's origin and current location
 * Shows detailed location data when available
 */
const LocationInfo = ({ character, location }) => {
  /**
   * Render location card
   */
  const renderLocationCard = (title, locationData, isOrigin = false) => {
    const hasDetailedInfo = location && !isOrigin;

    return (
      <div className={styles.locationCard}>
        <div className={styles.locationHeader}>
          <h4 className={styles.locationTitle}>{title}</h4>
          {hasDetailedInfo && (
            <span className={styles.locationType}>{location.type}</span>
          )}
        </div>

        <div className={styles.locationContent}>
          <div className={styles.locationName}>
            {locationData?.name || 'Unknown'}
          </div>

          {hasDetailedInfo && (
            <div className={styles.locationDetails}>
              <div className={styles.locationMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Dimension:</span>
                  <span className={styles.metaValue}>
                    {location.dimension || 'Unknown'}
                  </span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Residents:</span>
                  <span className={styles.metaValue}>
                    {location.residents?.length || 0} characters
                  </span>
                </div>
              </div>

              {location.created && (
                <div className={styles.locationFooter}>
                  <span className={styles.createdDate}>
                    Created: {new Date(location.created).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className={styles.locationHeader}>
          <h3 className={styles.sectionTitle}>Location Information</h3>
          <p className={styles.sectionSubtitle}>
            Origin and current location details
          </p>
        </div>

        <div className={styles.locationsGrid}>
          {/* Origin */}
          <div className='col-md-6 col-12'>
            {renderLocationCard('Origin', character.origin, true)}
          </div>

          {/* Current Location */}
          <div className='col-md-6 col-12'>
            {renderLocationCard('Current Location', character.location, false)}
          </div>
        </div>

        {/* Location Comparison */}
        {character.origin?.name && character.location?.name && (
          <div className={styles.locationComparison}>
            <div className={styles.comparisonTitle}>Location Status</div>
            <div className={styles.comparisonContent}>
              {character.origin.name === character.location.name ? (
                <span className={`badge bg-success ${styles.statusBadge}`}>
                  ● Still at origin location
                </span>
              ) : (
                <span className={`badge bg-warning ${styles.statusBadge}`}>
                  ● Moved from origin
                </span>
              )}
            </div>
          </div>
        )}

        {/* Additional Location Info */}
        {location && (
          <div className={styles.additionalInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Location ID</div>
                <div className={styles.infoValue}>{location.id}</div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Type</div>
                <div className={styles.infoValue}>
                  {location.type || 'Unknown'}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Dimension</div>
                <div className={styles.infoValue}>
                  {location.dimension || 'Unknown'}
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Known Residents</div>
                <div className={styles.infoValue}>
                  {location.residents?.length || 0} characters
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInfo;
