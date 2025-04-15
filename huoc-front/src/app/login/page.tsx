import Link from "next/link";

export default function login() {
    return (
    <div className="flex flex-col justify-center items-center h-screen">
      
      <h1 className="text-3xl font-medium drop-shadow-lg mb-4">
        Página de Autenticação
      </h1>

      <Link href="/">
        <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all">
            <strong><i className="bi bi-arrow-left-circle"></i> Voltar</strong>
        </button>
      </Link>
      
    </div>
    )
}