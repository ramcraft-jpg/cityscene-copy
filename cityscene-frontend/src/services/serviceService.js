import { getAdminToken } from './adminAuthService';
import staticServices from '../data/services';

const API_BASE = 'http://localhost:5000/api';

export const getServices = async (includeAll = false) => {
  try {
    const url = includeAll ? `${API_BASE}/services?all=true` : `${API_BASE}/services`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      if (json.data && json.data.length > 0) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[Service API Warning]: Failed to fetch from backend API, using static fallback dataset:', err.message);
  }
  return staticServices;
};

export const getServiceById = async (id) => {
  if (!id) return null;
  const cleanId = id.trim().toLowerCase();

  try {
    const response = await fetch(`${API_BASE}/services/${encodeURIComponent(cleanId)}`);
    if (response.ok) {
      const json = await response.json();
      if (json.data) return json.data;
    }
  } catch (err) {
    console.warn(`[Service API Warning]: Failed to fetch service '${cleanId}', searching fallback dataset:`, err.message);
  }

  // Fallback to static services array
  const found = staticServices.find(
    (s) =>
      s.id.toLowerCase() === cleanId ||
      s.path.toLowerCase() === `/services/${cleanId}` ||
      (s.slug && s.slug.toLowerCase() === cleanId)
  );

  return found || null;
};

export const createService = async (serviceData) => {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to create service.');
  }
  return data;
};

export const updateService = async (id, serviceData) => {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE}/services/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update service.');
  }
  return data;
};

export const deleteService = async (id) => {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE}/services/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete service.');
  }
  return data;
};
