import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const search = location.search;
      const params = new URLSearchParams(search);
      let token = params.get('token');
      if (token) {
        localStorage.setItem('authToken', token);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    // No sobrescribir Content-Type si es FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(location.search);
        const refreshToken = params.get('refresh');
        if (refreshToken) {
          authService.refresh(refreshToken);
        }
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout de la petición');
    }
    
    return Promise.reject(error);
  }
);

export default api; 