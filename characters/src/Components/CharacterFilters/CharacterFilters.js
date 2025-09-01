import React, { useState, useEffect } from 'react';
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
  // Local state for immediate UI updates (debounced)
  const [localFilters, setLocalFilters] = useState(filters);

  // Debounce effect for name filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localFilters.name !== filters.name) {
        onFiltersChange({ name: localFilters.name });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localFilters.name, filters.name, onFiltersChange]);

  /**
   * Handle input changes for immediate UI feedback
   */
  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));

    // For dropdowns, update immediately
    if (field !== 'name') {
      onFiltersChange({ [field]: value });
    }
  };

  /**
   * Handle clear filters
   */
  const handleClearFilters = () => {
    setLocalFilters({ name: '', status: '', species: '' });
    onClearFilters();
  };

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = Object.values(filters).some(
    value => value && value.trim()
  );

  // Sync local state when filters change externally
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

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
                  value={localFilters.name}
                  onChange={e => handleInputChange('name', e.target.value)}
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
                value={localFilters.status}
                onChange={e => handleInputChange('status', e.target.value)}
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
                value={localFilters.species}
                onChange={e => handleInputChange('species', e.target.value)}
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
                {filters.name && (
                  <span className={styles.filterTag}>
                    Name: "{filters.name}"
                    <button
                      onClick={() => onFiltersChange({ name: '' })}
                      className={styles.removeTag}
                      aria-label='Remove name filter'
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.status && (
                  <span className={styles.filterTag}>
                    Status: {filters.status}
                    <button
                      onClick={() => onFiltersChange({ status: '' })}
                      className={styles.removeTag}
                      aria-label='Remove status filter'
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.species && (
                  <span className={styles.filterTag}>
                    Species: {filters.species}
                    <button
                      onClick={() => onFiltersChange({ species: '' })}
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
