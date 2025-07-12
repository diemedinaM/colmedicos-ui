"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clientsService } from "@/services/clientsService";

export default function Legal() {
    const listTabs = [
      'Información general',
      'Grupo empresarial',
      'Información de acuerdos',
      'Información jurídica',
      'Información facturación',
      'Información cartera',
      'Perfiles y protocolos',
      'Tarifas',
      'CECO',
      'Integraciones',
      'Personal de Salud',
      'Contactos del cliente',
      'Usuarios del cliente',
      'Informes dx'
    ];
    const [tabActive, setTabActive] = useState('Información jurídica');
    const [buttonActive, setButtonActive] = useState('Administración de contratos');
    const router = useRouter();
    const [listContracts, setListContracts] = useState([{}, {}]);
    const [listPolicies, setListPolicies] = useState([{}, {}]);

    const getContracts = async () => {
      const response = await clientsService.getClientContract();
      // setListContracts(response.results);
    };

    const getPolicies = async () => {
      const response = await clientsService.getClientPolicy();
      // setListPolicies(response.results);
    };

    useEffect(() => {
      getContracts();
      getPolicies();
    }, []);
  
    return (
      <section className="mx-auto p-8 bg-white rounded-lg shadow">
        <div className="grid grid-cols-14 mb-8">
          {listTabs.map(tab => (
            <button key={tab} className={`px-3 py-1 text-xs font-medium border-b hover:border-blue-400 hover:text-blue-700 hover:cursor-pointer ${tabActive === tab ? 'border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-500'}`} onClick={() => setTabActive(tab)}>{tab}</button>
          ))}
        </div>

        { tabActive === 'Información jurídica' && (
          <>
            <div className="flex mb-4">
              <button type="button" className={`px-6 py-2 text-sm ${buttonActive === 'Administración de contratos' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`} onClick={() => setButtonActive('Administración de contratos')}>Administración de contratos</button>
              <button type="button" className={`px-6 py-2 text-sm ${buttonActive === 'Administración de pólizas' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`} onClick={() => setButtonActive('Administración de pólizas')}>Administración de pólizas</button>
              <button type="button" className={`px-6 py-2 text-sm ${buttonActive === 'Documentos jurídicos' ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`} onClick={() => setButtonActive('Documentos jurídicos')}>Documentos jurídicos</button>
            </div>

            <strong className="font-bold mb-4">{buttonActive} - Cliente</strong>

            { buttonActive === 'Administración de contratos' && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 px-2 py-2 font-semibold">ID Cliente</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Cliente</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Tipo de cliente</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">ID Contrato</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Tipo de vinculación</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Fecha inicio</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Fecha fin</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Prórroga o renovación (contrato)</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Pólizas</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Estado</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {listContracts.map((contract, index) => (
                    <tr className="bg-white" key={index}>
                      <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">807878878</td>
                      <td className="border border-gray-300 px-2 py-2">Cliente Nuevo S.A.S</td>
                      <td className="border border-gray-300 px-2 py-2">Público</td>
                      <td className="border border-gray-300 px-2 py-2">1</td>
                      <td className="border border-gray-300 px-2 py-2">Contrato</td>
                      <td className="border border-gray-300 px-2 py-2">2024/02/13</td>
                      <td className="border border-gray-300 px-2 py-2">2025/07/12</td>
                      <td className="border border-gray-300 px-2 py-2">Automática (Prórroga)</td>
                      <td className="border border-gray-300 px-2 py-2">Sí</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <span className="inline-flex items-center gap-1">
                          <span className="font-semibold">Cliente nuevo</span>
                        </span>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 flex gap-1">
                        <button disabled className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">👁️‍🗨️ Detalle</button>
                        <button disabled className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">🕒 Histórico</button>
                        <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">📄 Contrato</button>
                        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs mr-1" onClick={() => router.push('/legal/recordMovement')}>Registrar movimiento</button>
                        <button disabled className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Registrar contrato</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}

            { buttonActive === 'Administración de pólizas' && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 px-2 py-2 font-semibold">ID Cliente</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Cliente</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Tipo de poliza</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Corredor de seguros</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Aseguradora</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">ID Poliza</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Valor Poliza</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Fecha inicio</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Fecha fin</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Prórroga o renovación (contrato)</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Estado</th>
                    <th className="border border-gray-300 px-2 py-2 font-semibold">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {listPolicies.map((policy, index) => (
                    <tr className="bg-white" key={index}>
                      <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">800226175</td>
                      <td className="border border-gray-300 px-2 py-2">COLMENA SEGUROS S.A.</td>
                      <td className="border border-gray-300 px-2 py-2">Seguro de complimiento</td>
                      <td className="border border-gray-300 px-2 py-2">DAVISA</td>
                      <td className="border border-gray-300 px-2 py-2">SURA</td> 
                      <td className="border border-gray-300 px-2 py-2">1-1</td>
                      <td className="border border-gray-300 px-2 py-2">$2.000.000</td>
                      <td className="border border-gray-300 px-2 py-2">2024/02/13</td>
                      <td className="border border-gray-300 px-2 py-2">2025/07/12</td>
                      <td className="border border-gray-300 px-2 py-2">Automática (Prórroga)</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-yellow-700 font-semibold whitespace-nowrap">Próximo a vencer</span>
                          <div className="relative mr-auto">
                            <span title="Alerta" className="ml-1">🔔</span>
                            <span className="absolute -top-2 -right-4 text-xs px-2 py-0.5"></span>
                          </div>
                        </span>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 flex gap-1">
                        <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">👁️‍🗨️ Detalle</button>
                        <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">🕒 Histórico</button>
                        <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">📄 Contrato</button>
                        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs mr-1" onClick={() => router.push('/legal/recordMovement')}>Registrar movimiento</button>
                        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Registrar contrato</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}

            {buttonActive === 'Documentos jurídicos' && (
              <>
                <div className="border border-gray-300 rounded mb-6">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="border border-gray-300 px-2 py-2 font-semibold">ID Cliente</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Cliente</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Tipo de cliente</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Documentos jurídicos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-2 py-2">800226175</td>
                        <td className="border border-gray-300 px-2 py-2">COLMENA SEGUROS S.A</td>
                        <td className="border border-gray-300 px-2 py-2">Público</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">🔍 Ver documentos jurídicos</button>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Registrar documento</button>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">900341086</td>
                        <td className="border border-gray-300 px-2 py-2">Comercial Nutresa S.A.S.</td>
                        <td className="border border-gray-300 px-2 py-2">Privado</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">🔍 Ver documentos jurídicos</button>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Registrar documento</button>
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-2 py-2">860050906</td>
                        <td className="border border-gray-300 px-2 py-2">Adecco Colombia S.A.</td>
                        <td className="border border-gray-300 px-2 py-2">Privado</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">🔍 Ver documentos jurídicos</button>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Registrar documento</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border border-gray-300 rounded mb-6 p-4 bg-gray-50">
                  <div className="mb-2 font-semibold text-gray-700">Documentos jurídicos</div>
                  <div className="mb-2 text-blue-700 underline cursor-pointer text-sm">Cliente: Adecco Colombia S.A.</div>
                  <table className="min-w-full text-xs mb-4">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Documento</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Archivo</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Fecha de inicio</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Fecha Fin</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Estado</th>
                        <th className="border border-gray-300 px-2 py-2 font-semibold">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-2 py-2">Contrato 1</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">11/10/2019</td>
                        <td className="border border-gray-300 px-2 py-2">10/09/2025</td>
                        <td className="border border-gray-300 px-2 py-2 text-green-700 font-semibold">Vigente</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">Póliza 1</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">10/10/2019</td>
                        <td className="border border-gray-300 px-2 py-2">11/09/2025</td>
                        <td className="border border-gray-300 px-2 py-2 text-green-700 font-semibold">Vigente</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-2 py-2">Consentimiento de tratamiento de datos</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">Acuerdo de confidencialidad firmado</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-2 py-2">Certificaciones legales especiales (si aplica)</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">10/10/2019</td>
                        <td className="border border-gray-300 px-2 py-2">11/09/2025</td>
                        <td className="border border-gray-300 px-2 py-2 text-green-700 font-semibold">Vigente</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 py-2">Certificado de antecedentes disciplinarios o fiscales</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">10/10/2019</td>
                        <td className="border border-gray-300 px-2 py-2">11/09/2024</td>
                        <td className="border border-gray-300 px-2 py-2 text-red-700 font-semibold">Vencido</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border border-gray-300 px-2 py-2">Reclamaciones enviadas / recibidas</td>
                        <td className="border border-gray-300 px-2 py-2 text-blue-700 underline cursor-pointer">Archivo</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2">N/A</td>
                        <td className="border border-gray-300 px-2 py-2 text-center">
                          <span className="inline-flex gap-1">
                            <span title="Editar">✏️</span>
                            <span title="Eliminar">🗑️</span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border border-gray-300 rounded p-4 bg-white">
                  <div className="mb-2 font-semibold text-gray-700">Registrar documentos jurídicos</div>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 required">Nombre del documento</label>
                      <input type="text" className="px-3 py-2 border border-gray-300 rounded" value="Consentimiento de tratamiento de datos" readOnly />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 required">Adjuntar documento</label>
                      <div className="flex gap-2 items-center">
                        <input type="text" className="px-3 py-2 border border-gray-300 rounded flex-1" placeholder="Seleccionar archivo..." readOnly />
                        <button type="button" className="px-4 py-2 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" value="true" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span className="text-sm text-gray-600">Aplica vencimiento</span>
                    </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 required">Fecha de inicio</label>
                      <input type="date" className="px-3 py-2 border border-gray-300 rounded" value="2025-02-09" readOnly />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 required">Fecha de finalización</label>
                      <input type="date" className="px-3 py-2 border border-gray-300 rounded" value="2026-02-09" readOnly />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 required">Estado</label>
                      <select className="px-3 py-2 border border-gray-300 rounded">
                        <option>Vigente</option>
                        <option>Vencido</option>
                      </select>
                    </div>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </section>
    );
}