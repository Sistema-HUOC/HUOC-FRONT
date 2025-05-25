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
          <p className="mb-4">Esta Política de Privacidade tem como objetivo informar como seus dados serão coletados, utilizados e protegidos no âmbito da pesquisa acadêmica conduzida pela Universidade de Pernambuco. Nos comprometemos com a segurança e privacidade das informações fornecidas, conforme as normas da <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>.</p>

          <p className="mb-4"><strong>2. Dados Coletados</strong></p>
          <p className="mb-4">Durante a pesquisa, poderemos coletar os seguintes dados pessoais e/ou sensíveis:</p>
          <p className="mb-4">1.	Informações clínicas (como diagnósticos, exames, histórico médico);</p>
          <p className="mb-4">2.	Dados demográficos (idade, gênero, etc.);</p>
          <p className="mb-4">3.	Outros dados relevantes para a pesquisa. </p>
          <p className="mb-4">Sempre que possível, utilizaremos dados anonimizados, impossibilitando a identificação direta dos participantes.</p>

          <p className="mb-4"><strong>3. Finalidade do Tratamento dos Dados</strong></p>
          <p className="mb-4">Os dados coletados serão utilizados exclusivamente para fins acadêmicos e de pesquisa, incluindo:</p>
          <p className="mb-4">1.	Análise estatística e estudos epidemiológicos;</p>
          <p className="mb-4">2.	Desenvolvimento de artigos e publicações científicas;</p>
          <p className="mb-4">3.	Aprimoramento de práticas médicas com fins de padronização de prontuários dos pacientes, avanço do conhecimento científico e melhorar o acompanhamento ao longo das consultas.</p>

          <p className="mb-4"><strong>4. Base Legal para o Tratamento</strong></p>
          <p className="mb-4">O tratamento dos dados é realizado com fundamento no <strong>Art. 7º, IV da LGPD</strong>, que permite a utilização de dados pessoais para a <strong>realização de estudos por órgãos de pesquisa</strong>. Caso os dados não possam ser anonimizados, poderá ser solicitado o <strong>consentimento do titular (Art. 7º, I da LGPD)</strong>.</p>

          <p className="mb-4"><strong>5. Compartilhamento de Dados</strong></p>
          <p className="mb-4">Os dados não serão compartilhados com terceiros fora do escopo da pesquisa, exceto:</p>
          <p className="mb-4">1.	Quando exigido por obrigação legal;</p>
          <p className="mb-4">2.	Com instituições parceiras que participem da pesquisa, garantindo a segurança e sigilo das informações.</p>

          <p className="mb-4"><strong>6. Armazenamento e Proteção dos Dados</strong></p>
          <p className="mb-4">Os dados serão armazenados em ambiente seguro e protegidos contra acessos não autorizados. Medidas de segurança incluem:</p>
          <p className="mb-4">1.	Criptografia e controle de acesso;</p>
          <p className="mb-4">2.	Restrição de uso apenas por pesquisadores autorizados.</p>

          <p className="mb-4"><strong>7. Direitos dos Titulares</strong></p>
          <p className="mb-4">Os participantes da pesquisa podem exercer seus direitos previstos na LGPD, incluindo:</p>
          <p className="mb-4">1.	Solicitar acesso aos seus dados;</p>
          <p className="mb-4">2.	Corrigir informações incorretas;</p>
          <p className="mb-4">3.	Revogar consentimento (quando aplicável);</p>
          <p className="mb-4">4.	Solicitar a exclusão dos dados pessoais.</p>

          <p className="mb-4"><strong>8. Contato</strong></p>
          <p className="mb-4">Perguntas, comentários ou reclamações sobre está Política entre em contato conosco através do e-mail: <a className="text-cyan-700 underline" href="mailto:olimpico@palmares.ifpe.edu.br">olimpico@palmares.ifpe.edu.br</a></p>

          <p className="mb-4">Esta Política de Privacidade pode ser atualizada conforme necessário.</p>

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
