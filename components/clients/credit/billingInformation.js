import React, { useState, useEffect } from 'react';
import { commonService } from '@/services/commonService';

const BillingInformation = ({model, setModel}) => {
    const [listCity, setListCity] = useState([]);

    const getCity = async () => {
        const response = await commonService.getCity();
        setListCity(response.results);
    };

    useEffect(() => {
        getCity();
    }, []);

    return (
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Modalidad de pago</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" disabled value={model.billing_information.payment}>
              <option value="CREDIT">Crédito</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Frecuencia de facturación</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.frequence_type}>
              <option value="MONTHLY">Mensual</option>
              <option value="QUARTERLY">Quincenal</option>
              <option value="WEEKLY">Semanal</option>
              <option value="DAILY">Diario</option>
              <option value="">Personalizado</option>
            </select>
          </div>
          { model.billing_information.frequence_type === '' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Frecuencia personalizada (Días)</label>
              <div className="grid">
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el número de días" value={model.billing_information.frequence_amount} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, frequence_amount: e.target.value}})} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Corte(s) de facturación</label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Desde (Día)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.billing_cuts.from_day} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_cuts: {...model.billing_information.billing_cuts, from_day: e.target.value}}})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Hasta (Día)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.billing_cuts.to_day} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_cuts: {...model.billing_information.billing_cuts, to_day: e.target.value}}})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Fecha máxima de radicación de factura</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.max_invoice_filing} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, max_invoice_filing: e.target.value}})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">¿ Aplica orden de compra ?</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.applies_purchase_order || 'false'} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, applies_purchase_order: e.target.value}})}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>              
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo facturación electrónica</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el correo electrónico" value={model.billing_information.e_billing_email} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, e_billing_email: e.target.value}})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo(s) alternos envió factura</label>
            {
                model.billing_information.alternative_e_billing_email.map(email => (
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el correo electrónico" value={email.e_billing_email} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, alternative_e_billing_email: model.billing_information.alternative_e_billing_email.map(item => item.id === email.id ? {...item, e_billing_email: e.target.value} : item)}})} />
                ))
            }
          </div>
          <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm" onClick={() => setModel({...model, billing_information: {...model.billing_information, alternative_e_billing_email: [...model.billing_information.alternative_e_billing_email, {e_billing_email: ''}]}})}>+ Agregar correo alterno</button>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Contacto empresa facturación</label>
            <section className="flex flex-wrap gap-2">
              { model.billing_information.billing_company_contact.map(item => (
                <article className="flex flex-col gap-2 bg-gray-100 p-4 rounded max-w-sm w-full" key={item.id}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el nombre" value={item.name} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_company_contact: model.billing_information.billing_company_contact.map(item => item.id === item.id ? {...item, name: e.target.value} : item)}})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Cargo</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el cargo" value={item.charge} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_company_contact: model.billing_information.billing_company_contact.map(item => item.id === item.id ? {...item, charge: e.target.value} : item)}})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el correo electrónico" value={item.email} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_company_contact: model.billing_information.billing_company_contact.map(item => item.id === item.id ? {...item, email: e.target.value} : item)}})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Celular</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el celular" value={item.phone} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_company_contact: model.billing_information.billing_company_contact.map(item => item.id === item.id ? {...item, phone: e.target.value} : item)}})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Ciudad</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded" value={item.city} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, billing_company_contact: model.billing_information.billing_company_contact.map(item => item.id === item.id ? {...item, city: e.target.value} : item)}})}>
                      {
                        listCity.map(city => (
                          <option key={city.id} value={city.id}>{city.name}</option>
                        ))
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
              <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm max-w-sm min-h-[480px] w-full" onClick={() => setModel({...model, billing_information: {...model.billing_information, billing_company_contact: [...model.billing_information.billing_company_contact, {name: '', charge: '', email: '', phone: '', city: ''}]}})}>+ Agregar contacto jurídico</button>
            </section>        
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Cliente responsable del pago - Pagador</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.payment_client} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, payment_client: e.target.value}})}>
              <option>Seleccionar cliente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Link de acceso plataforma</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el link" value={model.billing_information.self_management_link} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, self_management_link: e.target.value}})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Usuario de ingreso</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el usuario" value={model.billing_information.self_management_user} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, self_management_user: e.target.value}})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Contraseña de ingreso</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese la contraseña" value={model.billing_information.self_management_password} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, self_management_password: e.target.value}})} />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requiere condiciones especiales de facturación</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded" value={model.billing_information.special_conditions || 'false'} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, special_conditions: e.target.value}})}>
              <option value="true">Si</option>
              <option value="false">No</option> 
            </select>              
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observación</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese la observación" value={model.billing_information.observations} onChange={(e) => setModel({...model, billing_information: {...model.billing_information, observations: e.target.value}})} />
          </div>              
        </form>
    );
};

export default BillingInformation;