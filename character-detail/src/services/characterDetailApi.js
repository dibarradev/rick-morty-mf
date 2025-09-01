/**
 * API service for fetching character details and episodes
 * Handles communication with Rick and Morty API
 */

const API_BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Custom error class for API-related errors
 */
class ApiError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

/**
 * Logger utility for structured logging
 */
const logger = {
  info: (message, data = {}) => {
    console.log(`[CHARACTER-DETAIL API] ${message}`, data);
  },
  error: (message, error = {}) => {
    console.error(`[CHARACTER-DETAIL API ERROR] ${message}`, error);
  },
  warn: (message, data = {}) => {
    console.warn(`[CHARACTER-DETAIL API WARNING] ${message}`, data);
  },
};

/**
 * Generic fetch wrapper with error handling and logging
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const startTime = Date.now();

  try {
    logger.info(`Making API request to ${endpoint}`);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const duration = Date.now() - startTime;
    logger.info(`API request completed in ${duration}ms`, {
      endpoint,
      status: response.status,
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(`API request failed after ${duration}ms`, {
      endpoint,
      error: error.message,
      stack: error.stack,
    });

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(`Network error: ${error.message}`, 0, endpoint);
  }
};

/**
 * Character Detail API service
 */
export const characterDetailApi = {
  /**
   * Fetch a single character by ID with full details
   * @param {string|number} id - Character ID
   * @returns {Promise<Object>} Character data
   */
  getCharacterById: async id => {
    if (!id) {
      throw new ApiError('Character ID is required', 400, '/character/:id');
    }

    const endpoint = `/character/${id}`;

    try {
      const data = await apiRequest(endpoint);

      logger.info('Character detail fetched successfully', {
        id,
        name: data.name,
        episodeCount: data.episode?.length || 0,
      });

      return data;
    } catch (error) {
      logger.error('Failed to fetch character detail', {
        id,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Fetch episode details for multiple episodes
   * @param {Array<string>} episodeUrls - Array of episode URLs
   * @returns {Promise<Array<Object>>} Array of episode data
   */
  getEpisodesByUrls: async episodeUrls => {
    if (
      !episodeUrls ||
      !Array.isArray(episodeUrls) ||
      episodeUrls.length === 0
    ) {
      return [];
    }

    try {
      // Extract episode IDs from URLs
      const episodeIds = episodeUrls.map(url => {
        const parts = url.split('/');
        return parts[parts.length - 1];
      });

      const idsString = episodeIds.join(',');
      const endpoint = `/episode/${idsString}`;

      const data = await apiRequest(endpoint);

      // API returns single object for one ID, array for multiple
      const episodes = Array.isArray(data) ? data : [data];

      logger.info('Episodes fetched successfully', {
        requestedCount: episodeIds.length,
        fetchedCount: episodes.length,
      });

      return episodes;
    } catch (error) {
      logger.error('Failed to fetch episodes', {
        episodeCount: episodeUrls.length,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Fetch location details by URL
   * @param {string} locationUrl - Location URL
   * @returns {Promise<Object>} Location data
   */
  getLocationByUrl: async locationUrl => {
    if (!locationUrl || locationUrl === 'unknown') {
      return null;
    }

    try {
      // Extract location ID from URL
      const parts = locationUrl.split('/');
      const locationId = parts[parts.length - 1];

      const endpoint = `/location/${locationId}`;

      const data = await apiRequest(endpoint);

      logger.info('Location fetched successfully', {
        id: locationId,
        name: data.name,
      });

      return data;
    } catch (error) {
      logger.error('Failed to fetch location', {
        locationUrl,
        error: error.message,
      });
      // Don't throw for location errors, just return null
      return null;
    }
  },
};

export { ApiError, logger };
