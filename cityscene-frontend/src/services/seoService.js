import { flashApiFetch } from '../config/api';

/**
 * Fetch all SEO metadata configurations
 */
export const getAllSeoMeta = async (group = 'all', search = '') => {
  try {
    const params = new URLSearchParams();
    if (group && group !== 'all') params.append('group', group);
    if (search) params.append('search', search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await flashApiFetch(`/seo${queryString}`);
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
    const response = await flashApiFetch(`/seo/${encodedKey}`);
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
  try {
    const encodedKey = encodeURIComponent(pageKey);
    const response = await flashApiFetch(`/seo/${encodedKey}`, {
      method: 'PUT',
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
  try {
    const encodedKey = encodeURIComponent(pageKey);
    const response = await flashApiFetch(`/seo/${encodedKey}`, {
      method: 'DELETE'
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
