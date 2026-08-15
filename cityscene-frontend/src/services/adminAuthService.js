const API_BASE = 'http://localhost:5000/api/admin';

const TOKEN_KEY = 'cityscene_admin_token';
const USER_KEY = 'cityscene_admin_user';

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Invalid email or password.');
  }

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
  }

  return data;
};

export const registerAdmin = async (name, email, password) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Registration failed.');
  }

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
  }

  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAdminToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getAdminUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getAdminToken();
  return !!token;
};

export const verifySession = async () => {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      logoutAdmin();
      return false;
    }

    const data = await response.json();
    if (data.success && data.admin) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.admin));
      return true;
    } else {
      logoutAdmin();
      return false;
    }
  } catch (error) {
    console.error('[Verify Session Error]:', error);
    logoutAdmin();
    return false;
  }
};
