import { flashApiFetch } from '../config/api';

export const getJobs = async (all = false) => {
  const res = await flashApiFetch(`/jobs?all=${all}`);
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to fetch jobs.');
  }
  return json.data;
};

export const createJob = async (jobData) => {
  const res = await flashApiFetch('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to create job.');
  }
  return json.data;
};

export const updateJob = async (id, jobData) => {
  const res = await flashApiFetch(`/jobs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(jobData)
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to update job.');
  }
  return json.data;
};

export const deleteJob = async (id) => {
  const res = await flashApiFetch(`/jobs/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to delete job.');
  }
  return json;
};
