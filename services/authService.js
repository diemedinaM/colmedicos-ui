import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/jwt/login', credentials);
    return response.data;
  },
  refresh: async (refreshToken) => {
    const response = await api.post('/auth/jwt/refresh', { refresh: refreshToken });
    return response.data;
  },
  sessionLogin: async (credentials) => {
    const response = await api.post('/auth/session/login', credentials);
    return response.data;
  },
  logout: async () => { 
    const response = await api.post('/auth/logout');
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  replaceProfile: async (profile) => {
    const response = await api.put('/auth/profile', profile);
    return response.data;
  },
  updateProfile: async (profile) => {
    const response = await api.patch('/auth/profile', profile);
    return response.data;
  },
  changePassword: async (password) => {
    const response = await api.post('/auth/change-password', password);
    return response.data;
  },
  getPermissions: async () => {
    const response = await api.get('/auth/permissions');
    return response.data;
  },
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};