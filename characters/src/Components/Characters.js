import React, { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterCard from './CharacterCard/CharacterCard';
import CharacterFilters from './CharacterFilters/CharacterFilters';
import Pagination from './Pagination/Pagination';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import CharacterDetail from './CharacterDetail/CharacterDetail';
import styles from './Characters.module.scss';

/**
 * Main Characters component that displays the character listing
 * Integrates filtering, pagination, and character grid
 */
const Characters = () => {
  const {
    characters,
    pagination,
    filters,
    loading,
    error,
    updateFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
    retry,
  } = useCharacters();

  // View state for grid/list toggle
  const [viewMode, setViewMode] = useState('grid');

  // State for character detail view
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  /**
   * Handle character card click to show detail
   */
  const handleCharacterClick = character => {
    setSelectedCharacter(character);
  };

  /**
   * Handle going back from character detail
   */
  const handleGoBack = () => {
    setSelectedCharacter(null);
  };

  /**
   * Handle view mode toggle
   */
  const toggleViewMode = () => {
    setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'));
  };

  // If a character is selected, show the detail view
  if (selectedCharacter) {
    return (
      <CharacterDetail
        characterId={selectedCharacter.id}
        onGoBack={handleGoBack}
      />
    );
  }

  return (
    <div className={styles.charactersContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className='row align-items-center'>
          <div className='col-md-6 col-12'>
            <h1 className={styles.title}>Characters</h1>
            <p className={styles.subtitle}>
              Explore the multiverse of Rick and Morty characters
            </p>
          </div>
          <div className='col-md-6 col-12'>
            <div className={styles.headerControls}>
              <button
                className={`btn btn-outline-primary ${styles.viewToggle}`}
                onClick={toggleViewMode}
                title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
              >
                {viewMode === 'grid' ? '☰' : '⊞'}
              </button>
              {pagination.count > 0 && (
                <span className={styles.resultsCount}>
                  {pagination.count} characters found
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <CharacterFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          loading={loading}
        />
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {loading && (
          <LoadingSpinner
            size='large'
            message='Loading characters from the multiverse...'
          />
        )}

        {error && <ErrorMessage message={error} onRetry={retry} type='error' />}

        {!loading && !error && characters.length === 0 && (
          <ErrorMessage
            message='No characters found matching your search criteria.'
            onRetry={clearFilters}
            retryText='Clear Filters'
            type='info'
          />
        )}

        {!loading && !error && characters.length > 0 && (
          <>
            <div className={`${styles.charactersGrid} ${styles[viewMode]}`}>
              {characters.map(character => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={() => handleCharacterClick(character)}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className={styles.paginationSection}>
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={goToPage}
                  onNext={nextPage}
                  onPrevious={prevPage}
                  hasNext={!!pagination.next}
                  hasPrevious={!!pagination.prev}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Characters;
