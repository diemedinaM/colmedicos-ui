"use client";

import { useState, useEffect } from "react";
import { filesService } from "@/services/filesService";
import { clientsService } from "@/services/clientsService";
import { useSearchParams, useRouter } from "next/navigation";
import GeneralInformation from "@/components/clients/credit/generalInformation";
import BusinessGroup from "@/components/clients/credit/businessGroup";
import AgreementInformation from "@/components/clients/credit/agreementInformation";
import LegalInformation from "@/components/clients/credit/legalInformation";
import BillingInformation from "@/components/clients/credit/billingInformation";

export default function CreateCredit() {
  const router = useRouter();
  const [model, setModel] = useState({
    legal_representative: [],
    company_group: {
      company_groups: 0
    },
    legal_information: {
      commercial_agreement: ""
    },
    legal_certifications: [
      {
        certificate: ""
      }
    ],
    legal_company_contact: [
      {
        name: "",
        charge: "",
        email: "",
        phone: "",
        area: "",
        city: 0
      }
    ],
    agreement_information: {
      service_net: true,
      restricted_cities_required: true,
      products_required: true,
      vip_appointments: true,
      extra_unit: true,
      health_prevent: true,
      has_professional: true,
      q_darte_services: true,
      restricted_cities: [
        0
      ],
      cities: [
        0
      ],
      products: [
        0
      ]
    },
    billing_information: {
      payment: "CREDIT",
      frequence_type: "DAILY",
      frequence_amount: 2147483647,
      max_invoice_filing: 31,
      e_billing_email: "user@example.com",
      self_management_link: "string",
      self_management_user: "string",
      self_management_password: "string",
      special_conditions: true,
      observations: "string",
      payment_client: 0
    },
    alternative_e_billing_email: [
      {
        e_billing_email: "user@example.com"
      }
    ],
    billing_company_contact: [
      {
        name: "string",
        email: "user@example.com",
        charge: "string",
        phone: "1992336388",
        city: 0
      }
    ],
    billing_cuts: [
      {
        from_day: 31,
        to_day: 31
      }
    ],
    rut: "",
    chamber_of_commerce: "",
    document_number: "",
    verification_digit: "",
    name: "",
    alias: "",
    address: "",
    converted_address: "",
    email: "",
    phone: "",
    employees: 0,
    document_type: 0,
    taxpayer_type: 0,
    business_structure: 0,
    tax_liability: 0,
    economic_activity: 0,
    sector: 0,
    country: 0,
    province: 0,
    city: 0,
    arl: 0,
    insurance_provider: 0
  });
  const [listErrors, setListErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const searchParams = useSearchParams();

  const handleSave = async () => {
    if (model.id) {
      let _model = null;
      if (tabActive == 'Información general') {
        _model = {
          legal_representative: model.legal_representative,
          document_number: model.document_number,
          name: model.name,
          alias: model.alias,
          address: model.address,
          email: model.email,
          phone: model.phone,
          employees: model.employees,
          document_type: model.document_type,
          business_structure: model.business_structure,
          tax_liability: model.tax_liability,
          sector: model.sector,
          country: model.country,
          province: model.province,
          city: model.city,
          arl: model.arl,
          insurance_provider: model.insurance_provider
        }
      }
      if (tabActive == 'Grupo empresarial') {
        _model = {
          company_group: {
            company_groups: model.company_group.company_groups
          }
        }
      }
      if (tabActive == 'Información de acuerdos') {
        _model = {
          agreement_information: {
            ...model.agreement_information
          }
        }
      }
      if (tabActive == 'Información jurídica') {
        _model = {
          legal_information: {
            ...model.legal_information
          },
          legal_certifications: {
            ...model.legal_certifications
          },
          legal_company_contact: {
            ...model.legal_company_contact
          }
        }
      }
      if (tabActive == 'Información facturación') {
        _model = {
          billing_information: {
            ...model.billing_information
          }
        }
      }

      const response = await clientsService.patchClient(model.id, _model);
      if (response.status == 400) {
        setShowErrors(true);
        setListErrors(response.response.data);
        return;
      }
    } else {
      const _model = {
        document_number: model.document_number,
        name: model.name,
        alias: model.alias,
        address: model.address,
        email: model.email,
        phone: model.phone,
        employees: model.employees,
        document_type: model.document_type,
        business_structure: model.business_structure,
        tax_liability: model.tax_liability,
        sector: model.sector,
        country: model.country,
        province: model.province,
        city: model.city,
        arl: model.arl,
        insurance_provider: model.insurance_provider
      };
      const response = await clientsService.createClient(_model);
      if (response.status == 400) {
        setShowErrors(true);
        setListErrors(response.response.data);
        return;
      } else {
        router.push(`/clients`);
      }
    }
  }

  const listTabs = [
    'Información general',
    'Grupo empresarial',
    'Información jurídica',
    'Información de acuerdos',
    'Información facturación',
    'Información cartera',
    'Tarifas',
    'Protocolos especializados',
    'Documentos medicos',
    'Ayudas de atención',
    'Centro de costos',
    'Integraciónes',
    'Personal de Salud',
    'Contactos del cliente',
    'Informes dx',
  ];
  const [tabActive, setTabActive] = useState('Información general');

  const getClientById = async (id) => {
    const response = await clientsService.getClientById(id);
    if (!response.billing_information) {
      response.billing_information = {
        payment: "CREDIT",
        frequence_type: "",
        frequence_amount: 0,
        max_invoice_filing: 1,
        e_billing_email: "",
        self_management_link: "",
        self_management_user: "",
        self_management_password: "",
        special_conditions: false,
        observations: "",
        payment_client: 0
      }
    }
    if (!response.agreement_information) {
      response.agreement_information = {
        service_net: false,
        restricted_cities_required: false,
        products_required: false,
        vip_appointments: false,
        extra_unit: false,
        health_prevent: false,
        q_darte_services: false,
        restricted_cities: [],
        cities: [],
        products: []
      }
    }
    // Mantener la estructura original del modelo y solo actualizar los campos que vienen del servidor
    setModel(prevModel => ({
      ...prevModel,
      ...response
    }));
  };

  const uploadDocument = async (e, field, idx) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      
      const response = await filesService.uploadFile(file);
      const path = response.path || '';
      
      if (field === 'rut') {
        setModel(prevModel => ({...prevModel, rut: path}));
      } else if (field === 'chamber_of_commerce') {
        setModel(prevModel => ({...prevModel, chamber_of_commerce: path}));
      } else if (field === 'document_number') {
        setModel(prevModel => ({...prevModel, document_number: path}));
      } else if (field === 'commercial_agreement') {
        setModel(prevModel => ({...prevModel, commercial_agreement: path}));
      } else if (field === 'legal_certificates') {
        setModel(prevModel => ({...prevModel, legal_certificates: path}));
      } else if (field === 'legal_representative') {
        setModel(prevModel => ({...prevModel, legal_representative: prevModel.legal_representative.map((representative, index) => index === idx ? {...representative, document: path} : representative)}));
      } else if (field === 'legal_information.commercial_agreement') {
        setModel(prevModel => ({...prevModel, legal_information: {...prevModel.legal_information, commercial_agreement: path}}));
      } else if (field === 'legal_certifications.certificate') {
        setModel(prevModel => ({...prevModel, legal_certifications: prevModel.legal_certifications.map((certificate, index) => index === idx ? {...certificate, certificate: path} : certificate)}));
      }
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  };

  useEffect(() => {
    if (searchParams.get('id')) {
      setModel({...model, id: searchParams.get('id')});
      getClientById(searchParams.get('id'));
      setTabActive('Información general');
    }
  }, []);

  return (
    <section className="mx-auto p-8 bg-white rounded-lg shadow">
      <div className="flex items-center mb-10">
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((step, idx) => (
          <div key={step} className={`flex items-center ${step == 15 ? 'w-auto' : 'w-full'}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step <= 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-300'}`}>{step}</div>
            {step < 17 && (
              <div className={`flex-1 h-1 ${step < 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-15 mb-8">
        {listTabs.map(tab => (
          <button disabled={tab != 'Información general' && !model.id} key={tab} className={`px-3 py-1 text-xs font-medium border-b hover:border-blue-400 hover:text-blue-700 hover:cursor-pointer ${tabActive === tab ? 'border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-500'}`} onClick={() => setTabActive(tab)}>{tab}</button>
        ))}
      </div>

      { tabActive === 'Información general' && (
        <GeneralInformation model={model} setModel={setModel} />
      )}

      { tabActive === 'Grupo empresarial' && (
        <BusinessGroup model={model} setModel={setModel} />
      )}

      { tabActive === 'Información de acuerdos' && (
        <AgreementInformation model={model} setModel={setModel} />
      )}

      { tabActive === 'Información jurídica' && (
        <LegalInformation model={model} setModel={setModel} />
      )}

      { tabActive === 'Información facturación' && (
        <BillingInformation model={model} setModel={setModel} />
      )}

      { tabActive == 'Información cartera' && (
        <form className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Plazo de pago para el cliente (días)</label>
            <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el plazo de pago" />
          </div>        

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 border-b border-gray-300 text-left font-semibold">ID</th>
                  <th className="px-2 py-2 border-b border-gray-300 text-left font-semibold">Tipo</th>
                  <th className="px-2 py-2 border-b border-gray-300 text-left font-semibold">Segmento</th>
                  <th className="px-2 py-2 border-b border-gray-300 text-left font-semibold">Plazo de pago (Días)</th>
                  <th className="px-2 py-2 border-b border-gray-300 text-left font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 py-2 border-b border-gray-200">1</td>
                  <td className="px-2 py-2 border-b border-gray-200">Modalidad de Atención</td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    <select className="border border-gray-300 rounded px-2 py-1 w-full bg-white">
                      <option>Extramural</option>
                      <option>Sedes propias</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    <input type="number" className="border border-gray-300 rounded px-2 py-1 w-16" />
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 flex gap-2">
                    <button type="button" className="text-blue-600 hover:text-blue-800 px-2 py-2" title="Editar">
                      <i className="material-icons">edit</i>
                    </button>
                    <button type="button" className="text-red-600 hover:text-red-800 px-2 py-2" title="Eliminar">
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 border-b border-gray-200">2</td>
                  <td className="px-2 py-2 border-b border-gray-200">Unidad de negocio</td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    <select className="border border-gray-300 rounded px-2 py-1 w-full bg-white">
                      <option>Q&Darte</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200">
                    <input type="number" className="border border-gray-300 rounded px-2 py-1 w-16" />
                  </td>
                  <td className="px-2 py-2 border-b border-gray-200 flex gap-2">
                    <button type="button" className="text-blue-600 hover:text-blue-800 px-2 py-2" title="Editar">
                      <i className="material-icons">edit</i>
                    </button>
                    <button type="button" className="text-red-600 hover:text-red-800 px-2 py-2" title="Eliminar">
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">¿ Tiene plataforma de autogestión ?</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Si</option>
              <option>No</option>
            </select>              
          </div>        

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Link de acceso plataforma</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el link" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Usuario de ingreso</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el usuario" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Contraseña de ingreso</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese la contraseña" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Contacto empresa cartera</label>
            <section className="flex flex-wrap gap-2">
              { [1,2].map(item => (
                <article className="flex flex-col gap-2 bg-gray-100 p-4 rounded max-w-sm w-full" key={item}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el nombre" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Cargo</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el cargo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el correo electrónico" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Celular</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el celular" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Area</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el área" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Ciudad</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded">
                      <option>Medellín</option>
                    </select>
                  </div>
                </article>
              ))}
              <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm max-w-sm min-h-[480px] w-full">+ Agregar otro contacto</button>
            </section>        
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observación</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese la observación" />
          </div> 
        </form>
      )}

      { tabActive === 'Tarifas' && (
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de tarifas aplicadas para el cliente</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Tarifa Diferencial</option>
                <option>Tarifa Base</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Plantilla autorizada para las tarifas diferenciales</label>
              <div className="flex items-center gap-2">
                <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Tarifas diferenciales" />
                <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">Adjuntar plantilla</button>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <header className="flex justify-between gap-4">
            <strong className="font-bold mb-1">TARIFAS DIFENCIALES METIS S.A.S.</strong>
            <div className="flex flex-col gap-1 items-end">
              <a className="text-blue-600 text-sm hover:underline cursor-pointer">Historial de cambios general</a>
              <small className="text-gray-500">Última actualización en 2025/01/01</small>
              <small className="text-gray-500">Última actualización por usuario.sofia</small>
            </div>
          </header>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Categoría del producto</th>
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Producto</th>
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Clasificación de Municipio</th>
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Municipio (opcional)</th>
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Sede (opcional)</th>
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Tarifa diferencial</th>
                  <th className="border border-gray-300 px-2 py-2 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Sedes Propias</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">$ 8.000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Sedes Propias</td>
                  <td className="border border-gray-300 px-2 py-2">Cali</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">$ 7.000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Sedes Propias</td>
                  <td className="border border-gray-300 px-2 py-2">Medellín</td>
                  <td className="border border-gray-300 px-2 py-2">Furatena</td>
                  <td className="border border-gray-300 px-2 py-2">$ 5.000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Red de servicios Grupo 1</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">$ 10.000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Red de servicios Grupo 1</td>
                  <td className="border border-gray-300 px-2 py-2">Bucaramanga</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">
                    <span title="Advertencia" className="mr-1">⚠️</span>
                    <span className="text-red-600 font-bold">$ 9.000</span>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Red de servicios Grupo 2</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">$ 11.000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-2 py-2">Laboratorio</td>
                  <td className="border border-gray-300 px-2 py-2">Perfil lipídico</td>
                  <td className="border border-gray-300 px-2 py-2">Red de servicios Grupo 3</td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                  <td className="border border-gray-300 px-2 py-2">$ 12.000</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <span className="inline-flex gap-1">
                      <span title="Editar">✏️</span>
                      <span title="Guardar">💾</span>
                      <span title="Ver cambios">👁️</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="my-4" />

          <strong className="font-bold mb-1">Configuración de vigencia y actualización de tarifas</strong>
          <div className="flex flex-col gap-1 p-4 bg-green-100 rounded border border-green-300">
            <span>
              <strong>Cliente:</strong> METIS S.A.S.
            </span>
            <span>
              <strong>Contratos activos:</strong> 1
            </span>
            <span>
              <strong>Estado general:</strong> Vigente
            </span>
            <span>
              <strong>Observación:</strong> Puede configurar y automatizar la actualización de tarifas.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Fecha de inicio de vigencia</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Fecha fin de vigencia</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" value="true" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-600">Aplicar actualización automática</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Frecuencia de actualización</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Frecuencia personalizada</option>
                <option>Anual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Frecuencia personalizada</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el número de días" />
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                  <option>Días</option>
                  <option>Meses</option>
                  <option>Años</option>
                </select>
              </div>
              <small className="text-gray-500">
                Proxima fecha de actualización: 2025/01/01
              </small>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Porcentaje de actualización</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Porcentaje fijo</option>
                <option>IPC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Digite el porcentaje para el incremento de las tarifas (%)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">La empresa permite redondeo de Tarifas</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" value="true" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="text-sm text-gray-600">Aplicar alerta antes del cambio</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Seleccione usuario(s)</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Lider - Nombre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Mensaje de notificación</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded" rows={3} placeholder="Ingrese el mensaje de notificación" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Alertar antes de</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el número de días" />
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                  <option>Días</option>
                  <option>Meses</option>
                  <option>Años</option>
                </select>
              </div>
            </div>

            <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded border border-gray-300 text-sm">Guardar Configuración</button>
          </div>

          <hr className="my-4" />

          <strong className="font-bold mb-1">Configuración de descuentos</strong>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Aplica para descuentos específicos en sedes propias</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Si</option>
              <option>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Selecciona los descuentos</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Descuento por atenciones a partir de las 11:00 AM</option>
            </select>
          </div>
          <button type="button" className="px-6 py-2 bg-gray-200 text-gray-700 rounded border border-gray-300 text-sm">Agregar descuento</button>

          <div className="grid grid-cols-[3fr_1fr] gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Selecciona los productos</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Valoración por medicina laboral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Cantidad por mes</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
          </div>
          <button type="button" className="px-6 py-2 bg-gray-200 text-gray-700 rounded border border-gray-300 text-sm">Agregar producto</button>

        </form>
      )}

      { tabActive === 'CECO' && (
        <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">
              ¿La empresa requiere creación de Centros de Costos?
            </label>
            <div className="flex gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">
              ¿Se requiere creación de Centros de Costos para direcciones especiales?
            </label>
            <div className="flex gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <strong className="block text-sm font-medium text-gray-700 mb-2">
              Resumen de centros de costos creados
            </strong>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">ID</th>
                    <th className="border border-gray-300 px-2 py-1">Nombre</th>
                    <th className="border border-gray-300 px-2 py-1">Estado</th>
                    <th className="border border-gray-300 px-2 py-1">Fecha de creación</th>
                    <th className="border border-gray-300 px-2 py-1">Creado por</th>
                    <th className="border border-gray-300 px-2 py-1">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1 text-blue-700 underline cursor-pointer">101</td>
                    <td className="border border-gray-300 px-2 py-1 text-blue-700 underline cursor-pointer">JNO EAS/01/TULUA</td>
                    <td className="border border-gray-300 px-2 py-1 text-green-600 font-bold">ACTIVO</td>
                    <td className="border border-gray-300 px-2 py-1">14/12/2023</td>
                    <td className="border border-gray-300 px-2 py-1">Admin</td>
                    <td className="border border-gray-300 px-2 py-1"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1 text-blue-700 underline cursor-pointer">102</td>
                    <td className="border border-gray-300 px-2 py-1 text-blue-700 underline cursor-pointer">JNO SAS/01/CRODA</td>
                    <td className="border border-gray-300 px-2 py-1 text-green-600 font-bold">ACTIVO</td>
                    <td className="border border-gray-300 px-2 py-1">14/12/2023</td>
                    <td className="border border-gray-300 px-2 py-1">Admin</td>
                    <td className="border border-gray-300 px-2 py-1"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-1 text-blue-700 underline cursor-pointer">103</td>
                    <td className="border border-gray-300 px-2 py-1 text-blue-700 underline cursor-pointer">JNO EAS/01/TULUA</td>
                    <td className="border border-gray-300 px-2 py-1 text-red-600 font-bold">INACTIVO</td>
                    <td className="border border-gray-300 px-2 py-1">14/12/2023</td>
                    <td className="border border-gray-300 px-2 py-1">Admin</td>
                    <td className="border border-gray-300 px-2 py-1">*04/07/2025 Reemplazado por xxxxxxxxxxx</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </form>
      )}

      {showErrors && Object.keys(listErrors).length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 bg-red-100 p-4 rounded-md">
            {Object.keys(listErrors).map((fieldName, fieldIndex) => (
              <div key={fieldIndex}>
                {Array.isArray(listErrors[fieldName]) ? 
                  listErrors[fieldName].map((error, errorIndex) => (
                    <div key={errorIndex} className="text-red-500"><strong className="capitalize">{fieldName}:</strong> {error}</div>
                  )) : 
                  <div className="text-red-500">{listErrors[fieldName]}</div>
                }
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 justify-end mt-8">
        <div className="flex gap-2 justify-end">
          <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded border border-gray-300 text-sm" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </section>
  );
}