import { useState, useEffect, useCallback } from 'react';
import { characterApi } from '../services/characterApi';

/**
 * Custom hook for managing character detail data and related information
 * Simplified version for the Characters microfrontend
 */
export const useCharacterDetail = (characterId, onGoBack) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Extract episode IDs from episode URLs
   */
  const extractEpisodeIds = episodeUrls => {
    return episodeUrls
      .map(url => {
        const match = url.match(/\/episode\/(\d+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean);
  };

  /**
   * Extract location ID from location URL
   */
  const extractLocationId = locationUrl => {
    if (!locationUrl) return null;
    const match = locationUrl.match(/\/location\/(\d+)/);
    return match ? match[1] : null;
  };

  /**
   * Fetch multiple episodes by IDs
   */
  const fetchEpisodes = async episodeIds => {
    if (!episodeIds.length) return [];

    try {
      if (episodeIds.length === 1) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeIds[0]}`
        );
        if (!response.ok) throw new Error('Episode not found');
        const episode = await response.json();
        return [episode];
      } else {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeIds.join(',')}`
        );
        if (!response.ok) throw new Error('Episodes not found');
        return await response.json();
      }
    } catch (err) {
      console.warn('Failed to fetch episodes:', err);
      return [];
    }
  };

  /**
   * Fetch location by ID
   */
  const fetchLocation = async locationId => {
    if (!locationId) return null;

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${locationId}`
      );
      if (!response.ok) throw new Error('Location not found');
      return await response.json();
    } catch (err) {
      console.warn('Failed to fetch location:', err);
      return null;
    }
  };

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
      const characterData = await characterApi.getCharacterById(characterId);
      setCharacter(characterData);

      // Extract IDs for episodes and location
      const episodeIds = extractEpisodeIds(characterData.episode || []);
      const locationId = extractLocationId(characterData.location?.url);

      // Fetch episodes and location in parallel
      const [episodesData, locationData] = await Promise.allSettled([
        fetchEpisodes(episodeIds),
        fetchLocation(locationId),
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

      if (err.status === 404) {
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
    if (characterId) {
      fetchCharacterDetail(characterId);
    }
  }, [characterId, fetchCharacterDetail]);

  /**
   * Navigate back to characters list
   */
  const goBack = useCallback(() => {
    if (onGoBack) {
      onGoBack();
    }
  }, [onGoBack]);

  // Fetch data when component mounts or id changes
  useEffect(() => {
    if (characterId) {
      fetchCharacterDetail(characterId);
    } else {
      setError('No character ID provided');
    }
  }, [characterId, fetchCharacterDetail]);

  return {
    // Data
    character,
    episodes,
    location,
    characterId,

    // States
    loading,
    error,

    // Actions
    retry,
    goBack,
    refetch: () => fetchCharacterDetail(characterId),
  };
};
