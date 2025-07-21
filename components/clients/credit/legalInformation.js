import React, { useState, useEffect } from 'react';
import { filesService } from '@/services/filesService';
import { commonService } from '@/services/commonService';


const LegalInformation = ({ model, setModel }) => {
    const [listCity, setListCity] = useState([]);

    const getCity = async () => {
        const response = await commonService.getCity();
        setListCity(response.results);
    };

    const uploadDocument = async (e, field, idx) => {
        try {
            const file = e.target.files[0];
            if (!file) {
                return;
            }

            const response = await filesService.uploadFile(file);
            const path = response.path || '';
            if (field === 'legal_information.commercial_agreement') {
                setModel(prevModel => ({ ...prevModel, legal_information: { ...prevModel.legal_information, commercial_agreement: path } }));
            } else if (field === 'legal_certifications.certificate') {
                setModel(prevModel => ({ ...prevModel, legal_certifications: prevModel.legal_certifications.map((certificate, index) => index === idx ? { ...certificate, certificate: path } : certificate) }));
            }
        } catch (error) {
            console.error('Error al subir archivo:', error);
        }
    };

    useEffect(() => {
        getCity();
    }, []);

    return (
        <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Documento que regula la relación comercial</label>
                    <div className="flex items-center gap-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Sube el documento" value={model.legal_information && model.legal_information.commercial_agreement || ''} readOnly />
                        <input type="file" className="hidden" onChange={(e) => uploadDocument(e, 'legal_information.commercial_agreement')} id="fileCommercialAgreement" />
                        <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById('fileCommercialAgreement').click()}>Subir</button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Certificados legales vigentes y/o anexos</label>
                    <div className="flex flex-col gap-2">
                        {
                            model.legal_certifications && model.legal_certifications.map((certificate, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded w-full" placeholder="Sube el certificado" value={certificate.certificate || ''} readOnly />
                                    <input type="file" className="hidden" onChange={(e) => uploadDocument(e, 'legal_certifications.certificate', index)} id={`fileLegalCertificates-${index}`} />
                                    <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById(`fileLegalCertificates-${index}`).click()}>Subir</button>
                                </div>
                            ))
                        }
                        <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm w-full" onClick={() => setModel({ ...model, legal_certifications: [...model.legal_certifications, { certificate: '' }] })}>+ Agregar certificado</button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Contacto jurídico empresa</label>
                    <section className="flex flex-wrap gap-2">
                        {model.legal_company_contact && model.legal_company_contact.map((contact, index) => (
                            <article className="flex flex-col gap-2 bg-gray-100 p-4 rounded max-w-sm w-full" key={index}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el nombre" value={contact.name} onChange={(e) => setModel({ ...model, legal_company_contact: model.legal_company_contact.map((contact, index) => index === index ? { ...contact, name: e.target.value } : contact) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Cargo</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el cargo" value={contact.charge} onChange={(e) => setModel({ ...model, legal_company_contact: model.legal_company_contact.map((contact, index) => index === index ? { ...contact, charge: e.target.value } : contact) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo</label>
                                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el correo electrónico" value={contact.email} onChange={(e) => setModel({ ...model, legal_company_contact: model.legal_company_contact.map((contact, index) => index === index ? { ...contact, email: e.target.value } : contact) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Celular</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el celular" value={contact.phone} onChange={(e) => setModel({ ...model, legal_company_contact: model.legal_company_contact.map((contact, index) => index === index ? { ...contact, phone: e.target.value } : contact) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Area</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el área" value={contact.area} onChange={(e) => setModel({ ...model, legal_company_contact: model.legal_company_contact.map((contact, index) => index === index ? { ...contact, area: e.target.value } : contact) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Ciudad</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={contact.city} onChange={(e) => setModel({ ...model, legal_company_contact: model.legal_company_contact.map((contact, index) => index === index ? { ...contact, city: e.target.value } : contact) })}>
                                        {
                                            listCity.length > 0 && (
                                                <>
                                                    {listCity.map(city => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                    ))}
                                                </>
                                            )
                                        }
                                        {
                                            listCity.length == 0 && (
                                                <option value="">No hay ciudades disponibles</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </article>
                        ))}
                        <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm max-w-sm min-h-[480px] w-full" onClick={() => setModel({ ...model, legal_company_contact: [...model.legal_company_contact, { name: '', charge: '', email: '', phone: '', area: '', city: '' }] })}>+ Agregar contacto jurídico</button>
                    </section>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Área Responsable</label>
                    <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded w-full" placeholder="Juridica" disabled />
                </div>
            </div>
        </form>
    );
};

export default LegalInformation;