'use client'

import { useState, useEffect } from "react";
import LogoutButton from "@/components/logoutButton/logoutButton"; 
import Image from "next/image";

export default function AdminHome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Dados do ParsedUser: ", parsedUser);
        setUserName(parsedUser.name || "Usuário");
      } catch {
        setUserName("Usuário");
      }
    } else {
      setUserName("Usuário");
    }
  }, []);

  return (

    // Adc a tabela e funções de managerPage.html do CRM para cá, 
    // ajustando para o Nextjs...
    // Para as funções da API:
    //  /api/adm -> Registro de ADM
    //  /api/adm/pesquisador -> Administrador cria Pesquisador(a)
    //  /api/admi/enfermeiro -> Administrador cria Enfermeiro(a)

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
            Você está acessando a área administrativa do Sistema HUOC.
          </p>
        </div>
      </div>
        <LogoutButton />
    </div>
  );
}
