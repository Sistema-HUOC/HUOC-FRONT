'use client'

import { useState, useEffect } from "react";
import LogoutButton from "@/components/logoutButton/logoutButton"; 
import Image from "next/image";

export default function DoctorHome() {
  const [userName, setUserName] = useState("");

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
            Você está acessando a área de pesquisadores do Sistema HUOC.
          </p>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
