import api from './api';

export const employeesService = {
    getEmployees: async () => {
        const response = await api.get('/employees/employee');
        return response.data;
    },
    getEmployeeById: async (id) => {
        const response = await api.get(`/employees/employee/${id}`);
        return response.data;
    },
}