import Image from "next/image";

export default function AdminHome() {
  const userName = "Fulano"; 

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
            Você está acessando a área administrativa do Sistema HUOC.
          </p>
        </div>
      </div>
    </div>
  );
}
