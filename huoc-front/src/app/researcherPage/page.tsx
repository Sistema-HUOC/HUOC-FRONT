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
          <div className="flex items-center gap-3">
            <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
            <h1 className="text-lg font-semibold text-gray-800">
              HUOC - Sistema de Coleta de Dados Clínicos
            </h1>
          </div>

          {/* Botões do lado direito */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/researcherPage/data-export')}
              className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
              title="Exportar Dados">
              <span>Exportar Dados</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
              title="Sair">
              Sair
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
