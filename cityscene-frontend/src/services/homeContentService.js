import { getAdminToken } from './adminAuthService';

const API_BASE = 'http://localhost:5000/api/home-content';

export const getHomeSectionContent = async (section) => {
  try {
    const response = await fetch(`${API_BASE}/${section}`);
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
  const token = getAdminToken();
  try {
    const response = await fetch(`${API_BASE}/${section}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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
  const token = getAdminToken();
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE}/upload-media`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
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
