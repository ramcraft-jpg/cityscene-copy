import { flashApiFetch } from '../config/api';

export const getClients = async () => {
  try {
    const res = await flashApiFetch('/clients');
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
  const res = await flashApiFetch('/clients', {
    method: 'POST',
    body: JSON.stringify(clientData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to create client.');
  }
  return data;
};

export const updateClient = async (id, clientData) => {
  const res = await flashApiFetch(`/clients/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(clientData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update client.');
  }
  return data;
};

export const deleteClient = async (id) => {
  const res = await flashApiFetch(`/clients/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete client.');
  }
  return data;
};
