import api from '../api';

export const adminService = {
  // Get model admin configuration
  getModelAdmin: async (appName, modelName) => {
    const response = await api.get(`/core/apps/${appName}/models/${modelName}/admin`);
    return response.data;
  },

  // Get model data with pagination, filtering, and search
  getModelData: async (appName, modelName, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/${appName}/${modelName}${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Get single model instance
  getModelInstance: async (appName, modelName, id) => {
    const response = await api.get(`/${appName}/${modelName}/${id}`);
    return response.data;
  },

  // Create model instance
  createModelInstance: async (appName, modelName, data) => {
    const response = await api.post(`/${appName}/${modelName}/`, data);
    return response.data;
  },

  // Update model instance
  updateModelInstance: async (appName, modelName, id, data) => {
    const response = await api.put(`/${appName}/${modelName}/${id}/`, data);
    return response.data;
  },

  // Patch model instance
  patchModelInstance: async (appName, modelName, id, data) => {
    const response = await api.patch(`/${appName}/${modelName}/${id}/`, data);
    return response.data;
  },

  // Delete model instance
  deleteModelInstance: async (appName, modelName, id) => {
    const response = await api.delete(`/${appName}/${modelName}/${id}/`);
    return response.data;
  }
};