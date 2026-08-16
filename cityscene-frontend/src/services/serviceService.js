import { getAdminToken } from './adminAuthService';

const API_BASE = 'http://localhost:5000/api';

export const getServices = async (includeAll = false) => {
  const url = includeAll ? `${API_BASE}/services?all=true` : `${API_BASE}/services`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Services API error: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data || [];
};

export const getServiceById = async (id) => {
  if (!id) return null;
  const response = await fetch(`${API_BASE}/services/${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error(`Service detail API error: ${response.statusText}`);
  }
  const json = await response.json();
  return json.data || null;
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
