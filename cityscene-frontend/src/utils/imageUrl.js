const BACKEND_URL = 'http://localhost:5000';

export const DEFAULT_PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';

/**
 * Ensures media URLs (local uploads, assets, or remote URLs) are resolved cleanly with fallbacks
 * @param {string} url - Media URL or path
 * @param {string} fallback - Optional fallback URL if url is empty
 * @returns {string} Fully resolved media URL
 */
export const getMediaUrl = (url, fallback = DEFAULT_PLACEHOLDER_IMAGE) => {
  if (!url) return fallback;
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith('/uploads')) {
    return `${BACKEND_URL}${trimmed}`;
  }
  if (trimmed.startsWith('uploads/')) {
    return `${BACKEND_URL}/${trimmed}`;
  }
  return trimmed;
};

/**
 * Image error handler helper for <img> elements
 */
export const handleImageError = (e, fallbackUrl = DEFAULT_PLACEHOLDER_IMAGE) => {
  if (e && e.target && e.target.src !== fallbackUrl) {
    e.target.onerror = null;
    e.target.src = fallbackUrl;
  }
};

export default getMediaUrl;
