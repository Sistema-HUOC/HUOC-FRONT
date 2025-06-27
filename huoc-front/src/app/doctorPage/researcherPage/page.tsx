"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DashboardCharts = dynamic(() => import('../../../components/dashboard/Dashboard'), {
  ssr: false,
});

import Interruptor from '../../../components/interruptor/LoveToggle';

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


  return (
    <div className="bg-gray-50 bg-cover bg-bottom" >
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">
            HUOC - Sistema de Coleta de Dados Clínicos
          </h1>
        </div>

        {/* Botões do lado direito */}
        <div className="flex items-center gap-3">
          <div className="mt-3">
            <Interruptor />
          </div>

          {/* 👤 Nome do usuário */}
          {userName && (
            <span className="text-sm text-gray-700 font-medium border-r-2 pr-2">
              Pesquisador: <span className="text-blue-700 font-semibold">{userName}</span>
            </span>
          )}

          <button
            onClick={() => router.push('/doctorPage/data-export')}
            className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
            title="Exportar Dados"
          >
            <span>Exportar Dados</span>
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
