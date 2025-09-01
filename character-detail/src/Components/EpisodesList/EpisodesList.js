import React, { useState } from 'react';
import styles from './EpisodesList.module.scss';

/**
 * Episodes list component that displays all episodes where the character appears
 * Includes search functionality and episode details
 */
const EpisodesList = ({ episodes, characterName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  /**
   * Filter episodes based on search term
   */
  const filteredEpisodes = episodes.filter(
    episode =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Get episodes to display based on showAll state
   */
  const displayedEpisodes = showAll
    ? filteredEpisodes
    : filteredEpisodes.slice(0, 6);

  /**
   * Format episode code (e.g., S01E01)
   */
  const formatEpisodeCode = episode => {
    return episode.replace(/S(\d+)E(\d+)/, 'Season $1, Episode $2');
  };

  /**
   * Format air date
   */
  const formatAirDate = dateString => {
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

  /**
   * Get season color for visual distinction
   */
  const getSeasonColor = episode => {
    const seasonMatch = episode.match(/S(\d+)/);
    if (!seasonMatch) return 'primary';

    const season = parseInt(seasonMatch[1]);
    const colors = ['primary', 'success', 'warning', 'danger', 'info'];
    return colors[(season - 1) % colors.length];
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className={styles.episodesHeader}>
          <h3 className={styles.sectionTitle}>Episodes ({episodes.length})</h3>
          <p className={styles.sectionSubtitle}>
            All episodes featuring {characterName}
          </p>
        </div>

        {/* Search and Controls */}
        {episodes.length > 0 && (
          <div className={styles.episodesControls}>
            <div className='row g-3 align-items-center'>
              <div className='col-md-8 col-12'>
                <div className={styles.searchContainer}>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search episodes by name or code...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    aria-label='Search episodes'
                  />
                  <span className={styles.searchIcon}>🔍</span>
                </div>
              </div>
              <div className='col-md-4 col-12'>
                <div className={styles.resultsInfo}>
                  {searchTerm && (
                    <span className={styles.searchResults}>
                      {filteredEpisodes.length} of {episodes.length} episodes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Episodes Grid */}
        {filteredEpisodes.length > 0 ? (
          <>
            <div className={styles.episodesGrid}>
              {displayedEpisodes.map(episode => (
                <div key={episode.id} className={styles.episodeCard}>
                  <div className={styles.episodeHeader}>
                    <span
                      className={`badge bg-${getSeasonColor(episode.episode)} ${styles.episodeBadge}`}
                    >
                      {episode.episode}
                    </span>
                    <span className={styles.episodeDate}>
                      {formatAirDate(episode.air_date)}
                    </span>
                  </div>

                  <h4 className={styles.episodeTitle}>{episode.name}</h4>

                  <p className={styles.episodeCode}>
                    {formatEpisodeCode(episode.episode)}
                  </p>

                  <div className={styles.episodeFooter}>
                    <span className={styles.characterCount}>
                      {episode.characters?.length || 0} characters
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {filteredEpisodes.length > 6 && (
              <div className={styles.showMoreContainer}>
                <button
                  className='btn btn-outline-primary'
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll
                    ? 'Show Less'
                    : `Show All ${filteredEpisodes.length} Episodes`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.noEpisodes}>
            {searchTerm ? (
              <div className={styles.noResults}>
                <p>No episodes found matching "{searchTerm}"</p>
                <button
                  className='btn btn-outline-secondary btn-sm'
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <p>No episodes available for this character.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodesList;
