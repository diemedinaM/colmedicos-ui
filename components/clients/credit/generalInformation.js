import React, { useState, useEffect } from 'react';
import { filesService } from '@/services/filesService';
import { commonService } from '@/services/commonService';

const GeneralInformation = ({ model, setModel }) => {
    const [listDocumentType, setListDocumentType] = useState([]);
    const [listTaxPayerType, setListTaxPayerType] = useState([]);
    const [listBusinessStructure, setListBusinessStructure] = useState([]);
    const [listTaxLiability, setListTaxLiability] = useState([]);
    const [listCompanyType, setListCompanyType] = useState([]);
    const [listEconomicActivity, setListEconomicActivity] = useState([]);
    const [listSector, setListSector] = useState([]);
    const [listCountry, setListCountry] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [listCity, setListCity] = useState([]);
    const [listARL, setListARL] = useState([]);
    const [listInsuranceProvider, setListInsuranceProvider] = useState([]);

    const uploadDocument = async (e, field, idx) => {
        try {
            const file = e.target.files[0];
            if (!file) {
                return;
            }

            const response = await filesService.uploadFile(file);
            const path = response.path || '';

            if (field === 'rut') {
                setModel(prevModel => ({ ...prevModel, rut: path }));
            } else if (field === 'chamber_of_commerce') {
                setModel(prevModel => ({ ...prevModel, chamber_of_commerce: path }));
            } else if (field === 'document_number') {
                setModel(prevModel => ({ ...prevModel, document_number: path }));
            } else if (field === 'legal_representative') {
                setModel(prevModel => ({ ...prevModel, legal_representative: model.legal_representative.map((representative, index) => index === idx ? { ...representative, document: path } : representative) }));
            }
        } catch (error) {
            console.error('Error al subir archivo:', error);
        }
    };

    const getDocumentType = async () => {
        const response = await commonService.getDocumentType();
        setListDocumentType(response.results);
    };

    const getTaxPayerType = async () => {
        const response = await commonService.getTaxpayerType();
        setListTaxPayerType(response.results);
    };

    const getBusinessStructure = async () => {
        const response = await commonService.getBusinessStructure();
        setListBusinessStructure(response.results);
    };

    const getTaxLiability = async () => {
        const response = await commonService.getTaxLiability();
        setListTaxLiability(response.results);
    };

    const getCompanyType = async () => {
        const response = await commonService.getCompanyType();
        setListCompanyType(response.results);
    };

    const getEconomicActivity = async () => {
        const response = await commonService.getEconomicActivity();
        setListEconomicActivity(response.results);
    };

    const getSector = async () => {
        const response = await commonService.getSector();
        setListSector(response.results);
    };

    const getCountry = async () => {
        const response = await commonService.getCountry();
        setListCountry(response.results);
    };

    const getProvince = async () => {
        const response = await commonService.getProvince();
        setListProvince(response.results);
    };

    const getCity = async () => {
        const response = await commonService.getCity();
        setListCity(response.results);
    };

    const getARL = async () => {
        const response = await commonService.getArl();
        setListARL(response.results);
    };

    const getInsuranceProvider = async () => {
        const response = await commonService.getInsuranceProvider();
        setListInsuranceProvider(response.results);
    };

    useEffect(() => {
        getDocumentType();
        getTaxPayerType();
        getBusinessStructure();
        getTaxLiability();
        getCompanyType();
        getEconomicActivity();
        getSector();
        getCountry();
        getProvince();
        getCity();
        getARL();
        getInsuranceProvider();
    }, []);

    return (
        <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">RUT</label>
                    <div className="flex items-center gap-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el RUT" value={model.rut || ''} readOnly />
                        <input type="file" className="hidden" onChange={(e) => uploadDocument(e, 'rut')} id="fileRut" />
                        <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById('fileRut').click()}>Subir</button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Cámara de comercio</label>
                    <div className="flex items-center gap-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el número de cámara de comercio" value={model.chamber_of_commerce || ''} readOnly />
                        <input type="file" className="hidden" onChange={(e) => uploadDocument(e, 'chamber_of_commerce')} id="fileChamberOfCommerce" />
                        <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById('fileChamberOfCommerce').click()}>Subir</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de documento</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.document_type || ''} onChange={(e) => setModel({ ...model, document_type: e.target.value })}>
                        {listDocumentType.length > 0 && (
                            <>
                                <option value="">Selecciona un tipo de documento</option>
                                {listDocumentType.map(documentType => (
                                    <option key={documentType.id} value={documentType.id}>{documentType.name}</option>
                                ))}
                            </>
                        )}
                        {listDocumentType.length == 0 && (
                            <option value="">No hay tipos de documentos disponibles</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Documento</label>
                    <input type="text" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.document_number || ''} onChange={(e) => setModel({ ...model, document_number: e.target.value })} placeholder="Ingrese el número de documento" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Dígito de verificación</label>
                    <input type="text" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.verification_digit || ''} onChange={(e) => setModel({ ...model, verification_digit: e.target.value })} placeholder="Ingrese el dígito de verificación" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de Contribuyente</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.taxpayer_type || ''} onChange={(e) => setModel({ ...model, taxpayer_type: e.target.value })}>
                        {
                            listTaxPayerType.length > 0 && (
                                <>
                                    <option value="">Selecciona un tipo de contribuyente</option>
                                    {listTaxPayerType.map(taxPayerType => (
                                        <option key={taxPayerType.id} value={taxPayerType.id}>{taxPayerType.text}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listTaxPayerType.length == 0 && (
                                <option value="">No hay tipos de contribuyentes disponibles</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de régimen</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.business_structure || ''} onChange={(e) => setModel({ ...model, business_structure: e.target.value })}>
                        {
                            listBusinessStructure.length > 0 && (
                                <>
                                    <option value="">Selecciona un tipo de régimen</option>
                                    {listBusinessStructure.map(businessStructure => (
                                        <option key={businessStructure.id} value={businessStructure.id}>{businessStructure.text}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listBusinessStructure.length == 0 && (
                                <option value="">No hay tipos de régimen disponibles</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Responsabilidad fiscal</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.tax_liability || ''} onChange={(e) => setModel({ ...model, tax_liability: e.target.value })}>
                        {
                            listTaxLiability.length > 0 && (
                                <>
                                    <option value="">Selecciona una responsabilidad fiscal</option>
                                    {listTaxLiability.map(taxLiability => (
                                        <option key={taxLiability.id} value={taxLiability.id}>{taxLiability.text}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listTaxLiability.length == 0 && (
                                <option value="">No hay responsabilidades fiscales disponibles</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Razón social</label>
                    <input type="text" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.alias || ''} placeholder="Ingrese la razón social" onChange={(e) => setModel({ ...model, alias: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de sociedad</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.company_type || ''} onChange={(e) => setModel({ ...model, company_type: e.target.value })}>
                        {
                            listCompanyType.length > 0 && (
                                <>
                                    <option value="">Selecciona un tipo de sociedad</option>
                                    {listCompanyType.map(companyType => (
                                        <option key={companyType.id} value={companyType.id}>{companyType.text}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listCompanyType.length == 0 && (
                                <option value="">No hay tipos de sociedades disponibles</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre comercial</label>
                    <input type="text" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.name || ''} onChange={(e) => setModel({ ...model, name: e.target.value })} placeholder="Ingrese el nombre comercial" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Actividad económica</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.economic_activity || ''} onChange={(e) => setModel({ ...model, economic_activity: e.target.value })}>
                        {
                            listEconomicActivity.length > 0 && (
                                <>
                                    <option value="">Selecciona una actividad económica</option>
                                    {listEconomicActivity.map(economicActivity => (
                                        <option key={economicActivity.id} value={economicActivity.id}>{economicActivity.text}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listEconomicActivity.length == 0 && (
                                <option value="">No hay actividades económicas disponibles</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Sector económico</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.sector || ''} onChange={(e) => setModel({ ...model, sector: e.target.value })}>
                        {
                            listSector.length > 0 && (
                                <>
                                    <option value="">Selecciona un sector económico</option>
                                    {listSector.map(sector => (
                                        <option key={sector.id} value={sector.id}>{sector.text}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listSector.length == 0 && (
                                <option value="">No hay sectores económicos disponibles</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">País</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.country || ''} onChange={(e) => setModel({ ...model, country: e.target.value })}>
                        {
                            listCountry.length > 0 && (
                                <>
                                    <option value="">Selecciona un país</option>
                                    {listCountry.map(country => (
                                        <option key={country.id} value={country.id}>{country.name}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listCountry.length == 0 && (
                                <option value="">No hay países disponibles</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Región</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.province || ''} onChange={(e) => setModel({ ...model, province: e.target.value })}>
                        {
                            listProvince.length > 0 && (
                                <>
                                    <option value="">Selecciona una región</option>
                                    {listProvince.map(province => (
                                        <option key={province.id} value={province.id}>{province.name}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listProvince.length == 0 && (
                                <option value="">No hay regiones disponibles</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Municipio</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.city || ''} onChange={(e) => setModel({ ...model, city: e.target.value })}>
                        {
                            listCity.length > 0 && (
                                <>
                                    <option value="">Selecciona un municipio</option>
                                    {listCity.map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listCity.length == 0 && (
                                <option value="">No hay municipios disponibles</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Dirección</label>
                    <input type="text" className='border border-gray-300 rounded-md px-3 py-2 w-full' placeholder="Ingrese la dirección" value={model.address || ''} onChange={(e) => setModel({ ...model, address: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Codificación DIAN</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value={model.converted_address || ''} onChange={(e) => setModel({ ...model, converted_address: e.target.value })} placeholder="Ingrese la codificación DIAN" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo electrónico reportado en el RUT</label>
                    <input type="email" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.email || ''} onChange={(e) => setModel({ ...model, email: e.target.value })} placeholder="Ingrese el correo electrónico" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Teléfono reportado en el RUT</label>
                    <input type="text" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.phone || ''} onChange={(e) => setModel({ ...model, phone: e.target.value })} placeholder="Ingrese el teléfono" />
                </div>
            </div>

            <div className="grid grid-cols-1">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Número de empleados</label>
                    <input type="number" className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.employees || ''} onChange={(e) => setModel({ ...model, employees: e.target.value })} placeholder="Ingrese el número de empleados" />
                </div>
            </div>

            {model.id && model.id !== '' && (
                <>
                    <hr className="my-4" />
                    <strong className="font-bold mb-1">Representante legal</strong>
                    <section className="flex flex-wrap gap-2">
                        {model.legal_representative.length > 0 && model.legal_representative.map((representative, index) => (
                            <article className="flex flex-col gap-2 bg-gray-100 p-4 rounded max-w-sm w-full" key={index}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Documento</label>
                                    <div className="flex items-center gap-2">
                                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Sube el documento" value={representative.document || ''} onChange={(e) => setModel({ ...model, legal_representative: model.legal_representative.map((representative, index) => index === index ? { ...representative, document: e.target.value } : representative) })} />
                                        <input type="file" className="hidden" onChange={(e) => uploadDocument(e, 'legal_representative', index)} id="fileDocumentNumber" />
                                        <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById('fileDocumentNumber').click()}>Subir</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de documento</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={representative.document_type || ''} onChange={(e) => setModel({ ...model, legal_representative: model.legal_representative.map((representative, index) => index === index ? { ...representative, document_type: e.target.value } : representative) })}>
                                        {listDocumentType.map(documentType => (
                                            <option key={documentType.id} value={documentType.id}>{documentType.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Numero de Identificación</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value={representative.document_number || ''} onChange={(e) => setModel({ ...model, legal_representative: model.legal_representative.map((representative, index) => index === index ? { ...representative, document_number: e.target.value } : representative) })} placeholder="Ingrese el número de identificación" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre Completo</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el nombre completo" value={representative.name || ''} onChange={(e) => setModel({ ...model, legal_representative: model.legal_representative.map((representative, index) => index === index ? { ...representative, name: e.target.value } : representative) })} />
                                </div>
                            </article>
                        ))}
                        <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-sm" onClick={() => setModel({ ...model, legal_representative: [...model.legal_representative, { document_number: '', document_type: 1, name: '', document: '' }] })}>+ Agregar representante legal</button>
                    </section>
                </>
            )}
            <hr className="my-4" />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ARL</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.arl || ''} onChange={(e) => setModel({ ...model, arl: e.target.value })}>
                        {
                            listARL.length > 0 && (
                                <>
                                    <option value="">Selecciona una ARL</option>
                                    {listARL.map(arl => (
                                        <option key={arl.id} value={arl.id}>{arl.name}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listARL.length == 0 && (
                                <option value="">No hay ARLs disponibles</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Corredor de seguros</label>
                    <select className='border border-gray-300 rounded-md px-3 py-2 w-full' value={model.insurance_provider || ''} onChange={(e) => setModel({ ...model, insurance_provider: e.target.value })}>
                        {
                            listInsuranceProvider.length > 0 && (
                                <>
                                    <option value="">Selecciona un corredor de seguros</option>
                                    {listInsuranceProvider.map(insuranceProvider => (
                                        <option key={insuranceProvider.id} value={insuranceProvider.id}>{insuranceProvider.name}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listInsuranceProvider.length == 0 && (
                                <option value="">No hay corredores de seguros disponibles</option>
                            )
                        }
                    </select>
                </div>
            </div>
        </form>
    );
};

export default GeneralInformation;