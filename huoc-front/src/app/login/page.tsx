"use client";

import Link from "next/link";
import Image from "next/image";
import { BiLogIn, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:4000/proxy/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Resposta inválida: ${text}`);
      }

      if (!response.ok) {
        throw new Error("Erro ao logar");
      }

      // Armazena dados do usuário no localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.username,
          name: data.name,
          accessLevel: data.accessLevel,
          userId: data.userId,
          acceptedTerms: true,
        })
      );

      // Redirecionamento baseado no accessLevel
      switch (data.accessLevel) {
        case "ADMINISTRADOR":
          router.push("/managerPage");
          break;
        case "MEDICO":
          router.push("/doctorPage");
          break;
        case "ENFERMAGEM":
          router.push("/nursePage");
          break;
        case "PESQUISADOR":
          router.push("/researcherPage");
          break;
        default:
          router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-bottom px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="container-home1 mb-6 bg-white bg-opacity-90 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <section className="container-home2 flex flex-col items-center">
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

          <h1 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <BiLogIn className="text-cyan-700 text-3xl" />
            Login
          </h1>

          <article className="w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 pr-4 py-2 w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cyan-600">
                    <BiLock className="text-xl" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"} // <-- Muda o type dinamicamente!
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 py-2 w-full border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)} // <-- Toggle no clique
                  >
                    {showPassword ? (
                      <BiHide className="text-xl" />
                    ) : (
                      <BiShow className="text-xl" />
                    )}
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
                    className="text-cyan-600 dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 h-4 w-4"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Lembrar-me
                  </label>
                </div>
                <a href="#" className="text-sm text-cyan-600 hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              {/* Botão */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </article>
        </section>
      </div>
    </main>
  );
}
