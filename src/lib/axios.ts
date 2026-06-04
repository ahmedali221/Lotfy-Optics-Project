import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT: prefer customer token; fall back to admin token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customerToken') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401: try to refresh, then retry. On refresh failure: clear auth and go home.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('customerRefresh');
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/auth/refresh/`, { refresh });
          localStorage.setItem('customerToken', data.access);
          if (data.refresh) {
            localStorage.setItem('customerRefresh', data.refresh);
          }
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          localStorage.removeItem('customerToken');
          localStorage.removeItem('customerRefresh');
          localStorage.removeItem('customerUser');
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
