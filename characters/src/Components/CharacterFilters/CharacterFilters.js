import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './CharacterFilters.module.scss';

/**
 * Character filters component for filtering the character list
 * Provides search and filter functionality with debounced input
 */
const CharacterFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  loading,
}) => {
  // Local state for immediate UI updates (prevents focus loss)
  const [localName, setLocalName] = useState(filters.name || '');
  const [localSpecies, setLocalSpecies] = useState(filters.species || '');
  const [localStatus, setLocalStatus] = useState(filters.status || '');

  // Refs to store timeout IDs for cleanup
  const nameTimeoutRef = useRef(null);
  const speciesTimeoutRef = useRef(null);

  // Handle name input change with debounce
  const handleNameChange = useCallback(
    value => {
      setLocalName(value);

      // Clear previous timeout
      if (nameTimeoutRef.current) {
        clearTimeout(nameTimeoutRef.current);
      }

      // Set new timeout
      nameTimeoutRef.current = setTimeout(() => {
        onFiltersChange({ name: value });
      }, 500);
    },
    [onFiltersChange]
  );

  // Handle species input change with debounce
  const handleSpeciesChange = useCallback(
    value => {
      setLocalSpecies(value);

      // Clear previous timeout
      if (speciesTimeoutRef.current) {
        clearTimeout(speciesTimeoutRef.current);
      }

      // Set new timeout
      speciesTimeoutRef.current = setTimeout(() => {
        onFiltersChange({ species: value });
      }, 500);
    },
    [onFiltersChange]
  );

  // Handle status change (immediate)
  const handleStatusChange = useCallback(
    value => {
      setLocalStatus(value);
      onFiltersChange({ status: value });
    },
    [onFiltersChange]
  );

  /**
   * Handle clear filters
   */
  const handleClearFilters = useCallback(() => {
    setLocalName('');
    setLocalSpecies('');
    setLocalStatus('');
    onClearFilters();
  }, [onClearFilters]);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = localName || localStatus || localSpecies;

  // Sync local state only when filters are cleared externally
  useEffect(() => {
    if (!filters.name && !filters.status && !filters.species) {
      setLocalName('');
      setLocalSpecies('');
      setLocalStatus('');
    }
  }, [filters]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (nameTimeoutRef.current) {
        clearTimeout(nameTimeoutRef.current);
      }
      if (speciesTimeoutRef.current) {
        clearTimeout(speciesTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.filtersContainer}>
      <div className='card'>
        <div className='card-body'>
          <div className='row g-3'>
            {/* Name Search */}
            <div className='col-lg-4 col-md-6 col-12'>
              <label htmlFor='name-filter' className={styles.filterLabel}>
                Search by Name
              </label>
              <div className={styles.inputGroup}>
                <input
                  id='name-filter'
                  type='text'
                  className='form-control'
                  placeholder='Enter character name...'
                  value={localName}
                  onChange={e => handleNameChange(e.target.value)}
                  disabled={loading}
                  aria-describedby='name-filter-help'
                />
                <span className={styles.searchIcon}>🔍</span>
              </div>
              <small
                id='name-filter-help'
                className={`form-text text-muted ${styles.inputHelper}`}
              >
                Search characters by their name
              </small>
            </div>

            {/* Status Filter */}
            <div className='col-lg-2 col-md-3 col-sm-6 col-12'>
              <label htmlFor='status-filter' className={styles.filterLabel}>
                Status
              </label>
              <select
                id='status-filter'
                className='form-select'
                value={localStatus}
                onChange={e => handleStatusChange(e.target.value)}
                disabled={loading}
                aria-describedby='status-filter-help'
              >
                <option value=''>All Status</option>
                <option value='alive'>Alive</option>
                <option value='dead'>Dead</option>
                <option value='unknown'>Unknown</option>
              </select>
              <small
                id='status-filter-help'
                className={`form-text text-muted ${styles.inputHelper}`}
              >
                Filter by character status
              </small>
            </div>

            {/* Species Filter */}
            <div className='col-lg-3 col-md-3 col-sm-6 col-12'>
              <label htmlFor='species-filter' className={styles.filterLabel}>
                Species
              </label>
              <input
                id='species-filter'
                type='text'
                className='form-control'
                placeholder='e.g., Human, Alien...'
                value={localSpecies}
                onChange={e => handleSpeciesChange(e.target.value)}
                disabled={loading}
                aria-describedby='species-filter-help'
              />
              <small
                id='species-filter-help'
                className={`form-text text-muted ${styles.inputHelper}`}
              >
                Filter by species type
              </small>
            </div>

            {/* Action Buttons */}
            <div className='col-lg-3 col-md-12 col-12'>
              <label className={styles.filterLabel} aria-hidden='true'>
                Actions
              </label>
              <div className={styles.actionButtons}>
                <button
                  type='button'
                  className='btn btn-outline-secondary'
                  onClick={handleClearFilters}
                  disabled={loading || !hasActiveFilters}
                  title='Clear all filters'
                >
                  Clear Filters
                </button>
                {loading && (
                  <div className={styles.loadingIndicator}>
                    <span className={styles.spinner}></span>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && !loading && (
            <div className={styles.activeFilters}>
              <h6 className={styles.activeFiltersTitle}>Active Filters:</h6>
              <div className={styles.filterTags}>
                {localName && (
                  <span className={styles.filterTag}>
                    Name: "{localName}"
                    <button
                      onClick={() => {
                        setLocalName('');
                        onFiltersChange({ name: '' });
                      }}
                      className={styles.removeTag}
                      aria-label='Remove name filter'
                    >
                      ×
                    </button>
                  </span>
                )}
                {localStatus && (
                  <span className={styles.filterTag}>
                    Status: {localStatus}
                    <button
                      onClick={() => {
                        setLocalStatus('');
                        onFiltersChange({ status: '' });
                      }}
                      className={styles.removeTag}
                      aria-label='Remove status filter'
                    >
                      ×
                    </button>
                  </span>
                )}
                {localSpecies && (
                  <span className={styles.filterTag}>
                    Species: {localSpecies}
                    <button
                      onClick={() => {
                        setLocalSpecies('');
                        onFiltersChange({ species: '' });
                      }}
                      className={styles.removeTag}
                      aria-label='Remove species filter'
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterFilters;
