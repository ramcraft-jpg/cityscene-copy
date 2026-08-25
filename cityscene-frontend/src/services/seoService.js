import { getAdminToken } from './adminAuthService';

const API_BASE = 'http://localhost:5000/api/seo';

/**
 * Fetch all SEO metadata configurations
 */
export const getAllSeoMeta = async (group = 'all', search = '') => {
  try {
    const params = new URLSearchParams();
    if (group && group !== 'all') params.append('group', group);
    if (search) params.append('search', search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_BASE}${queryString}`);
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to fetch SEO settings');
    }
    return data.data;
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    throw error;
  }
};

/**
 * Fetch SEO metadata for a specific pageKey
 */
export const getSeoMetaByPageKey = async (pageKey) => {
  try {
    const encodedKey = encodeURIComponent(pageKey);
    const response = await fetch(`${API_BASE}/${encodedKey}`);
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || `Failed to fetch SEO settings for ${pageKey}`);
    }
    return data.data;
  } catch (error) {
    console.error(`Error fetching SEO for [${pageKey}]:`, error);
    throw error;
  }
};

/**
 * Update/Save SEO metadata for a specific pageKey
 */
export const updateSeoMeta = async (pageKey, seoData) => {
  const token = getAdminToken();
  try {
    const encodedKey = encodeURIComponent(pageKey);
    const response = await fetch(`${API_BASE}/${encodedKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(seoData)
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || `Failed to update SEO settings for ${pageKey}`);
    }
    return data.data;
  } catch (error) {
    console.error(`Error updating SEO for [${pageKey}]:`, error);
    throw error;
  }
};

/**
 * Reset/Delete SEO record for a pageKey
 */
export const resetSeoMeta = async (pageKey) => {
  const token = getAdminToken();
  try {
    const encodedKey = encodeURIComponent(pageKey);
    const response = await fetch(`${API_BASE}/${encodedKey}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || `Failed to reset SEO settings for ${pageKey}`);
    }
    return data;
  } catch (error) {
    console.error(`Error resetting SEO for [${pageKey}]:`, error);
    throw error;
  }
};
