'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Interruptor from '../../components/interruptor/LoveToggle';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">
            HUOC - Sistema de Coleta de Dados Clínicos
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="mt-3">
            <Interruptor />
          </div>
          <span className="text-black pr-2 border-r-2">Enfermeiro(a)</span>
          <button
            onClick={handleLogout}
            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            title="Sair"
          >
            <div
              className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>

            <div
              className="absolute left-15 transform -translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            >
              Sair
            </div>
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-bottom px-4"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="bg-white bg-opacity-60 rounded-2xl shadow-xl p-10 max-w-3xl w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bem-vindo à Área da Enfermagem
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Olá, {userName}! Você está acessando a área de enfermeiro do Sistema HUOC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/nursePage/newPatients")}
              className="bg-green-600 hover:bg-green-700 text-white text-md font-semibold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 cursor-pointer"
            >
              Pacientes Novos
            </button>

            <button
              onClick={() => router.push("/nursePage/followUpPatients")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-md font-semibold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 cursor-pointer"
            >
              Em Acompanhamento
            </button>

            <button
              onClick={() => router.push('/nursePage/patientRegister')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-md font-semibold py-4 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 cursor-pointer"
              title="Adicionar Paciente">
              <i className="bi bi-person-plus-fill text-lg"></i>
              <span>Cadastrar Paciente</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-gray-800 text-sm">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}
