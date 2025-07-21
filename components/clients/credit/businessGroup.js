//create template for business group

import React, { useState, useEffect } from 'react';
import { commonService } from '@/services/commonService';

const BusinessGroup = ({model, setModel}) => {
  const [listCompanyGroup, setListCompanyGroup] = useState([]);

  const getCompanyGroup = async () => {
    const response = await commonService.getCompanyGroup();
    setListCompanyGroup(response.results);
  };

  useEffect(() => {
    getCompanyGroup();
  }, []);

  return (
    <form className="flex flex-col gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Grupo empresarial</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.company_group?.company_groups || ''} onChange={(e) => setModel({...model, company_group: {...model.company_group, company_groups: e.target.value}})}>
                {listCompanyGroup.length > 0 && (
                    <>
                        <option value="">No pertenece a un grupo empresarial</option>
                        {listCompanyGroup.map(companyGroup => (
                        <option key={companyGroup.id} value={companyGroup.id}>{companyGroup.name}</option>
                        ))}
                    </>
                )}
                {listCompanyGroup.length == 0 && (
                    <option value="">No hay grupos empresariales disponibles</option>
                )}
            </select>
        </div>
    </form>
  );
};

export default BusinessGroup;