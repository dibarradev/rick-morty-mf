/**
 * API service for fetching Rick and Morty characters data
 * Handles all API communication with proper error handling and logging
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
    console.log(`[CHARACTERS API] ${message}`, data);
  },
  error: (message, error = {}) => {
    console.error(`[CHARACTERS API ERROR] ${message}`, error);
  },
  warn: (message, data = {}) => {
    console.warn(`[CHARACTERS API WARNING] ${message}`, data);
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
 * Characters API service
 */
export const charactersApi = {
  /**
   * Fetch characters with optional filters and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {string} params.name - Filter by name
   * @param {string} params.status - Filter by status (alive, dead, unknown)
   * @param {string} params.species - Filter by species
   * @returns {Promise<Object>} Characters data with pagination info
   */
  getCharacters: async (params = {}) => {
    const searchParams = new URLSearchParams();

    // Add valid parameters to the query
    Object.entries(params).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        searchParams.append(key, value.toString().trim());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/character${queryString ? `?${queryString}` : ''}`;

    try {
      const data = await apiRequest(endpoint);

      logger.info('Characters fetched successfully', {
        count: data.results?.length || 0,
        totalPages: data.info?.pages || 0,
        filters: params,
      });

      return data;
    } catch (error) {
      logger.error('Failed to fetch characters', {
        params,
        error: error.message,
      });
      throw error;
    }
  },

  /**
   * Fetch a single character by ID
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

      logger.info('Character fetched successfully', { id, name: data.name });

      return data;
    } catch (error) {
      logger.error('Failed to fetch character', { id, error: error.message });
      throw error;
    }
  },

  /**
   * Fetch multiple characters by IDs
   * @param {Array<string|number>} ids - Array of character IDs
   * @returns {Promise<Array<Object>>} Array of character data
   */
  getCharactersByIds: async ids => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new ApiError(
        'Character IDs array is required',
        400,
        '/character/:ids'
      );
    }

    const idsString = ids.join(',');
    const endpoint = `/character/${idsString}`;

    try {
      const data = await apiRequest(endpoint);

      // API returns single object for one ID, array for multiple
      const characters = Array.isArray(data) ? data : [data];

      logger.info('Characters fetched successfully', {
        requestedCount: ids.length,
        fetchedCount: characters.length,
      });

      return characters;
    } catch (error) {
      logger.error('Failed to fetch characters by IDs', {
        ids,
        error: error.message,
      });
      throw error;
    }
  },
};

export { ApiError, logger };
