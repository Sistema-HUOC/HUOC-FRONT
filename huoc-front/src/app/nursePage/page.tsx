'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logoutButton/logoutButton";
import Image from "next/image";

export default function NurseHome() {
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

  const handleNavigateToForm = () => {
    router.push("/nursePage/centralNurse");
  };

  const handleLogout = () => {
    // Aqui você pode limpar o token/cookie/localStorage
    localStorage.removeItem('token'); // ou o nome que você estiver usando

    // Redirecionar para a tela de login
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">HUOC - Sistema de Coleta de Dados Clínicos</h1>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
          title="Sair"
        >
          Sair
        </button>
      </header>

      <main
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-bottom px-4"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="bg-white bg-opacity-60 rounded-2xl shadow-xl p-10 max-w-3xl w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bem-vindo à Área da Enfermagem
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Você está acessando o Sistema HUOC - Coleta de Dados Clínicos.
          </p>

          <button
            onClick={handleNavigateToForm}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg transition-all"
          >
            
            Visualizar Pacientes
          </button>
          
        </div>

        
      </main>


      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-gray-800 text-sm">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}
