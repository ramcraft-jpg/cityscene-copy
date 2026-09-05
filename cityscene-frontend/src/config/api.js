/**
 * UNIVERSAL FLASH API CONFIGURATION & CLIENT
 * 
 * Provides centralized API endpoint resolution, authentication token injection,
 * media URL resolution, and environment validation.
 */

const isProd = import.meta.env.PROD || import.meta.env.MODE === 'production';

// Get the configured FLASH API URL from environment variables
const rawFlashApiUrl = import.meta.env.VITE_FLASH_API_URL;

/**
 * Resolves the full Flash API Base URL (e.g., "http://localhost:5000/api" or "https://api.domain.com/api")
 * @returns {string} Full base API URL ending with /api
 */
export const getFlashApiUrl = () => {
  if (rawFlashApiUrl && typeof rawFlashApiUrl === 'string' && rawFlashApiUrl.trim()) {
    let url = rawFlashApiUrl.trim().replace(/\/+$/, '');
    if (!url.endsWith('/api')) {
      url = `${url}/api`;
    }
    return url;
  }

  if (isProd) {
    return '/api';
  }

  // Development Fallback Only
  return 'http://localhost:5000/api';
};

/**
 * Resolves the root Backend Origin URL (e.g., "http://localhost:5000" or "https://api.domain.com")
 * Used for media and static upload asset resolution (/uploads/...)
 * @returns {string} Origin URL without trailing slash or /api suffix
 */
export const getFlashApiOrigin = () => {
  if (rawFlashApiUrl && typeof rawFlashApiUrl === 'string' && rawFlashApiUrl.trim()) {
    let url = rawFlashApiUrl.trim().replace(/\/+$/, '');
    if (url.endsWith('/api')) {
      url = url.substring(0, url.length - 4);
    }
    return url;
  }

  if (isProd) {
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin.replace(/\/+$/, '');
    }
    return '';
  }

  // Development Fallback Only
  return 'http://localhost:5000';
};

/**
 * Universal Flash API fetch client wrapper
 * Handles base URL prepending, auth headers, JSON parsing, and standard error handling.
 * 
 * @param {string} endpoint - API endpoint relative path (e.g. "/services", "/blogs", "/admin/login")
 * @param {Object} options - Standard fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} Native fetch response object
 */
export const flashApiFetch = async (endpoint, options = {}) => {
  try {
    const baseUrl = getFlashApiUrl();
    let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // Prevent double /api/api
    if (cleanEndpoint.startsWith('/api/')) {
      cleanEndpoint = cleanEndpoint.substring(4);
    }

    const targetUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${baseUrl}${cleanEndpoint}`;

    const headers = {
      ...(options.headers || {})
    };

    // Automatically attach admin token if available in localStorage
    const token = localStorage.getItem('cityscene_admin_token');
    if (token && !headers['Authorization'] && !headers['authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Set default Content-Type to application/json unless body is FormData or content-type is set
    if (!(options.body instanceof FormData) && !headers['Content-Type'] && !headers['content-type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(targetUrl, {
      ...options,
      headers
    });

    return response;
  } catch (error) {
    console.error(`[Flash API Request Error] (${endpoint}):`, error);
    throw new Error(
      error.message?.includes('Flash API Config Error')
        ? error.message
        : `Flash API Network Failure: ${error.message || 'Unable to connect to Flash API service.'}`
    );
  }
};

export default flashApiFetch;
