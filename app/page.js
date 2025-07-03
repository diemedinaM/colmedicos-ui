import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="bg-[#335dab] rounded-2xl p-12 flex flex-col items-center justify-center min-h-[500px] w-full max-w-5xl mx-auto mt-6 shadow">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-6">
            <Image 
              src="/colmedicos-ui/logo.svg" 
              alt="Sofia Logo" 
              width={250} 
              height={128}
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">¡Bienvenido a Sofia!</h1>
          <p className="text-lg text-white/80 mb-8 text-center max-w-2xl">
            Tu plataforma integral para la gestión médica y administrativa. Aquí puedes gestionar pacientes, citas, historiales y mucho más.
          </p>
          <div className="flex gap-4 mb-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#6c6cf4] font-semibold rounded-full shadow hover:bg-gray-100 transition">
              <span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 3v7a6 6 0 0 0 12 0V3" stroke="#6c6cf4" strokeWidth="2" strokeLinecap="round"/><circle cx="18" cy="19" r="3" stroke="#6c6cf4" strokeWidth="2"/><path d="M18 16v-2a6 6 0 0 1-12 0v2" stroke="#6c6cf4" strokeWidth="2"/></svg>
              </span>
              Sistema Médico
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#6c6cf4] font-semibold rounded-full shadow hover:bg-gray-100 transition">
              <span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 0 1 4-4h2m4 0h2a4 4 0 0 1 4 4v2" stroke="#6c6cf4" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke="#6c6cf4" strokeWidth="2"/></svg>
              </span>
              Gestión Integral
            </button>
          </div>
          <div className="text-white/70 text-sm flex items-center gap-2">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Último acceso: 3 de julio de 2025, 14:27
          </div>
        </div>
      </div>
    </main>
  );
}
