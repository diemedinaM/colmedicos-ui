"use client";
import { useState, useEffect } from "react";
import { commonService } from "@/services/commonService";

export default function CreateCeco() {
  const [pageActive, setPageActive] = useState(1);
  const [tabActive, setTabActive] = useState('Individual');
  const [listCity, setListCity] = useState([]);
  const fields = [
    {
      name: 'Razón Social',
      description: 'Nombre legal de la empresa cliente',
    },
    {
      name: 'Municipio',
      description: 'Ciudad de atención a prestación del servicio',
    },
    {
      name: 'Tipo de examen',
      description: 'Tipo de examen preocupaciónal',
    },
    {
      name: 'Paraclínicos',
      description: 'Exámenes complementarios (Ej: Audiometría espirometría)',
    },
    {
      name: 'Código',
      description: 'Código interno',
    },
    {
      name: 'Empresa usuaria',
      description: 'Empresa que hace uso del servicio',
    },
    {
      name: 'Regional',
      description: 'Regional de operación (Ej: Norte Sur Centro)',
    },
    {
      name: 'Proceso',
      description: 'Área interna de la empresa (Ej: Producción logística administración)',
    },
    {
      name: 'Planta',
      description: 'Lugar de operación de la empresa',
    },
    {
      name: 'Unidad de negocio',
      description: 'Departamento o sección especifica de la empresa',
    },
    {
      name: 'Plantilla',
      description: 'Número identificador de un Centro de costos',
    },
    {
      name: 'Atención especial',
      description: 'Servicio con un descuento especifico',
    }
  ]

  const getCity = async () => {
    const response = await commonService.getCity();
    setListCity(response.results);
  };

  useEffect(() => {
    getCity();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Creación de Centro de Costos para: -</h1>
      {pageActive === 1 && (
        <section className="flex flex-col gap-4">
          <div className="bg-gray-50 border border-gray-300 rounded p-4">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {fields.map((field, index) => (
                <div className="col-span-1" key={index}>
                  <div className="text-xs font-semibold mb-1">Campo {index + 1}</div>
                  <button className="w-full text-md bg-white border border-blue-500 text-blue-700 rounded px-2 py-1 mb-1">{field.name}</button>
                  <div className="text-xs text-gray-500">{field.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <section>
              <header className="bg-blue-500 text-white p-2 ">
                <h2>Seleccionar campos para la estructura del centro de costos</h2>
              </header>
              <div className="grid gap-4 bg-white">
                <ul>
                    {fields.map((field, index) => (
                        <li key={index} className="flex items-center justify-between text-md px-4 py-1 border-b border-gray-200 w-full">
                            {field.name}
                            <div className="flex gap-2">
                                <button className="p-1 rounded text-xs">
                                    <i className="material-icons">add</i>
                                </button>
                                <button className="p-1 rounded text-xs">
                                    <i className="material-icons">delete</i>
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
              </div>
            </section>
            <section>
              <header className="bg-blue-500 text-white p-2 rounded-t">
                <h2>Seleccionar el orden de los campos</h2>
              </header>
              <div className="grid gap-4 bg-white">
                <ul>
                    {fields.map((field, index) => (
                        <li key={index} className="flex gap-2 items-center justify-between text-md px-4 h-[45px] border-b border-gray-200 w-full">
                            <strong>{index + 1}</strong>
                            <select key={index} className="w-full rounded px-2 py-2" disabled={index === 0}>
                                <option value={field.name}>{field.name}</option>
                            </select>
                        </li>
                    ))}
                </ul>
              </div>
            </section>
          </div>
        </section>
      )}
      {pageActive === 2 && (
        <section className="mx-auto p-8 bg-white rounded-lg shadow">
            <h2>Diligenciar campos</h2>
            <div className="grid grid-cols-14 my-4">
                {['Individual', 'Masivo'].map(tab => (
                    <button key={tab} type="button" className={`px-6 py-2 text-sm ${tabActive === tab ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-700 border-gray-300'}`} onClick={() => setTabActive(tab)}>{tab}</button>
                ))}
            </div>

            {tabActive === 'Individual' && (
                <>
                    <form className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 required">Razón social</label>
                            <input type="text" placeholder="Ingrese la razón social" className="flex-1 px-3 py-2 border border-gray-300 rounded w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 required">Código</label>
                            <input type="text" placeholder="Ingrese el código" className="flex-1 px-3 py-2 border border-gray-300 rounded w-full"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 required">Municipio</label>
                            <select className="w-full rounded px-2 py-2 border border-gray-300">
                                {listCity.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <div className="bg-gray-50 border border-gray-300 rounded p-4 text-center flex flex-col gap-2">
                        <h3>Previsualización de la estructura</h3>
                        <div className="grid grid-cols-1 gap-4 p-2 bg-gray-400 rounded text-white w-auto mx-auto px-4">
                            JIRO SAS / 01 / TULUA
                        </div>
                    </div>
                </>
            )}
            {tabActive === 'Masivo' && (
                <>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center justify-center gap-2 w-full">
                        <i className="material-icons">download</i>
                        Descargar plantilla de la estructura
                    </button>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 required">Adjuntar Archivo</label>
                        <div className="flex items-center gap-2">
                        <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded" placeholder="Adjuntar archivo" />
                        <input type="file" className="hidden" id="fileRut" />
                        <button type="button" className="px-6 py-3 bg-gray-200 rounded border border-gray-300 text-xs" onClick={() => document.getElementById('fileRut').click()}>Subir</button>
                        </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-300 rounded p-4 text-center flex flex-col gap-2 mt-4">
                        <h3>Previsualización de la estructura</h3>
                        <div className="grid grid-cols-1 gap-2 p-2 bg-gray-400 rounded text-white w-auto mx-auto px-4">
                            <span>JIRO SAS / 01 / TULUA</span>
                            <span>JIRO SAS / 02 / CHOC</span>
                            <span>JIRO SAS / 03 / TUNJA</span>
                        </div>
                    </div>
                </>
            )}
        </section>
      )}
      {pageActive === 3 && (
        <section className="mx-auto p-8 bg-white rounded-lg shadow w-full">
            <h2>Tipo de configuración</h2>
            <div className="flex flex-col gap-2 my-4">
                <strong>¿Cómo deseas configurar el/los Centro(s) de Costos?</strong>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <input type="radio" className="w-4 h-4 border border-gray-300 rounded" />
                        <label className="text-sm font-medium text-gray-700">Configurar manualmente</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" className="w-4 h-4 border border-gray-300 rounded" />
                        <label className="text-sm font-medium text-gray-700">Replicar configuración de la Razón social</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" className="w-4 h-4 border border-gray-300 rounded" />
                        <label className="text-sm font-medium text-gray-700">Replicar configuración de un centro de costos ya existente</label>
                    </div>
                </div>
            </div>
        </section>
      )}
      {pageActive === 4 && (
        <section className="mx-auto p-8 bg-white rounded-lg shadow w-full flex flex-col gap-2">
            <strong>Configuración</strong>
            {tabActive === 'Individual' && (
                <>
                    <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value="true" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="text-sm text-gray-600">Habilitar en Sedes Propias:</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <select className="w-full rounded px-2 py-2 border border-gray-300">
                            <option value="Medellín">Medellín</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value="true" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="text-sm text-gray-600">Habilitar en Red de Servicios:</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <select className="w-full rounded px-2 py-2 border border-gray-300">
                            <option value="Armenia">Armenia</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value="true" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="text-sm text-gray-600">Habilitar en Unidades de negocio:</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <select className="w-full rounded px-2 py-2 border border-gray-300">
                            <option value="Prevención de salud">Prevención de salud</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" value="true" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="text-sm text-gray-600">Habilitar para Modalidades de atención:</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <select className="w-full rounded px-2 py-2 border border-gray-300">
                            <option value="Extramural">Extramural</option>
                        </select>
                    </div>



                    <section className="flex flex-col gap-2 mt-8">
                        <strong>Re configurar información</strong>
                        <div className="flex items-start gap-2 bg-gray-200 p-2 rounded my-2">
                            <i className="material-icons">check</i>
                            <span>Aquí puede personalizar cada parámetro del proceso si no deseas replicar la información de la razón social en este Centro de Costos.</span>
                        </div>

                        <strong>Seleccionar las secciones que deseas configurar:</strong>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
                                <label className="text-sm font-medium text-gray-700 grid grid-cols-[130px_auto] gap-2">
                                    Ayudas de atención
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                        Configurar
                                    </button>
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
                                <label className="text-sm font-medium text-gray-700 grid grid-cols-[130px_auto] gap-2">
                                    Tarifas
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                        Configurar
                                    </button>
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
                                <label className="text-sm font-medium text-gray-700 grid grid-cols-[130px_auto] gap-2">
                                    Perfiles de carga
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                        Configurar
                                    </button>
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded" />
                                <label className="text-sm font-medium text-gray-700 grid grid-cols-[130px_auto] gap-2">
                                    Protocolos
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                        Configurar
                                    </button>
                                </label>
                            </div>
                        </div>
                        
                    </section>
                </>
            )}
            {tabActive === 'Masivo' && (
                <>
                    <div className="flex flex-col gap-2 my-4">
                        <strong>Replicar información de la configuración de un centro de costos</strong>
                        <div className="flex flex-col gap-2">
                            <label className="block text-sm font-medium text-gray-700">Seleccionar plantilla ID</label>
                            <div className="grid grid-cols-[1fr_auto] gap-4">
                                <select className="w-full rounded px-2 py-2 border border-gray-300">
                                    <option value="300">300</option>
                                </select>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm">
                            <th className="border border-gray-300 px-2 py-2 font-semibold">Centro de costos</th>
                            <th className="border border-gray-300 px-2 py-2 font-semibold">N° Plantilla</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                                <td className="border border-gray-300 px-2 py-1">
                                    JIRO SAS / 01 / TULUA
                                </td>
                                <td className="border border-gray-300 px-2 py-1">
                                    <input type="text" className="w-full rounded px-2 py-2" value="300" />
                                </td>
                            </tr>
                        </tbody>
                        </table>
                </>
            )}
        </section>
      )}

      <div className="flex justify-end gap-4">
        {pageActive > 1 && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setPageActive(pageActive - 1)}>
                Anterior
            </button>
        )}
        {pageActive < 4 && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setPageActive(pageActive + 1)}>
                Siguiente
            </button>
        )}
        {pageActive === 4 && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Crear
            </button>
        )}
      </div>
    </div>
  );
}