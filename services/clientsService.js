import api from './api';

export const clientsService = {
    getClient: async () => {
        const response = await api.get('/clients/client');
        return response.data;
    },
    createClient: async (client) => {
        try {
            const response = await api.post('/clients/client/', client);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    updateClient: async (id, client) => {
        const response = await api.put(`/clients/client/${id}`, client);
        return response.data;
    },
    getClientById: async (id) => {
        const response = await api.get(`/clients/client/${id}`);
        return response.data;
    },
    patchClient: async (id, client) => {
        const response = await api.patch(`/clients/client/${id}`, client);
        return response.data;
    },
    deleteClient: async (id) => {
        const response = await api.delete(`/clients/client/${id}`);
        return response.data;
    },
    getClientLegalRepresentative: async (id) => {
        const response = await api.get(`/clients/client/${id}/legal-representative`);
        return response.data;
    },
    createClientLegalRepresentative: async (id, legalRepresentative) => {
        const response = await api.post(`/clients/client/${id}/legal-representative`, legalRepresentative);
        return response.data;
    },
    updateClientLegalRepresentative: async (id, legalRepresentative) => {
        const response = await api.put(`/clients/client/${id}/legal-representative/${id}`, legalRepresentative);
        return response.data;
    },
    getClientLegalRepresentativeById: async (id) => {
        const response = await api.get(`/clients/client/${id}/legal-representative/${id}`);
        return response.data;
    },
    patchClientLegalRepresentative: async (id, legalRepresentative) => {
        const response = await api.patch(`/clients/client/${id}/legal-representative/${id}`, legalRepresentative);
        return response.data;
    },
    deleteClientLegalRepresentative: async (id) => {
        const response = await api.delete(`/clients/client/${id}/legal-representative/${id}`);
        return response.data;
    },
    getClientLegalCertifications: async (id) => {
        const response = await api.get(`/clients/client/${id}/legal-certifications`);
        return response.data;
    },
    createClientLegalCertifications: async (id, legalCertifications) => {
        const response = await api.post(`/clients/client/${id}/legal-certifications`, legalCertifications);
        return response.data;
    },
    updateClientLegalCertifications: async (id, legalCertifications) => {
        const response = await api.put(`/clients/client/${id}/legal-certifications/${id}`, legalCertifications);
        return response.data;
    },
    getClientLegalCertificationsById: async (id) => {
        const response = await api.get(`/clients/client/${id}/legal-certifications/${id}`);
        return response.data;
    },
    patchClientLegalCertifications: async (id, legalCertifications) => {
        const response = await api.patch(`/clients/client/${id}/legal-certifications/${id}`, legalCertifications);
        return response.data;
    },
    deleteClientLegalCertifications: async (id) => {
        const response = await api.delete(`/clients/client/${id}/legal-certifications/${id}`);
        return response.data;
    },
    getClientLegalCompanyContact: async (id) => {
        const response = await api.get(`/clients/client/${id}/legal-company-contact`);
        return response.data;
    },
    createClientLegalCompanyContact: async (id, legalCompanyContact) => {
        const response = await api.post(`/clients/client/${id}/legal-company-contact`, legalCompanyContact);
        return response.data;
    },
    updateClientLegalCompanyContact: async (id, legalCompanyContact) => {
        const response = await api.put(`/clients/client/${id}/legal-company-contact/${id}`, legalCompanyContact);
        return response.data;
    },
    getClientLegalCompanyContactById: async (id) => {
        const response = await api.get(`/clients/client/${id}/legal-company-contact/${id}`);
        return response.data;
    },
    patchClientLegalCompanyContact: async (id, legalCompanyContact) => {
        const response = await api.patch(`/clients/client/${id}/legal-company-contact/${id}`, legalCompanyContact);
        return response.data;
    },
    deleteClientLegalCompanyContact: async (id) => {
        const response = await api.delete(`/clients/client/${id}/legal-company-contact/${id}`);
        return response.data;
    },
    getClientContract: async (id) => {
        const response = await api.get(`/clients/contract`);
        return response.data;
    },
    createClientContract: async (id, contract) => {
        const response = await api.post(`/clients/contract`, contract);
        return response.data;
    },
    updateClientContract: async (id, contract) => {
        const response = await api.put(`/clients/contract/${id}`, contract);
        return response.data;
    },
    getClientContractById: async (id) => {
        const response = await api.get(`/clients/contract/${id}`);
        return response.data;
    },
    patchClientContract: async (id, contract) => {
        const response = await api.patch(`/clients/contract/${id}`, contract);
        return response.data;
    },
    deleteClientContract: async (id) => {
        const response = await api.delete(`/clients/contract/${id}`);
        return response.data;
    },
    getClientContractHistory: async (id) => {
        const response = await api.get(`/clients/client/${id}/contract-history`);
        return response.data;
    },
    getClientContractHistoryById: async (id) => {
        const response = await api.get(`/clients/client/${id}/contract-history/${id}`);
        return response.data;
    },
    getClientContractLegalContact: async (id) => {
        const response = await api.get(`/clients/contract/${id}/legal-contact`);
        return response.data;
    },
    createClientContractLegalContact: async (id, legalContact) => {
        const response = await api.post(`/clients/contract/${id}/legal-contact`, legalContact);
        return response.data;
    },
    updateClientContractLegalContact: async (id, legalContact) => {
        const response = await api.put(`/clients/contract/${id}/legal-contact/${id}`, legalContact);
        return response.data;
    },
    getClientContractLegalContactById: async (id) => {
        const response = await api.get(`/clients/contract/${id}/legal-contact/${id}`);
        return response.data;
    },
    patchClientContractLegalContact: async (id, legalContact) => {
        const response = await api.patch(`/clients/contract/${id}/legal-contact/${id}`, legalContact);
        return response.data;
    },
    deleteClientContractLegalContact: async (id) => {
        const response = await api.delete(`/clients/contract/${id}/legal-contact/${id}`);
        return response.data;
    },
    getClientContractSpecificPenalty: async (id) => {
        const response = await api.get(`/clients/contract/${id}/specific-penalty`);
        return response.data;
    },
    createClientContractSpecificPenalty: async (id, specificPenalty) => {
        const response = await api.post(`/clients/contract/${id}/specific-penalty`, specificPenalty);
        return response.data;
    },
    updateClientContractSpecificPenalty: async (id, specificPenalty) => {
        const response = await api.put(`/clients/contract/${id}/specific-penalty/${id}`, specificPenalty);
        return response.data;
    },
    getClientContractSpecificPenaltyById: async (id) => {
        const response = await api.get(`/clients/contract/${id}/specific-penalty/${id}`);
        return response.data;
    },
    patchClientContractSpecificPenalty: async (id, specificPenalty) => {
        const response = await api.patch(`/clients/contract/${id}/specific-penalty/${id}`, specificPenalty);
        return response.data;
    },
    deleteClientContractSpecificPenalty: async (id) => {
        const response = await api.delete(`/clients/contract/${id}/specific-penalty/${id}`);
        return response.data;
    },
    getClientPolicy: async () => {
        const response = await api.get(`/clients/policy`);
        return response.data;
    },
    createClientPolicy: async (policy) => {
        const response = await api.post(`/clients/policy`, policy);
        return response.data;
    },
    getClientPolicyById: async (id) => {
        const response = await api.get(`/clients/policy/${id}`);
        return response.data;
    },
    patchClientPolicy: async (id, policy) => {
        const response = await api.patch(`/clients/policy/${id}`, policy);
        return response.data;
    },
    updateClientPolicy: async (id, policy) => {
        const response = await api.put(`/clients/policy/${id}`, policy);
        return response.data;
    },
    getClientPolicyHistory: async () => {
        const response = await api.get(`/clients/policy-history`);
        return response.data;
    },
    getClientPolicyHistoryById: async (id) => {
        const response = await api.get(`/clients/policy-history/${id}`);
        return response.data;
    }
}