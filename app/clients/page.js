"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientsService } from "@/services/clientsService";

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    const response = await clientsService.getClient();
    setClients(response.results);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <section className="mx-auto p-8 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-semibold text-gray-700">
          Clientes Modalidad Crédito
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm" onClick={() => router.push('/clients/createCredit')}>
          Agregar cliente - Crédito
        </button>
      </div>
      <div className="rounded mb-6">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="border border-gray-300 px-2 py-2 font-semibold">Nombre social</th>
              <th className="border border-gray-300 px-2 py-2 font-semibold">Documento</th>
              <th className="border border-gray-300 px-2 py-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No hay datos para mostrar.
                </td>
              </tr>
            ) : (
              clients.map((cliente) => (
                <tr key={cliente.id} className="bg-white">
                  <td className="border border-gray-300 px-2 py-2 text-blue-600 underline cursor-pointer">
                    <Link href="/clients/createCredit" className="capitalize">
                      {cliente.name}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">{cliente.document_number}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">
                        <Link href={`/clients/createCredit?id=${cliente.id}`} className="capitalize">
                            Editar
                        </Link>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
