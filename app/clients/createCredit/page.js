"use client";

import { useState } from "react";

export default function CreateCredit() {
  const listTabs = [
    'Información general',
    'Grupo empresarial',
    'Información de acuerdos',
    'Información jurídica',
    'Información facturación',
    'Información cartera',
    'Tarifas',
    'CECO',
    'Perfiles de cargo',
    'Protocolos',
    'Ayudas de atención',
    'Integraciónes',
    'Personal de Salud',
    'Contactos del cliente',
    'Usuarios del cliente',
    'Informes dx',
    'Relaciónamiento'
  ];
  const [tabActive, setTabActive] = useState('Información general');

  return (
    <section className="mx-auto p-8 bg-white rounded-lg shadow">
      <div className="flex items-center mb-10">
        {[1,2,3,4,5,6].map((step, idx) => (
          <div key={step} className={`flex items-center ${step == 6 ? 'w-auto' : 'w-full'}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step <= 3 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-300'}`}>{step}</div>
            {step < 6 && (
              <div className={`flex-1 h-1 ${step < 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-17 mb-8">
        {listTabs.map(tab => (
          <button key={tab} className={`px-3 py-1 text-xs font-medium border-b hover:border-blue-400 hover:text-blue-700 hover:cursor-pointer ${tabActive === tab ? 'border-blue-400 text-blue-700' : 'bg-white border-gray-300 text-gray-500'}`} onClick={() => setTabActive(tab)}>{tab}</button>
        ))}
      </div>

      { tabActive === 'Información general' && (
        <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 required">RUT</label>
                  <div className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el RUT" />
                  <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                  </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 required">Cámara de comercio</label>
                  <div className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el número de cámara de comercio" />
                  <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                  </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de documento</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>NIT</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Documento</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="900889905" readOnly />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Dígito de verificación</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="2" readOnly />
            </div>

            </div>

            <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de Contribuyente</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Persona Jurídica</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de régimen</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Común</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Responsabilidad fiscal</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>No Responsable</option>
                </select>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Razón social</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese la razón social" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de sociedad</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option>S.A.S.</option>
                </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre comercial</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="METIS" readOnly />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Actividad económica</label>
                    <div className="grid grid-cols-[1fr_4fr] gap-4">
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="6202" readOnly />
                    <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option>Actividades de consultoría informática y administración de instalaciones informáticas</option>
                    </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Sector económico</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option>Sector tecnología y comunicaciones</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">País</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Colombia</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Región</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Antioquia</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Municipio</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Medellín</option>
                </select>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Dirección</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese la dirección" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Codificación DIAN</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="CL 50 46 36" readOnly />
            </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Correo electrónico reportado en el RUT</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" value="info@colmedicos.com" readOnly />
                </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Teléfono reportado en el RUT</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="3127811049" readOnly />
            </div>
            </div>

            <div className="grid grid-cols-1">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de empleados*</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded" value="200" readOnly />
            </div>
            </div>

            <hr className="my-4" />

            <strong className="font-bold mb-1">Representante legal</strong>
            <div className="grid grid-cols-1">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Documento</label>
                    <div className="flex items-center gap-2">
                    <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Sube el documento" />
                    <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Tipo de documento</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded">
                        <option>Cédula de ciudadanía</option>
                    </select>
                </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Numero de Identificación</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" value="3127811049" readOnly />
            </div>
            </div>
            <div className="grid grid-cols-1">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 required">Nombre Completo</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Ingrese el nombre completo" />
                </div>
            </div>
            <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-sm">+ Agregar representante legal</button>

            <hr className="my-4" />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ARL</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded">
                        <option>SURA</option>
                    </select>
                </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Corredor de seguros</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option>Alianz</option>
                </select>
            </div>
            </div>
        </form>
      )}

      { tabActive === 'Grupo empresarial' && (
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">La empresa pertenece a un grupo empresarial</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Si</option>
              <option>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Grupo empresarial</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Nombre de grupo empresarial</option>
              <option>Nombre de grupo empresarial</option>
            </select>
          </div>
        </form>
      )}

      { tabActive === 'Información de acuerdos' && (
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Require Red de Servicios</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Si</option>
              <option>No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Require activar Red Restringida</label>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Ciudades Restringidas</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Require bloquear ciudades de la Red de servicios estándar</label>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Ciudades Restringidas</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Tiene restricción para atención en productos</label>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Ciudades Restringidas</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Se autoriza separación de citas en sede VIP</label>
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
            </div>
          </div>

          <hr className="my-4" />
          
          <strong className="font-bold mb-1">Modalidades de atención</strong>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Requiere servicios en Extramural</label>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
              <div className="grid grid-cols-[4fr_2fr] gap-2">
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                  <option>Selecciona modalidad de atención</option>
                </select>
                <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm">+ Agregar modalidad de atención</button>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          
          <strong className="font-bold mb-1">Unidades de negocio</strong>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Requiere servicios en Prevención en Salud</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded">
              <option>Si</option>
              <option>No</option>
            </select>              
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 required">Requiere servicios en Q&Darte</label>
            <div className="grid grid-cols-[1fr_4fr] gap-4">
              <select className="w-full px-3 py-2 border border-gray-300 rounded">
                <option>Si</option>
                <option>No</option>
              </select>
              <div className="grid grid-cols-[4fr_2fr] gap-2">
                <select className="w-full px-3 py-2 border border-gray-300 rounded">
                  <option>Selecciona unidad de negocio</option>
                </select>
                <button type="button" className="px-6 py-2 bg-gray-200 rounded border border-gray-300 text-sm">+ Agregar unidad de negocio</button>
              </div>
            </div>
          </div>

        </form>
      )}

      { tabActive === 'Información jurídica' && (
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Documento que regula la relación comercial</label>
                <div className="flex items-center gap-2">
                <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Sube el documento" />
                <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Certificados legales vigentes y/o anexos</label>                
                <div className="flex items-center gap-2">
                  <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Sube el certificado" />
                  <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">Subir</button>
                </div>
                <button type="button" className="w-full mt-2 px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs">+ Agregar certificado</button>
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
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 required">Área Responsable</label>
                <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded w-full" placeholder="Juridica" disabled />
            </div>
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

      <div className="flex flex-col gap-4 justify-end mt-8">
        <div className="flex gap-2 justify-end">
          <button type="button" className="px-6 py-2 bg-blue-300 text-white rounded border border-gray-300 text-sm">Anterior</button>
          <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded border border-gray-300 text-sm">Siguiente</button>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded border border-gray-300 text-sm">Guardar</button>
          <button type="button" className="px-6 py-2 bg-blue-400 text-white rounded border border-gray-300 text-sm">Guardar y seguir editando</button>
        </div>
      </div>
    </section>
  );
}