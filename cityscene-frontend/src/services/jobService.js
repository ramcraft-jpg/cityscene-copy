import { getAdminToken } from './adminAuthService';

const API_URL = 'http://localhost:5000/api/jobs';

export const getJobs = async (all = false) => {
  const res = await fetch(`${API_URL}?all=${all}`);
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch jobs.');
  }
  return json.data;
};

export const createJob = async (jobData) => {
  const token = getAdminToken();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to create job.');
  }
  return json.data;
};

export const updateJob = async (id, jobData) => {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update job.');
  }
  return json.data;
};

export const deleteJob = async (id) => {
  const token = getAdminToken();
  const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete job.');
  }
  return json;
};
