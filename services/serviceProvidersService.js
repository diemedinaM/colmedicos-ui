import api from './api';

export const serviceProvidersService = {
    getServiceProvider: async () => {
        const response = await api.get('/service-providers/service-provider');
        return response.data;
    },
    getServiceProviderById: async (id) => {
        const response = await api.get(`/service-providers/service-provider/${id}`);
        return response.data;
    },
    getServiceProviderByCity: async () => {
        const response = await api.get(`/service-providers/service-provider/city/`);
        return response.data;
    },
    createServiceProvider: async (serviceProvider) => {
        const response = await api.post('/service-providers/service-provider/city/', serviceProvider);
        return response.data;
    },
    updateServiceProvider: async (id, serviceProvider) => {
        const response = await api.put(`/service-providers/service-provider/city/${id}`, serviceProvider);
        return response.data;
    },
    getServiceProviderByCityById: async (id) => {
        const response = await api.get(`/service-providers/service-provider/city/${id}`);
        return response.data;
    },
    patchServiceProvider: async (id, serviceProvider) => {
        const response = await api.patch(`/service-providers/service-provider/city/${id}`, serviceProvider);
        return response.data;
    },
    deleteServiceProvider: async (id) => {
        const response = await api.delete(`/service-providers/service-provider/city/${id}`);
        return response.data;
    }
}