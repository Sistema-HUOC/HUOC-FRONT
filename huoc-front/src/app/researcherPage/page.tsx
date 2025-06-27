"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DashboardCharts = dynamic(() => import('../../components/dashboard/Dashboard'), {
  ssr: false,
});

export default function ResearcherHome() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Usuário");
      } catch {
        setUserName("Usuário");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');

    router.push('/login');
  };

  return (
    <div className="bg-gray-50 bg-cover bg-bottom" >
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        {/* Logo e título */}
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">
            HUOC - Sistema de Coleta de Dados Clínicos
          </h1>
        </div>

        {/* Nome do usuário e botões */}
        <div className="flex items-center gap-5">
          {/* 👤 Nome do usuário */}
          {userName && (
            <span className="text-sm text-gray-700 font-medium">
              Olá, <span className="text-blue-700 font-semibold">{userName}</span>
            </span>
          )}

          {/* Botão Exportar Dados */}
          <button
            onClick={() => router.push('/researcherPage/data-export')}
            className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
            title="Exportar Dados"
          >
            <span>Exportar Dados</span>
          </button>

          {/* Botão Sair */}
          <button
            onClick={handleLogout}
            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            title="Sair"
          >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            </div>
            <div className="absolute left-15 transform -translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Sair
            </div>
          </button>
        </div>
      </header>
      
      {/* Main */}
      <main className="flex flex-col items-center p-10 justify-center py-6 bg-gray-50 min-h-screen bg-cover bg-bottom" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <DashboardCharts />
      </main>

      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-sm text-gray-800">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}
