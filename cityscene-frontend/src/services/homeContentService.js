import { flashApiFetch } from '../config/api';

export const getHomeSectionContent = async (section) => {
  try {
    const response = await flashApiFetch(`/home-content/${section}`);
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || `Failed to fetch ${section} content`);
    }
    return data.content;
  } catch (error) {
    console.error(`Error fetching home section [${section}]:`, error);
    throw error;
  }
};

export const updateHomeSectionContent = async (section, content) => {
  try {
    const response = await flashApiFetch(`/home-content/${section}`, {
      method: 'PUT',
      body: JSON.stringify({ content })
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || `Failed to update ${section} content`);
    }
    return data;
  } catch (error) {
    console.error(`Error updating home section [${section}]:`, error);
    throw error;
  }
};

export const uploadHomeMedia = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await flashApiFetch('/home-content/upload-media', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Media upload failed');
    }
    return data.fileUrl;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};
