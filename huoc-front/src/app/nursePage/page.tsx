'use client'

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
    router.push("/nursePage/clinicalForm"); 
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-bottom px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="container-home1 mb-6">
        <div className="container-home2 text-center">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/huoc-system.png" alt="Ícone HUOC" width={60} height={48} className="h-12" />
          </div>

          {/* Título */}
          <h1 className="text-content1 text-2xl font-bold mb-2">
            Olá, {userName}!
          </h1>
          <p className="text-content2 text-md mb-6">
            Você está acessando a área de enfermeiros do Sistema HUOC.
          </p>

          <button
            onClick={handleNavigateToForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Preencher Sintomas Clínicos
          </button>

        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
