import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { characterDetailApi, ApiError } from '../services/characterDetailApi';

/**
 * Custom hook for managing character detail data and related information
 * Handles loading character, episodes, and location data
 */
export const useCharacterDetail = characterId => {
  // Use URL params if characterId not provided
  const { id: urlId } = useParams();
  const id = characterId || urlId;

  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch character and related data
   */
  const fetchCharacterDetail = useCallback(async characterId => {
    if (!characterId) {
      setError('Character ID is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch character data first
      const characterData =
        await characterDetailApi.getCharacterById(characterId);
      setCharacter(characterData);

      // Fetch episodes in parallel with location
      const [episodesData, locationData] = await Promise.allSettled([
        characterDetailApi.getEpisodesByUrls(characterData.episode || []),
        characterDetailApi.getLocationByUrl(characterData.location?.url),
      ]);

      // Handle episodes result
      if (episodesData.status === 'fulfilled') {
        setEpisodes(episodesData.value || []);
      } else {
        console.warn('Failed to fetch episodes:', episodesData.reason);
        setEpisodes([]);
      }

      // Handle location result
      if (locationData.status === 'fulfilled') {
        setLocation(locationData.value);
      } else {
        console.warn('Failed to fetch location:', locationData.reason);
        setLocation(null);
      }
    } catch (err) {
      console.error('Error fetching character detail:', err);

      if (err instanceof ApiError && err.status === 404) {
        setError(
          'Character not found. The character may not exist or the ID is invalid.'
        );
      } else {
        setError(
          err.message || 'Failed to fetch character details. Please try again.'
        );
      }

      // Reset data on error
      setCharacter(null);
      setEpisodes([]);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Retry fetching character detail
   */
  const retry = useCallback(() => {
    if (id) {
      fetchCharacterDetail(id);
    }
  }, [id, fetchCharacterDetail]);

  /**
   * Navigate back to characters list
   */
  const goBack = useCallback(() => {
    // If running in shell context, use router navigation
    if (window.location.pathname.includes('character/')) {
      const baseUrl = window.location.origin;
      window.location.href = `${baseUrl}/characters`;
    } else {
      // Fallback for standalone mode
      window.history.back();
    }
  }, []);

  // Fetch data when component mounts or id changes
  useEffect(() => {
    if (id) {
      fetchCharacterDetail(id);
    } else {
      setError('No character ID provided');
    }
  }, [id, fetchCharacterDetail]);

  return {
    // Data
    character,
    episodes,
    location,
    characterId: id,

    // States
    loading,
    error,

    // Actions
    retry,
    goBack,
    refetch: () => fetchCharacterDetail(id),
  };
};
