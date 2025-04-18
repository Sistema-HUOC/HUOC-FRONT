import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-bottom px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Div maior com classe personalizada */}
      <div className="container-home1 mb-6">
        
        {/* Div interna com classe personalizada */}
        <div className="container-home2">
          <div className="w-full text-center">
            <h1 className="text-content1 mb-4">Bem-vindo ao Sistema HUOC!</h1>
            <p className="text-content2 text-md mb-6">Otimizamos a gestão e armazenamento de dados clínicos.</p>

            <div className="flex justify-center mb-6">
              <img src="/huoc-system.png" alt="Ícone HUOC" className="h-12" />
            </div>

            <Link href="/login">
              <button className="w-full sm:w-2/3 md:w-1/2 lg:w-1/2 bg-cyan-600 hover:bg-cyan-800 text-white py-2 px-4 rounded-full transition-all">
                <strong><i className="bi bi-box-arrow-in-right"></i> Login</strong>
              </button>
            </Link>

          </div>
        </div>
        
      </div>
    </div>
  );
}
