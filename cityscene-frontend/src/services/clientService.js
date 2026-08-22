import { getAdminToken } from './adminAuthService';

const API_BASE = 'http://localhost:5000/api/clients';

const getToken = () => {
  return getAdminToken() || 'admin-session-token';
};

export const getClients = async () => {
  try {
    const res = await fetch(API_BASE);
    const json = await res.json();
    if (res.ok && json.data) {
      return json.data;
    }
  } catch (error) {
    console.warn('[Client Service] API fetch error:', error.message);
  }
  return [];
};

export const createClient = async (clientData) => {
  const token = getToken();
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(clientData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create client.');
  }
  return data;
};

export const updateClient = async (id, clientData) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(clientData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update client.');
  }
  return data;
};

export const deleteClient = async (id) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete client.');
  }
  return data;
};
