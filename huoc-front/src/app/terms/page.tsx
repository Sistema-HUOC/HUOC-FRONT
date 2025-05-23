'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TermsPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch("/api/accept-terms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    if (res.ok) {
      user.acceptedTerms = true;
      localStorage.setItem("user", JSON.stringify(user));

      // Redirecionar para página correta:
      switch (user.email) {
        case "admin@email.com":
          router.push("/managerPage");
          break;
        case "doctor@email.com":
          router.push("/doctorPage");
          break;
        case "nurse@email.com":
          router.push("/nursePage");
          break;
        case "researcher@email.com":
          router.push("/researcherPage");
          break;
        default:
          router.push("/");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-50 to-white p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
          Política de Privacidade
        </h1>

        <div className="h-96 overflow-y-scroll p-6 border border-gray-300 rounded-lg mb-6 bg-gray-50 text-justify text-gray-700 leading-relaxed text-base scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-200">
          <p className="mb-4"><strong>1. Introdução</strong></p>
          <p className="mb-4">Esta Política de Privacidade tem como objetivo informar como seus dados serão coletados, utilizados e protegidos no âmbito da pesquisa acadêmica conduzida por [Nome da Instituição/Grupo de Pesquisa]...</p>

          <p className="mb-4"><strong>2. Dados Coletados</strong></p>
          <p className="mb-4">Durante a pesquisa, poderemos coletar informações clínicas, dados demográficos e outros dados relevantes. Sempre que possível, os dados serão anonimizados...</p>

          <p className="mb-4"><strong>3. Finalidade</strong></p>
          <p className="mb-4">Os dados serão utilizados exclusivamente para fins acadêmicos e de pesquisa científica, análise estatística e aprimoramento de práticas médicas...</p>

          <p className="mb-4"><strong>4. Base Legal</strong></p>
          <p className="mb-4">Nos baseamos no Art. 7º da LGPD. Caso os dados não sejam anonimizáveis, solicitaremos consentimento do titular...</p>

          <p className="mb-4"><strong>5. Compartilhamento</strong></p>
          <p className="mb-4">Os dados não serão compartilhados fora do escopo da pesquisa, exceto se exigido legalmente ou com parceiros que garantam segurança...</p>

          <p className="mb-4"><strong>6. Armazenamento</strong></p>
          <p className="mb-4">Dados armazenados em ambiente seguro, com criptografia e acesso restrito a pesquisadores autorizados...</p>

          <p className="mb-4"><strong>7. Direitos dos Titulares</strong></p>
          <p className="mb-4">Você pode solicitar acesso, correção ou exclusão de seus dados, além de revogar o consentimento, conforme a LGPD...</p>

          <p className="mb-4"><strong>8. Contato</strong></p>
          <p className="mb-4">Dúvidas? Fale conosco via e-mail: <a className="text-cyan-700 underline" href="mailto:olimpico@palmares.ifpe.edu.br">olimpico@palmares.ifpe.edu.br</a></p>

          <p className="text-sm text-gray-500">Instituto Federal de Pernambuco — 30/03/2025</p>
        </div>

        <label className="flex items-center space-x-3 mb-6">
          <input
            type="checkbox"
            className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500 transition duration-300 cursor-pointer"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            Li e aceito a política de privacidade.
          </span>
        </label>

        <button
          onClick={handleAccept}
          disabled={!accepted}
          className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition duration-300 cursor-pointer ${accepted
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Aceitar e continuar
        </button>
      </div>
    </main>
  );
}
