import { useState, useEffect, useCallback } from 'react';
import { charactersApi, ApiError } from '../services/charactersApi';

/**
 * Custom hook for managing characters data and state
 * Handles loading, error states, and filtering logic
 */
export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    count: 0,
    next: null,
    prev: null,
  });

  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
  });

  /**
   * Fetch characters with current filters and page
   */
  const fetchCharacters = useCallback(
    async (page = 1, filterParams) => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page,
          ...filterParams,
        };

        const data = await charactersApi.getCharacters(params);

        setCharacters(data.results || []);
        setPagination({
          page: page,
          pages: data.info?.pages || 1,
          count: data.info?.count || 0,
          next: data.info?.next || null,
          prev: data.info?.prev || null,
        });
      } catch (err) {
        console.error('Error fetching characters:', err);

        if (err instanceof ApiError && err.status === 404) {
          // No results found for current filters
          setCharacters([]);
          setPagination({
            page: 1,
            pages: 0,
            count: 0,
            next: null,
            prev: null,
          });
          setError('No characters found matching your criteria.');
        } else {
          setError(
            err.message || 'Failed to fetch characters. Please try again.'
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [] // Remove filters dependency to prevent unnecessary recreations
  );

  /**
   * Update filters and reset to first page
   */
  const updateFilters = useCallback(
    newFilters => {
      setFilters(prev => {
        const updatedFilters = { ...prev, ...newFilters };
        // Fetch with updated filters immediately, don't wait for state update
        fetchCharacters(1, updatedFilters);
        return updatedFilters;
      });
    },
    [fetchCharacters]
  );

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      name: '',
      status: '',
      species: '',
    });
  }, []);

  /**
   * Go to specific page
   */
  const goToPage = useCallback(
    page => {
      if (page >= 1 && page <= pagination.pages) {
        fetchCharacters(page, filters);
      }
    },
    [fetchCharacters, pagination.pages, filters]
  );

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (pagination.next) {
      goToPage(pagination.page + 1);
    }
  }, [goToPage, pagination.next, pagination.page]);

  /**
   * Go to previous page
   */
  const prevPage = useCallback(() => {
    if (pagination.prev) {
      goToPage(pagination.page - 1);
    }
  }, [goToPage, pagination.prev, pagination.page]);

  /**
   * Retry fetching characters
   */
  const retry = useCallback(() => {
    fetchCharacters(pagination.page, filters);
  }, [fetchCharacters, pagination.page, filters]);

  // Initial fetch only - filters are now handled in updateFilters
  useEffect(() => {
    fetchCharacters(1, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return {
    // Data
    characters,
    pagination,
    filters,

    // States
    loading,
    error,

    // Actions
    updateFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
    retry,
    refetch: () => fetchCharacters(pagination.page, filters),
  };
};
