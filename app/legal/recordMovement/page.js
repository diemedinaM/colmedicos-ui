"use client";
import { useState, useEffect } from "react";
import { clientsService } from "@/services/clientsService";
import { commonService } from "@/services/commonService";
import { employeesService } from "@/services/employeesService";
import MultiSelect from "@/components/Multiselect";

export default function RecordMovement() {
  const [stepActive, setStepActive] = useState(1);
  const [buttonActivePenalty, setButtonActivePenalty] = useState('General');
  const [listContracts, setListContracts] = useState([]);
  const [listPenalties, setListPenalties] = useState([]);
  const [listPolicyTypes, setListPolicyTypes] = useState([]);
  const [listInsuranceProviders, setListInsuranceProviders] = useState([]);
  const [listInsuranceBroker, setListInsuranceBroker] = useState([]);
  const [listEmployees, setListEmployees] = useState([]);

  // Estados para multiselect de usuarios
  const [selectedUsers1, setSelectedUsers1] = useState([]); // Para el primer campo de usuarios
  const [selectedUsers2, setSelectedUsers2] = useState([]); // Para el segundo campo de usuarios
  const [selectedUsers3, setSelectedUsers3] = useState([]); // Para el tercer campo de usuarios
  const [selectedUsers4, setSelectedUsers4] = useState([]); // Para el cuarto campo de usuarios
  const [selectedUsers5, setSelectedUsers5] = useState([]); // Para el quinto campo de usuarios
  const [selectedUsers6, setSelectedUsers6] = useState([]); // Para el sexto campo de usuarios

  const getContracts = async () => {
    const response = await clientsService.getClientContract();
    setListContracts(response.results);
  };

  const getPenalties = async () => {
    const response = await commonService.getPenalty();
    setListPenalties(response.results);
  };

  const getPolicyTypes = async () => {
    const response = await commonService.getPolicyType();
    setListPolicyTypes(response.results);
  };

  const getInsuranceProviders = async () => {
    const response = await commonService.getInsuranceProvider();
    setListInsuranceProviders(response.results);
  };

  const getInsuranceBroker = async () => {
    const response = await commonService.getInsuranceBroker();
    setListInsuranceBroker(response.results);
  };

  const getEmployees = async () => {
    const response = await employeesService.getEmployees();
    setListEmployees(response.results);
  };
  
  useEffect(() => {
    getContracts();
    getPenalties();
    getPolicyTypes();
    getInsuranceProviders();
    getInsuranceBroker();
    getEmployees();
  }, []);
  
  return (
    <section className="mx-auto p-8 bg-white rounded-lg shadow">
      { stepActive === 1 && (
        <>
          <div className="mb-2 font-semibold text-gray-700">Movimiento de contrato</div>
          <form className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Tipo de movimiento</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option value="CONTRACT_CREATION">Creación de contrato</option>
                <option value="EXTENSION">Prorroga</option>
                <option value="RENEWAL">Renovación</option>
                <option value="CONTRACT_MODIFICATION">Modificación Contractual</option>
                <option value="EARLY_TERMINATION">Terminación anticipada</option>
                <option value="CONTRACT_SUSPENSION">Suspensión Contractual</option>
                <option value="CONTRACT_REACTIVATION">Reactivación Contractual</option>
                <option value="JUDICIAL_PROCESS">Proceso judicial en proceso</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Detalle</label>
              <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe el detalle del contrato" />
            </div>
          <div className="mb-2 font-semibold text-gray-700">Información general Contrato</div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 underline">ID contrato: 1</label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Tipo de cliente</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option value="PRIVATE">Privado</option>
                <option value="PUBLIC">Público</option>
                <option value="MIXED">Mixto</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">¿Ingreso por licitación?</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option>No</option>
                <option>Sí</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Documento que regula la relación comercial</label>
              <div className="flex gap-2 items-center">
                <input type="text" className="px-3 py-2 border border-gray-300 rounded flex-1" placeholder="Seleccionar archivo..." readOnly />
                <input type="file" className="hidden" onChange={(e) => uploadDocument(e, 'document_number')} id="fileDocumentNumber" />
                <button type="button" className="px-4 py-2 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById('fileDocumentNumber').click()}>Subir</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Tipo de vinculación</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option value="Contrato">Contrato</option>
                <option value="Acuerdo comercial">Acuerdo comercial</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Número interno del contrato</label>
              <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="Número interno del contrato" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Fecha de inicio</label>
              <input type="date" className="px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Fecha terminación del contrato</label>
              <input type="date" className="px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Vigencia (Meses)</label>
              <input type="number" className="w-16 h-10 border border-gray-300 rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Estado de la vinculación</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option value="Vigente">Vigente</option>
                <option value="Vencido">Vencido</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Permite prórroga o renovación automática</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Condiciones de prorroga o renovación</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option value="Automatica (Prorroga)">Automatica (Prórroga)</option>
                <option value="Otrosí o nuevo contrato (Renovacion)">Otrosí o nuevo contrato (Renovación)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Generar alerta de vencimiento</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Alertar antes de</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" className="px-3 py-2 border border-gray-300 rounded" placeholder="0" />
                <select className="px-3 py-2 border border-gray-300 rounded">
                  <option>Días</option>
                  <option>Meses</option>
                  <option>Años</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Usuario(s) a alertar</label>
              <MultiSelect
                options={listEmployees}
                selectedValues={selectedUsers1}
                onSelectionChange={setSelectedUsers1}
                placeholder="Seleccione usuarios a alertar..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Mensaje de notificación</label>
              <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe el mensaje de notificación" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 required">Contacto jurídico empresa</label>
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
                <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm max-w-sm min-h-[480px] w-full">+ Agregar contacto jurídico</button>
              </section>
            </div>
          <div className="mb-2 font-semibold text-gray-700">Seguimiento del valor del contrato</div>
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Contrato con valor</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Valor del contrato</label>
              <input type="number" className="px-3 py-2 border border-gray-300 rounded" placeholder="0" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Aplica un seguimiento restrictivo al valor del contrato</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Usuario(s) a alertar</label>
              <MultiSelect
                options={listEmployees}
                selectedValues={selectedUsers2}
                onSelectionChange={setSelectedUsers2}
                placeholder="Seleccione usuarios a alertar..."
              />
            </div>
          <div className="mb-2 font-semibold text-gray-700">Seguimiento del valor del contrato</div>
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Aplica Cláusulas penales y /o multas</span>
            </div>

            <div className="flex mb-4">
              <button type="button" className={`px-6 py-2 text-sm ${buttonActivePenalty === 'General' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`} onClick={() => setButtonActivePenalty('General')}>General</button>
              <button type="button" className={`px-6 py-2 text-sm ${buttonActivePenalty === 'Específicas' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`} onClick={() => setButtonActivePenalty('Específicas')}>Específicas</button>
            </div>

            { buttonActivePenalty === 'General' && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Información de la penalización</label>
                  <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe la información de la penalización" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Adjuntar penalidades</label>
                  <div className="flex gap-2 items-center">
                    <input type="text" className="px-3 py-2 border border-gray-300 rounded flex-1" placeholder="Seleccionar archivo..." readOnly />
                    <button type="button" className="px-4 py-2 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Usuario(s) a alertar</label>
                  <MultiSelect
                    options={listEmployees}
                    selectedValues={selectedUsers3}
                    onSelectionChange={setSelectedUsers3}
                    placeholder="Seleccione usuarios a alertar..."
                  />
                </div>

                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm mt-6">Agregar plantilla</button>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Seleccione usuarios</label>
                  <select className="px-3 py-2 border border-gray-300 rounded">
                    <option>Todos</option>
                    <option>Seleccionar</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Nombre plantilla</label>
                  <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="Nombre de la plantilla" />
                </div>
              </>
            )}

            { buttonActivePenalty === 'Específicas' && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Tipo de penalización</label>
                  <select className="px-3 py-2 border border-gray-300 rounded">
                    {listPenalties.map(penalty => (
                      <option key={penalty.id} value={penalty.id}>{penalty.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Información de la penalización</label>
                  <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe la información de la penalización" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Panel del sistema relacionado</label>
                  <select className="px-3 py-2 border border-gray-300 rounded">
                    <option>Atender paciente</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 required">Acción del sistema</label>
                  <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="Alerta" />
                </div>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm mt-6">Agregar otra penalización</button>
              </>
            )}
          </form>
        </>
      )}

      { stepActive === 5 && (
        <>
          <div className="mb-2 font-semibold text-gray-700">Movimiento en polizas</div>
          <form className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Aplica Pólizas</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Tipo de movimiento</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                {listPolicyTypes.map(policyType => (
                  <option key={policyType.id} value={policyType.id}>{policyType.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Detalle</label>
              <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe el detalle del movimiento" />
            </div>
          </form>
        </>
      )}

      { stepActive === 6 && (
        <>
          <div className="mb-2 font-semibold text-gray-700">Información general Polizas</div>
          <form className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">ID póliza: 1 - 1</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Tipo (s) de póliza</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option>Seguro de cumplimiento</option>
                <option>Seguro de responsabilidad civil</option>
                <option>Seguro de todo riesgo</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Corredora de seguros</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                {listInsuranceBroker.map(insuranceBroker => (
                  <option key={insuranceBroker.id} value={insuranceBroker.id}>{insuranceBroker.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Asegurador(a)</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                {listInsuranceProviders.map(insuranceProvider => (
                  <option key={insuranceProvider.id} value={insuranceProvider.id}>{insuranceProvider.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Número de póliza</label>
              <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="Número de póliza" defaultValue="3730136" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Fecha de expedición</label>
              <input type="date" className="px-3 py-2 border border-gray-300 rounded" defaultValue="2025-03-11" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Valor póliza</label>
              <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="$2.000.000" defaultValue="$2.000.000" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Valor asegurado</label>
              <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="$250.000.000" defaultValue="$250.000.000" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Fecha de inicio</label>
              <input type="date" className="px-3 py-2 border border-gray-300 rounded" defaultValue="2025-02-10" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Fecha de vencimiento</label>
              <input type="date" className="px-3 py-2 border border-gray-300 rounded" defaultValue="2026-02-09" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Estado de póliza</label>
              <select className="px-3 py-2 border border-gray-300 rounded">
                <option>Vigente</option>
                <option>Vencida</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Adjuntar póliza</label>
              <div className="flex gap-2 items-center">
                <input type="text" className="px-3 py-2 border border-gray-300 rounded flex-1" placeholder="Seleccionar archivo..." readOnly />
                <button type="button" className="px-4 py-2 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Observaciones</label>
              <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe las observaciones" />
            </div>

            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Generar alerta de vencimiento</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Alertar antes de</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" className="px-3 py-2 border border-gray-300 rounded" placeholder="0" />
                <select className="px-3 py-2 border border-gray-300 rounded">
                  <option>Días</option>
                  <option>Meses</option>
                  <option>Años</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Usuario(s) a alertar</label>
              <MultiSelect
                options={listEmployees}
                selectedValues={selectedUsers4}
                onSelectionChange={setSelectedUsers4}
                placeholder="Seleccione usuarios a alertar..."
              />
            </div>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm mt-6">Agregar otra póliza</button>
          </form>
        </>
      )}

      { stepActive === 7 && (
        <>
          <div className="mb-2 font-semibold text-gray-700">Seguimiento del valor del contrato</div>
          <form className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Historial de controversias legales</label>
              <textarea className="px-3 py-2 border border-gray-300 rounded" placeholder="Escribe el historial de controversias legales" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Certificados Legales Vigentes y/o Anexos</label>
              <div className="flex gap-2 items-center">
                <input type="text" className="px-3 py-2 border border-gray-300 rounded flex-1" placeholder="Seleccionar archivo..." readOnly />
                <button type="button" className="px-4 py-2 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
              </div>
            </div>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm mt-6">Agregar certificado</button>
          </form>
        </>
      )}

      { stepActive === 8 && (
        <>
          <div className="mb-2 font-semibold text-gray-700">Seguimiento del valor del contrato</div>
          <form className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" value="true" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-sm text-gray-600">Informar movimiento</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Usuario(s) a alertar</label>
              <MultiSelect
                options={listEmployees}
                selectedValues={selectedUsers5}
                onSelectionChange={setSelectedUsers5}
                placeholder="Seleccione usuarios a alertar..."
              />
            </div>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm mt-6">Agregar plantilla</button>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 underline">Plantilla de Usuario(s) a alertar</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 required">Seleccione usuario(s)</label>
              <MultiSelect
                options={listEmployees}
                selectedValues={selectedUsers6}
                onSelectionChange={setSelectedUsers6}
                placeholder="Seleccione usuarios..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Nombre plantilla</label>
              <input type="text" className="px-3 py-2 border border-gray-300 rounded" placeholder="Nombre de la plantilla" />
            </div>
          </form>
        </>
      )}

      { stepActive > 1 && stepActive < 8 && (
        <button className="bg-blue-400 text-white px-4 py-2 rounded text-sm mt-6" onClick={() => setStepActive(stepActive - 1)}>Atrás</button>
      )}
      { stepActive < 8 && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm mt-6" onClick={() => setStepActive(stepActive + 1)}>Siguiente</button>
      )}
      { stepActive === 8 && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm mt-6">Guardar información</button>
      )}
    </section>
  )
}