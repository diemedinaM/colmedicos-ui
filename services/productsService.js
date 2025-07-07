import api from './api';

export const productsService = {
    getProduct: async () => {
        const response = await api.get('/products/product');
        return response.data;
    },
    getProductById: async (id) => {
        const response = await api.get(`/products/product/${id}`);
        return response.data;
    },
}