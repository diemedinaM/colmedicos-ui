import React, { useState, useEffect } from 'react';
import { serviceProvidersService } from '@/services/serviceProvidersService';
import { productsService } from '@/services/productsService';

const AgreementInformation = ({model, setModel}) => {
    const [listServiceProviderByCity, setListServiceProviderByCity] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    const getServiceProviderByCity = async () => {
        const response = await serviceProvidersService.getServiceProviderByCity();
        setListServiceProviderByCity(response.results);
    };

    const getProducts = async () => {
        const response = await productsService.getProduct();
        setListProducts(response.results);
    };

    useEffect(() => {
        getServiceProviderByCity();
        getProducts();
    }, []);

    return (
        <form className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Require Red de Servicios</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.service_net || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, service_net: e.target.value}})}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Require activar Red Restringida</label>
                <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.restricted_cities_required || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, restricted_cities_required: e.target.value}})}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                    {model.agreement_information?.restricted_cities_required === 'true' && (
                        <select className="w-full px-3 py-2 border border-gray-300 rounded">
                            {
                                listServiceProviderByCity.length > 0 && (
                                    <>
                                        <option value="">Selecciona una ciudad</option>
                                        {listServiceProviderByCity.map(serviceProviderByCity => (
                                            <option key={serviceProviderByCity.id} value={serviceProviderByCity.id}>{serviceProviderByCity.name}</option>
                                        ))}
                                    </>
                                )
                            }
                            {listServiceProviderByCity.length == 0 && (
                                <option value="">No hay ciudades disponibles</option>
                            )}
                        </select>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Require bloquear ciudades de la Red de servicios estándar</label>
                <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" disabled>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                    {true && (
                        <select className="w-full px-3 py-2 border border-gray-300 rounded">
                            {
                                listServiceProviderByCity.length > 0 && (
                                    <>
                                        <option value="">Selecciona una ciudad</option>
                                        {listServiceProviderByCity.map(serviceProviderByCity => (
                                            <option key={serviceProviderByCity.id} value={serviceProviderByCity.id}>{serviceProviderByCity.name}</option>
                                        ))}
                                    </>
                                )
                            }
                            {listServiceProviderByCity.length == 0 && (
                                <option value="">No hay ciudades disponibles</option>
                            )}
                        </select>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tiene restricción para atención en productos</label>
                <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.products_required || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, products_required: e.target.value}})}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                    </select>
                    {model.agreement_information?.products_required === 'true' && (
                        <select className="w-full px-3 py-2 border border-gray-300 rounded">
                        {
                            listProducts.length > 0 && (
                                <>
                                    <option value="">Selecciona un producto</option>
                                    {listProducts.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </>
                            )
                        }
                        {
                            listProducts.length == 0 && (
                                <option value="">No hay productos disponibles</option>
                            )
                        }
                        </select>
                    )}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Se autoriza separación de citas en sede VIP</label>
                <div>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.vip_appointments || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, vip_appointments: e.target.value}})}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                    </select>
                </div>
            </div>

            <hr className="my-4" />
            
            <strong className="font-bold mb-1">Modalidades de atención</strong>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Requiere servicios en Extramural</label>
                <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.extra_unit || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, extra_unit: e.target.value}})}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                    {model.agreement_information?.extra_unit === 'true' && (
                        <div className="grid grid-cols-[4fr_2fr] gap-2">
                            <select className="w-full px-3 py-2 border border-gray-300 rounded" disabled>
                                <option>Selecciona modalidad de atención</option>
                            </select>
                            <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm">+ Agregar modalidad de atención</button>
                        </div>
                    )}
                </div>
            </div>

            <hr className="my-4" />
            
            <strong className="font-bold mb-1">Unidades de negocio</strong>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Requiere servicios en Prevención en Salud</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.health_prevent || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, health_prevent: e.target.value}})}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>              
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Requiere servicios en Q&Darte</label>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
                <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.agreement_information?.q_darte_services || 'false'} onChange={(e) => setModel({...model, agreement_information: {...model.agreement_information, q_darte_services: e.target.value}})}>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
                {model.agreement_information?.q_darte_services === 'true' && (
                    <div className="grid grid-cols-[4fr_2fr] gap-2">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded" disabled>
                            <option>Selecciona unidad de negocio</option>
                        </select>
                        <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm">+ Agregar unidad de negocio</button>
                    </div>
                )}
            </div>
            </div>
        </form>
    );
};

export default AgreementInformation;