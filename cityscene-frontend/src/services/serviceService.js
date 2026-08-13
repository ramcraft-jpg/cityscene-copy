const API_BASE = 'http://localhost:5000/api';

export const getServices = async () => {
  const response = await fetch(`${API_BASE}/services`);
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
