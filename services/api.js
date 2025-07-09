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
      let token = params.get('token') || localStorage.getItem('authToken');
      let refreshToken = params.get('refresh') || localStorage.getItem('refreshToken');
      if (token) {
        localStorage.setItem('authToken', token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
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
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 403 && !originalRequest._retry) {
      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            originalRequest._retry = true;
            
            // Hacer refresh del token
            const refreshResponse = await authService.refresh(refreshToken);
            
            // Actualizar el token en el header de la petición original
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.access}`;
            
            // Reintentar la petición original
            return api(originalRequest);
          } catch (refreshError) {
            console.error('Error al hacer refresh del token:', refreshError);
            // Si el refresh falla, redirigir al login
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
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