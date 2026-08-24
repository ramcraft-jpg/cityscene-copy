const BACKEND_URL = 'http://localhost:5000';

/**
 * Ensures media URLs starting with /uploads are converted to absolute URLs pointing to the backend Express server
 * @param {string} url - Media URL or path
 * @param {string} fallback - Optional fallback URL if url is empty
 * @returns {string} Fully resolved media URL
 */
export const getMediaUrl = (url, fallback = '') => {
  if (!url) return fallback;
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (trimmed.startsWith('/uploads')) {
    return `${BACKEND_URL}${trimmed}`;
  }
  return trimmed;
};

export default getMediaUrl;
