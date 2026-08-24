import staticProjects from '../data/projects';
import staticClients from '../data/clients';
import { getAdminToken } from './adminAuthService';

const API_BASE = 'http://localhost:5000/api';

export const getProjects = async (includeAll = false) => {
  try {
    const url = includeAll ? `${API_BASE}/projects?all=true` : `${API_BASE}/projects`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (error) {
    console.warn('[Project Service] API unreachable, fallback to local dataset:', error.message);
  }
  return staticProjects;
};

export const getProjectBySlug = async (slug) => {
  if (!slug) return null;
  try {
    const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) return json.data;
    }
  } catch (error) {
    console.warn('[Project Service] API slug fetch failed, fallback to local:', error.message);
  }

  const found = staticProjects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  );
  return found || null;
};

export const getRelatedProjects = async (currentSlug, limit = 3) => {
  const allProjects = await getProjects();
  const current = allProjects.find(
    (p) => p.slug.toLowerCase() === currentSlug?.toLowerCase() || p.id === currentSlug
  );

  if (!current) return allProjects.slice(0, limit);

  const filtered = allProjects.filter((p) => p.id !== current.id && p.slug !== current.slug);
  const sameCategory = filtered.filter((p) => p.category === current.category);
  const otherCategory = filtered.filter((p) => p.category !== current.category);

  return [...sameCategory, ...otherCategory].slice(0, limit);
};

export const getClients = async () => {
  try {
    const res = await fetch(`${API_BASE}/projects/clients`);
    if (!res.ok) throw new Error('Failed to fetch clients from API');
    const json = await res.json();
    return json.data || staticClients;
  } catch (error) {
    console.warn('[Project Service] Clients API unreachable, fallback to local dataset:', error.message);
    return staticClients;
  }
};

export const createProject = async (projectData) => {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to create project.');
  }
  return data;
};

export const updateProject = async (id, projectData) => {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE}/projects/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to update project.');
  }
  return data;
};

export const deleteProject = async (id) => {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE}/projects/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to delete project.');
  }
  return data;
};
