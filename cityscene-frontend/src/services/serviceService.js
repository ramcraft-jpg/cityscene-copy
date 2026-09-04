import { flashApiFetch } from '../config/api';
import staticServices from '../data/services';

export const getServices = async (includeAll = false) => {
  try {
    const endpoint = includeAll ? '/services?all=true' : '/services';
    const response = await flashApiFetch(endpoint);
    if (response.ok) {
      const json = await response.json();
      if (json.data) {
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
    const response = await flashApiFetch(`/services/${encodeURIComponent(cleanId)}`);
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
  const response = await flashApiFetch('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to create service.');
  }
  return data;
};

export const updateService = async (id, serviceData) => {
  const response = await flashApiFetch(`/services/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(serviceData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update service.');
  }
  return data;
};

export const deleteService = async (id) => {
  const response = await flashApiFetch(`/services/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete service.');
  }
  return data;
};
