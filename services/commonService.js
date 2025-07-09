import api from './api';

export const commonService = {
    getArl: async () => {
        const response = await api.get('/common/arl');
        return response.data;
    },
    createArl: async (arl) => {
        const response = await api.post('/common/arl', arl);
        return response.data;
    },
    updateArl: async (id, arl) => {
        const response = await api.patch(`/common/arl/${id}`, arl);
        return response.data;
    },
    getArlById: async (id) => {
        const response = await api.get(`/common/arl/${id}`);
        return response.data;
    },
    deleteArl: async (id) => {
        const response = await api.delete(`/common/arl/${id}`);
        return response.data;
    },
    putArl: async (id, arl) => {
        const response = await api.put(`/common/arl/${id}`, arl);
        return response.data;
    },
    getBonusType: async () => {
        const response = await api.get('/common/bonus-type');
        return response.data;
    },
    createBonusType: async (bonusType) => {
        const response = await api.post('/common/bonus-type', bonusType);
        return response.data;
    },
    updateBonusType: async (id, bonusType) => {
        const response = await api.patch(`/common/bonus-type/${id}`, bonusType);
        return response.data;
    },
    getBonusTypeById: async (id) => {
        const response = await api.get(`/common/bonus-type/${id}`);
        return response.data;
    },
    deleteBonusType: async (id) => {
        const response = await api.delete(`/common/bonus-type/${id}`);
        return response.data;
    },
    putBonusType: async (id, bonusType) => {
        const response = await api.put(`/common/bonus-type/${id}`, bonusType);
        return response.data;
    },
    getBusinessStructure: async () => {
    const response = await api.get('/common/business-structure');
        return response.data;
    },
    createBusinessStructure: async (businessStructure) => {
        const response = await api.post('/common/business-structure', businessStructure);
        return response.data;
    },
    updateBusinessStructure: async (id, businessStructure) => {
        const response = await api.patch(`/common/business-structure/${id}`, businessStructure);
        return response.data;
    },
    getBusinessStructureById: async (id) => {
        const response = await api.get(`/common/business-structure/${id}`);
        return response.data;
    },
    deleteBusinessStructure: async (id) => {
        const response = await api.delete(`/common/business-structure/${id}`);
        return response.data;
    },
    putBusinessStructure: async (id, businessStructure) => {
        const response = await api.put(`/common/business-structure/${id}`, businessStructure);
        return response.data;
    },
    getCity: async () => {
        const response = await api.get('/common/city');
        return response.data;
    },
    createCity: async (city) => {
        const response = await api.post('/common/city', city);
        return response.data;
    },
    updateCity: async (id, city) => {
        const response = await api.patch(`/common/city/${id}`, city);
        return response.data;
    },
    getCityById: async (id) => {
        const response = await api.get(`/common/city/${id}`);
        return response.data;
    },
    deleteCity: async (id) => {
        const response = await api.delete(`/common/city/${id}`);
        return response.data;
    },
    putCity: async (id, city) => {
        const response = await api.put(`/common/city/${id}`, city);
        return response.data;
    },
    getCityZone: async () => {
        const response = await api.get('/common/city-zone');
        return response.data;
    },
    createCityZone: async (cityZone) => {
        const response = await api.post('/common/city-zone', cityZone);
        return response.data;
    },
    updateCityZone: async (id, cityZone) => {   
        const response = await api.patch(`/common/city-zone/${id}`, cityZone);
        return response.data;
    },
    getCityZoneById: async (id) => {
        const response = await api.get(`/common/city-zone/${id}`);
        return response.data;
    },
    deleteCityZone: async (id) => {
        const response = await api.delete(`/common/city-zone/${id}`);
        return response.data;
    },
    putCityZone: async (id, cityZone) => {
        const response = await api.put(`/common/city-zone/${id}`, cityZone);
        return response.data;
    },
    getCompanyGroup: async () => {
        const response = await api.get('/common/company-group');
        return response.data;
    },
    createCompanyGroup: async (companyGroup) => {
        const response = await api.post('/common/company-group', companyGroup);
        return response.data;
    },
    updateCompanyGroup: async (id, companyGroup) => {
        const response = await api.patch(`/common/company-group/${id}`, companyGroup);
        return response.data;
    },
    getCompanyGroupById: async (id) => {
        const response = await api.get(`/common/company-group/${id}`);
        return response.data;
    },
    deleteCompanyGroup: async (id) => {
        const response = await api.delete(`/common/company-group/${id}`);
        return response.data;
    },
    putCompanyGroup: async (id, companyGroup) => {
        const response = await api.put(`/common/company-group/${id}`, companyGroup);
        return response.data;
    },
    getCompanyType: async () => {
        const response = await api.get('/common/company-type');
        return response.data;
    },
    createCompanyType: async (companyType) => {
        const response = await api.post('/common/company-type', companyType);
        return response.data;
    },
    updateCompanyType: async (id, companyType) => {
        const response = await api.patch(`/common/company-type/${id}`, companyType);
        return response.data;
    },
    getCompanyTypeById: async (id) => {
        const response = await api.get(`/common/company-type/${id}`);
        return response.data;
    },
    deleteCompanyType: async (id) => {
        const response = await api.delete(`/common/company-type/${id}`);
        return response.data;
    },
    putCompanyType: async (id, companyType) => {
        const response = await api.put(`/common/company-type/${id}`, companyType);
        return response.data;
    },
    getCountry: async () => {
        const response = await api.get('/common/country');
        return response.data;
    },
    createCountry: async (country) => {
        const response = await api.post('/common/country', country);
        return response.data;
    },
    updateCountry: async (id, country) => {
        const response = await api.patch(`/common/country/${id}`, country);
        return response.data;
    },
    getCountryById: async (id) => {
        const response = await api.get(`/common/country/${id}`);
        return response.data;
    },
    deleteCountry: async (id) => {
        const response = await api.delete(`/common/country/${id}`);
        return response.data;
    },
    putCountry: async (id, country) => {
        const response = await api.put(`/common/country/${id}`, country);
        return response.data;
    },
    getCurrency: async () => {
        const response = await api.get('/common/currency');
        return response.data;
    },
    createCurrency: async (currency) => {
        const response = await api.post('/common/currency', currency);
        return response.data;
    },
    updateCurrency: async (id, currency) => {
        const response = await api.patch(`/common/currency/${id}`, currency);
        return response.data;
    },
    getCurrencyById: async (id) => {
        const response = await api.get(`/common/currency/${id}`);
        return response.data;
    },
    deleteCurrency: async (id) => {
        const response = await api.delete(`/common/currency/${id}`);
        return response.data;
    },
    putCurrency: async (id, currency) => {
        const response = await api.put(`/common/currency/${id}`, currency);
        return response.data;
    },
    getDocumentType: async () => {
        const response = await api.get('/common/document-type');
        return response.data;
    },
    createDocumentType: async (documentType) => {
        const response = await api.post('/common/document-type', documentType);
        return response.data;
    },
    updateDocumentType: async (id, documentType) => {
        const response = await api.patch(`/common/document-type/${id}`, documentType);
        return response.data;
    },
    getDocumentTypeById: async (id) => {
        const response = await api.get(`/common/document-type/${id}`);
        return response.data;
    },
    deleteDocumentType: async (id) => {
        const response = await api.delete(`/common/document-type/${id}`);
        return response.data;
    },
    putDocumentType: async (id, documentType) => {
        const response = await api.put(`/common/document-type/${id}`, documentType);
        return response.data;
    },
    getEconomicActivity: async () => {
        const response = await api.get('/common/economic-activity');
        return response.data;
    },
    createEconomicActivity: async (economicActivity) => {
        const response = await api.post('/common/economic-activity', economicActivity);
        return response.data;
    },
    updateEconomicActivity: async (id, economicActivity) => {
        const response = await api.patch(`/common/economic-activity/${id}`, economicActivity);
        return response.data;
    },
    getEconomicActivityById: async (id) => {
        const response = await api.get(`/common/economic-activity/${id}`);
        return response.data;
    },
    deleteEconomicActivity: async (id) => {
        const response = await api.delete(`/common/economic-activity/${id}`);
        return response.data;
    },
    putEconomicActivity: async (id, economicActivity) => {
        const response = await api.put(`/common/economic-activity/${id}`, economicActivity);
        return response.data;
    },
    getElectronicDocumentType: async () => {
        const response = await api.get('/common/electronic-document-type');
        return response.data;
    },
    createElectronicDocumentType: async (electronicDocumentType) => {
        const response = await api.post('/common/electronic-document-type', electronicDocumentType);
        return response.data;
    },
    updateElectronicDocumentType: async (id, electronicDocumentType) => {
        const response = await api.patch(`/common/electronic-document-type/${id}`, electronicDocumentType);
        return response.data;
    },
    getElectronicDocumentTypeById: async (id) => {
        const response = await api.get(`/common/electronic-document-type/${id}`);
        return response.data;
    },
    deleteElectronicDocumentType: async (id) => {
        const response = await api.delete(`/common/electronic-document-type/${id}`);
        return response.data;
    },
    putElectronicDocumentType: async (id, electronicDocumentType) => {
        const response = await api.put(`/common/electronic-document-type/${id}`, electronicDocumentType);
        return response.data;
    },
    getEmail: async () => {
        const response = await api.get('/common/email');
        return response.data;
    },
    createEmail: async (email) => {
        const response = await api.post('/common/email', email);
        return response.data;
    },
    updateEmail: async (id, email) => {
        const response = await api.patch(`/common/email/${id}`, email);
        return response.data;
    },
    getEmailById: async (id) => {
        const response = await api.get(`/common/email/${id}`);
        return response.data;
    },
    deleteEmail: async (id) => {
        const response = await api.delete(`/common/email/${id}`);
        return response.data;
    },
    putEmail: async (id, email) => {
        const response = await api.put(`/common/email/${id}`, email);
        return response.data;
    },
    getEmailType: async () => {
        const response = await api.get('/common/email-type');
        return response.data;
    },
    createEmailType: async (emailType) => {
        const response = await api.post('/common/email-type', emailType);
        return response.data;
    },
    updateEmailType: async (id, emailType) => {
        const response = await api.patch(`/common/email-type/${id}`, emailType);
        return response.data;
    },
    getEmailTypeById: async (id) => {
        const response = await api.get(`/common/email-type/${id}`);
        return response.data;
    },
    deleteEmailType: async (id) => {
        const response = await api.delete(`/common/email-type/${id}`);
        return response.data;
    },
    putEmailType: async (id, emailType) => {
        const response = await api.put(`/common/email-type/${id}`, emailType);
        return response.data;
    },
    getGroup: async () => {
        const response = await api.get('/common/group');
        return response.data;
    },
    createGroup: async (group) => {
        const response = await api.post('/common/group', group);
        return response.data;
    },
    updateGroup: async (id, group) => {
        const response = await api.patch(`/common/group/${id}`, group);
        return response.data;
    },
    getGroupById: async (id) => {
        const response = await api.get(`/common/group/${id}`);
        return response.data;
    },
    deleteGroup: async (id) => {
        const response = await api.delete(`/common/group/${id}`);
        return response.data;
    },
    putGroup: async (id, group) => {
        const response = await api.put(`/common/group/${id}`, group);
        return response.data;
    },
    getInsuranceProvider: async () => {
        const response = await api.get('/common/insurance-provider');
        return response.data;
    },
    createInsuranceProvider: async (insuranceProvider) => {
        const response = await api.post('/common/insurance-provider', insuranceProvider);
        return response.data;
    },
    updateInsuranceProvider: async (id, insuranceProvider) => {
        const response = await api.patch(`/common/insurance-provider/${id}`, insuranceProvider);
        return response.data;
    },
    getInsuranceProviderById: async (id) => {
        const response = await api.get(`/common/insurance-provider/${id}`);
        return response.data;
    },
    deleteInsuranceProvider: async (id) => {
        const response = await api.delete(`/common/insurance-provider/${id}`);
        return response.data;
    },
    putInsuranceProvider: async (id, insuranceProvider) => {
        const response = await api.put(`/common/insurance-provider/${id}`, insuranceProvider);
        return response.data;
    },
    getInsuranceBroker: async () => {
        const response = await api.get('/common/insurance-broker');
        return response.data;
    },
    createInsuranceBroker: async (insuranceBroker) => {
        const response = await api.post('/common/insurance-broker', insuranceBroker);
        return response.data;
    },
    updateInsuranceBroker: async (id, insuranceBroker) => {
        const response = await api.patch(`/common/insurance-broker/${id}`, insuranceBroker);
        return response.data;
    },
    getInsuranceBrokerById: async (id) => {
        const response = await api.get(`/common/insurance-broker/${id}`);
        return response.data;
    },
    deleteInsuranceBroker: async (id) => {
        const response = await api.delete(`/common/insurance-broker/${id}`);
        return response.data;
    },
    putInsuranceBroker: async (id, insuranceBroker) => {
        const response = await api.put(`/common/insurance-broker/${id}`, insuranceBroker);
        return response.data;
    },
    getIps: async () => {
        const response = await api.get('/common/ips');
        return response.data;
    },
    createIps: async (ips) => {
        const response = await api.post('/common/ips', ips);
        return response.data;
    },
    updateIps: async (id, ips) => {
        const response = await api.patch(`/common/ips/${id}`, ips);
        return response.data;
    },
    getIpsById: async (id) => {
        const response = await api.get(`/common/ips/${id}`);
        return response.data;
    },
    deleteIps: async (id) => {
        const response = await api.delete(`/common/ips/${id}`);
        return response.data;
    },
    putIps: async (id, ips) => {
        const response = await api.put(`/common/ips/${id}`, ips);
        return response.data;
    },
    getJobTitle: async () => {
        const response = await api.get('/common/job-title');
        return response.data;
    },
    createJobTitle: async (jobTitle) => {
        const response = await api.post('/common/job-title', jobTitle);
        return response.data;
    },
    updateJobTitle: async (id, jobTitle) => {
        const response = await api.patch(`/common/job-title/${id}`, jobTitle);
        return response.data;
    },
    getJobTitleById: async (id) => {
        const response = await api.get(`/common/job-title/${id}`);
        return response.data;
    },
    deleteJobTitle: async (id) => {
        const response = await api.delete(`/common/job-title/${id}`);
        return response.data;
    },
    putJobTitle: async (id, jobTitle) => {
        const response = await api.put(`/common/job-title/${id}`, jobTitle);
        return response.data;
    },
    getLegalRepresentativeType: async () => {
        const response = await api.get('/common/legal-representative-type');
        return response.data;
    },
    createLegalRepresentativeType: async (legalRepresentativeType) => {
        const response = await api.post('/common/legal-representative-type', legalRepresentativeType);
        return response.data;
    },
    updateLegalRepresentativeType: async (id, legalRepresentativeType) => {
        const response = await api.patch(`/common/legal-representative-type/${id}`, legalRepresentativeType);
        return response.data;
    },
    getLegalRepresentativeTypeById: async (id) => {
        const response = await api.get(`/common/legal-representative-type/${id}`);
        return response.data;
    },
    deleteLegalRepresentativeType: async (id) => {
        const response = await api.delete(`/common/legal-representative-type/${id}`);
        return response.data;
    },
    putLegalRepresentativeType: async (id, legalRepresentativeType) => {
        const response = await api.put(`/common/legal-representative-type/${id}`, legalRepresentativeType);
        return response.data;
    },
    getNationalTaxOffice: async () => {
        const response = await api.get('/common/national-tax-office');
        return response.data;
    },
    createNationalTaxOffice: async (nationalTaxOffice) => {
        const response = await api.post('/common/national-tax-office', nationalTaxOffice);
        return response.data;
    },

    updateNationalTaxOffice: async (id, nationalTaxOffice) => {
        const response = await api.patch(`/common/national-tax-office/${id}`, nationalTaxOffice);
        return response.data;
    },
    getNationalTaxOfficeById: async (id) => {
        const response = await api.get(`/common/national-tax-office/${id}`);
        return response.data;
    },

    deleteNationalTaxOffice: async (id) => {
        const response = await api.delete(`/common/national-tax-office/${id}`);
        return response.data;
    },
    putNationalTaxOffice: async (id, nationalTaxOffice) => {
        const response = await api.put(`/common/national-tax-office/${id}`, nationalTaxOffice);
        return response.data;
    },
    getNoveltyType: async () => {
        const response = await api.get('/common/novelty-type');
        return response.data;
    },
    createNoveltyType: async (noveltyType) => {
        const response = await api.post('/common/novelty-type', noveltyType);
        return response.data;
    },
    updateNoveltyType: async (id, noveltyType) => {
        const response = await api.patch(`/common/novelty-type/${id}`, noveltyType);
        return response.data;
    },
    getNoveltyTypeById: async (id) => {
        const response = await api.get(`/common/novelty-type/${id}`);
        return response.data;
    },
    deleteNoveltyType: async (id) => {
        const response = await api.delete(`/common/novelty-type/${id}`);
        return response.data;
    },
    putNoveltyType: async (id, noveltyType) => {
        const response = await api.put(`/common/novelty-type/${id}`, noveltyType);
        return response.data;
    },
    getPenalty: async () => {
        const response = await api.get('/common/penalty');
        return response.data;
    },
    createPenalty: async (penalty) => {
        const response = await api.post('/common/penalty', penalty);
        return response.data;
    },
    updatePenalty: async (id, penalty) => {
        const response = await api.patch(`/common/penalty/${id}`, penalty);
        return response.data;
    },
    getPenaltyById: async (id) => {
        const response = await api.get(`/common/penalty/${id}`);
        return response.data;
    },
    deletePenalty: async (id) => {
        const response = await api.delete(`/common/penalty/${id}`);
        return response.data;
    },
    putPenalty: async (id, penalty) => {
        const response = await api.put(`/common/penalty/${id}`, penalty);
        return response.data;
    },
    getPet: async () => {
        const response = await api.get('/common/pet');
        return response.data;
    },
    createPet: async (pet) => {
        const response = await api.post('/common/pet', pet);
        return response.data;
    },
    updatePet: async (id, pet) => {
        const response = await api.patch(`/common/pet/${id}`, pet);
        return response.data;
    },
    getPetById: async (id) => {
        const response = await api.get(`/common/pet/${id}`);
        return response.data;
    },
    deletePet: async (id) => {
        const response = await api.delete(`/common/pet/${id}`);
        return response.data;
    },
    putPet: async (id, pet) => {
        const response = await api.put(`/common/pet/${id}`, pet);
        return response.data;
    },
    getPolicyType: async () => {
        const response = await api.get('/common/policy-type');
        return response.data;
    },
    createPolicyType: async (policyType) => {
        const response = await api.post('/common/policy-type', policyType);
        return response.data;
    },
    updatePolicyType: async (id, policyType) => {
        const response = await api.patch(`/common/policy-type/${id}`, policyType);
        return response.data;
    },
    getPolicyTypeById: async (id) => {
        const response = await api.get(`/common/policy-type/${id}`);
        return response.data;
    },
    deletePolicyType: async (id) => {
        const response = await api.delete(`/common/policy-type/${id}`);
        return response.data;
    },
    putPolicyType: async (id, policyType) => {
        const response = await api.put(`/common/policy-type/${id}`, policyType);
        return response.data;
    },
    getProvince: async () => {
        const response = await api.get('/common/province');
        return response.data;
    },
    createProvince: async (province) => {
        const response = await api.post('/common/province', province);
        return response.data;
    },
    updateProvince: async (id, province) => {
        const response = await api.patch(`/common/province/${id}`, province);
        return response.data;
    },
    getProvinceById: async (id) => {
        const response = await api.get(`/common/province/${id}`);
        return response.data;
    },
    deleteProvince: async (id) => {
        const response = await api.delete(`/common/province/${id}`);
        return response.data;
    },
    putProvince: async (id, province) => {
        const response = await api.put(`/common/province/${id}`, province);
        return response.data;
    },
    getRelationship: async () => {
        const response = await api.get('/common/relationship');
        return response.data;
    },
    createRelationship: async (relationship) => {
        const response = await api.post('/common/relationship', relationship);
        return response.data;
    },
    updateRelationship: async (id, relationship) => {
        const response = await api.patch(`/common/relationship/${id}`, relationship);
        return response.data;
    },
    getRelationshipById: async (id) => {
        const response = await api.get(`/common/relationship/${id}`);
        return response.data;
    },
    deleteRelationship: async (id) => {
        const response = await api.delete(`/common/relationship/${id}`);
        return response.data;
    },
    putRelationship: async (id, relationship) => {
        const response = await api.put(`/common/relationship/${id}`, relationship);
        return response.data;
    },
    getResolutionType: async () => {
        const response = await api.get('/common/resolution-type');
        return response.data;
    },
    createResolutionType: async (resolutionType) => {
        const response = await api.post('/common/resolution-type', resolutionType);
        return response.data;
    },
    updateResolutionType: async (id, resolutionType) => {
        const response = await api.patch(`/common/resolution-type/${id}`, resolutionType);
        return response.data;
    },
    getResolutionTypeById: async (id) => {
        const response = await api.get(`/common/resolution-type/${id}`);
        return response.data;
    },
    deleteResolutionType: async (id) => {
        const response = await api.delete(`/common/resolution-type/${id}`);
        return response.data;
    },
    putResolutionType: async (id, resolutionType) => {
        const response = await api.put(`/common/resolution-type/${id}`, resolutionType);
        return response.data;
    },
    getSector: async () => {
        const response = await api.get('/common/sector');
        return response.data;
    },
    createSector: async (sector) => {
        const response = await api.post('/common/sector', sector);
        return response.data;
    },
    updateSector: async (id, sector) => {
        const response = await api.patch(`/common/sector/${id}`, sector);
        return response.data;
    },
    getSectorById: async (id) => {
        const response = await api.get(`/common/sector/${id}`);
        return response.data;
    },
    deleteSector: async (id) => {
        const response = await api.delete(`/common/sector/${id}`);
        return response.data;
    },
    putSector: async (id, sector) => {
        const response = await api.put(`/common/sector/${id}`, sector);
        return response.data;
    },
    getSectionalOffice: async () => {
        const response = await api.get('/common/sectional-office');
        return response.data;
    },
    createSectionalOffice: async (sectionalOffice) => {
        const response = await api.post('/common/sectional-office', sectionalOffice);
        return response.data;
    },
    updateSectionalOffice: async (id, sectionalOffice) => {
        const response = await api.patch(`/common/sectional-office/${id}`, sectionalOffice);
        return response.data;
    },
    getSectionalOfficeById: async (id) => {
        const response = await api.get(`/common/sectional-office/${id}`);
        return response.data;
    },
    deleteSectionalOffice: async (id) => {
        const response = await api.delete(`/common/sectional-office/${id}`);
        return response.data;
    },
    putSectionalOffice: async (id, sectionalOffice) => {
        const response = await api.put(`/common/sectional-office/${id}`, sectionalOffice);
        return response.data;
    },
    getTaxLiability: async () => {
        const response = await api.get('/common/tax-liability');
        return response.data;
    },
    createTaxLiability: async (taxLiability) => {
        const response = await api.post('/common/tax-liability', taxLiability);
        return response.data;
    },


    updateTaxLiability: async (id, taxLiability) => {
        const response = await api.patch(`/common/tax-liability/${id}`, taxLiability);
        return response.data;
    },
    getTaxLiabilityById: async (id) => {
        const response = await api.get(`/common/tax-liability/${id}`);
        return response.data;
    },

    deleteTaxLiability: async (id) => {
        const response = await api.delete(`/common/tax-liability/${id}`);
        return response.data;
    },
    putTaxLiability: async (id, taxLiability) => {
        const response = await api.put(`/common/tax-liability/${id}`, taxLiability);
        return response.data;
    },
    getTaxpayerType: async () => {
        const response = await api.get('/common/taxpayer-type');
        return response.data;
    },
    createTaxpayerType: async (taxpayerType) => {
        const response = await api.post('/common/taxpayer-type', taxpayerType);
        return response.data;
    },
    updateTaxpayerType: async (id, taxpayerType) => {
        const response = await api.patch(`/common/taxpayer-type/${id}`, taxpayerType);
        return response.data;
    },
    getTaxpayerTypeById: async (id) => {
        const response = await api.get(`/common/taxpayer-type/${id}`);
        return response.data;
    },
    deleteTaxpayerType: async (id) => {
        const response = await api.delete(`/common/taxpayer-type/${id}`);
        return response.data;
    },
    putTaxpayerType: async (id, taxpayerType) => {
        const response = await api.put(`/common/taxpayer-type/${id}`, taxpayerType);
        return response.data;
    },
    getTemplate: async () => {
        const response = await api.get('/common/template');
        return response.data;
    },
    createTemplate: async (template) => {
        const response = await api.post('/common/template', template);
        return response.data;
    },
    updateTemplate: async (id, template) => {
        const response = await api.patch(`/common/template/${id}`, template);
        return response.data;
    },
    getTemplateById: async (id) => {
        const response = await api.get(`/common/template/${id}`);
        return response.data;
    },
    deleteTemplate: async (id) => {
        const response = await api.delete(`/common/template/${id}`);
        return response.data;
    },
    putTemplate: async (id, template) => {
        const response = await api.put(`/common/template/${id}`, template);
        return response.data;
    },
    getTemplateType: async () => {
        const response = await api.get('/common/template-type');
        return response.data;
    },
    createTemplateType: async (templateType) => {
        const response = await api.post('/common/template-type', templateType);
        return response.data;
    },
    updateTemplateType: async (id, templateType) => {
        const response = await api.patch(`/common/template-type/${id}`, templateType);
        return response.data;
    },
    getTemplateTypeById: async (id) => {
        const response = await api.get(`/common/template-type/${id}`);
        return response.data;
    },
    deleteTemplateType: async (id) => {
        const response = await api.delete(`/common/template-type/${id}`);
        return response.data;
    },
    putTemplateType: async (id, templateType) => {
        const response = await api.put(`/common/template-type/${id}`, templateType);
        return response.data;
    },
    getWorkArea: async () => {
        const response = await api.get('/common/work-area');
        return response.data;
    },
    createWorkArea: async (workArea) => {
        const response = await api.post('/common/work-area', workArea);
        return response.data;
    },
    updateWorkArea: async (id, workArea) => {
        const response = await api.patch(`/common/work-area/${id}`, workArea);
        return response.data;
    },
    getWorkAreaById: async (id) => {
        const response = await api.get(`/common/work-area/${id}`);
        return response.data;
    },
    deleteWorkArea: async (id) => {
        const response = await api.delete(`/common/work-area/${id}`);
        return response.data;
    },
    putWorkArea: async (id, workArea) => {
        const response = await api.put(`/common/work-area/${id}`, workArea);
        return response.data;
    }
};
