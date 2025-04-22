import Link from "next/link";
import Image from "next/image";
import { BiLogIn, BiEnvelope, BiLock, BiShow } from "react-icons/bi";

export default function LoginPage() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-bottom px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Div maior com classe personalizada */}
      <div className="container-home1 mb-6 bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* Div interna com classe personalizada */}
        <section className="container-home2 flex flex-col items-center">

          {/* Logo com Link para a página inicial */}
          <Link href="/">
            <figure className="mb-4 cursor-pointer hover:opacity-80 transition-all">
              <Image
                src="/huoc-system.png"
                alt="HUOC System Logo"
                width={50}
                height={50}
                className="h-12"
              />
            </figure>
          </Link>

          {/* Título */}
          <h1 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <BiLogIn className="text-cyan-700 text-3xl" />
            Login
          </h1>

          {/* Formulário de login */}
          <article className="w-full">
            <form className="flex flex-col gap-4">

              {/* Campo de E-mail */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cyan-600">
                    <BiEnvelope className="text-xl" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Campo de Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cyan-600">
                    <BiLock className="text-xl" />
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer">
                    <BiShow className="text-xl" />
                  </span>
                </div>
              </div>

              {/* Lembrar e Esqueci */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Lembrar-me
                  </label>
                </div>

                <a href="#" className="text-sm text-cyan-600 hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              {/* Botão de Entrar */}
              <button
                type="submit"
                className="mt-4 w-full bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Entrar
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}
