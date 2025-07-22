"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    label: "1. Clientes",
    submenu: [{
      label: "Credito",
      href: "/clients"
    },
    {
      label: "Panel de Gestión Documental",
      href: "/legal"
    }]
  },
  {
    label: "2. Centros de Costos",
    submenu: [{
      label: "Creación",
      href: "/ceco/create"
    }]
  },
  {
    label: "3. Empleados",
    submenu: [
      {
        label: "Empleados",
        href: "/employees/employees"
      },
      {
        label: "Candidatos",
        href: "/employees/candidates"
      },
      {
        label: "Administradores",
        href: "/employees/administrators"
      }
    ]
  },
  {
    label: "4. Sedes",
    submenu: [{
      label: "Sedes",
      href: "/facilities"
    }]
  },
  {
    label: "5. Configuración",
    submenu: [{
      label: "Grupos de permisos",
      href: "/settings/groups"
    }]
  },
  {
    label: "6. Auditoría",
    submenu: [{
      label: "Registros",
      href: "/core/auditlogs"
    }]
  }
];

export default function LateralMenu() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <nav className="bg-[#335dab] text-white h-screen fixed w-[260px] flex flex-col px-4 py-6">
      <div className="flex justify-center mb-4">
        <Image 
          src="/colmedicos-ui/logo.svg"
          alt="Colmedicos" 
          width={180} 
          height={80}
          priority
        />
      </div>
      <input
        type="text"
        placeholder="Buscar modulo"
        className="w-full px-3 py-2 rounded bg-white text-gray-800 placeholder-gray-400 mb-6 outline-none"
      />
      <div className="flex flex-col gap-1">
        <Link href="/" className="px-2 py-2">
          <span className="text-base font-medium mb-2 font-semibold w-full hover:bg-[#2a4d8a] cursor-pointer">Inicio</span>
        </Link>
        {menuItems.map((item, idx) => (
          <div key={item.label}>
            <button
              type="button"
              className="flex items-center justify-between w-full px-2 py-2 rounded hover:bg-[#2a4d8a] cursor-pointer font-semibold focus:outline-none"
              onClick={() => handleToggle(idx)}
            >
              <span>{item.label}</span>
              <span className={`text-xs font-bold transition-transform material-icons`}>{openIndex === idx ? "expand_less" : "expand_more"}</span>
            </button>
            {openIndex === idx && (
              <div className="ml-4 mt-1 flex flex-col gap-1">
                {item.submenu.map((sub, subIdx) => (
                  <Link
                    key={subIdx}
                    href={sub.href}
                    className="py-1 px-2 rounded hover:bg-[#406bb3] text-sm cursor-pointer"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}