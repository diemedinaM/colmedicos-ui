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
    createEmployee: async (employee) => {
        const response = await api.post('/employees/employee', employee);
        return response.data;
    },
    updateEmployee: async (id, employee) => {
        const response = await api.put(`/employees/employee/${id}`, employee);
        return response.data;
    },
}