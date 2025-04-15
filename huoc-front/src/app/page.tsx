import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      
      <h1 className="text-3xl font-medium drop-shadow-lg mb-4">
        Página de Início
        </h1>

        <Link href="/login">
        <button className="px-6 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-800 transition-all">
          <strong><i className="bi bi-box-arrow-in-right"></i> Ir para Login</strong>
        </button>
      </Link>
      
    </div>
  )
}
