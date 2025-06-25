"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LogoutButton from "@/components/logoutButton/logoutButton";
import { accessEndpointMap, AccessLevel } from "./access";
import React from "react";

/* -------------------------------------------------------------------------- */
/*  DATA / UTIL                                                               */
/* -------------------------------------------------------------------------- */

const accessOptions = [
  { value: "ADMINISTRADOR", label: "Administrador" },
  { value: "MEDICO", label: "Médico" },
  { value: "ENFERMAGEM", label: "Enfermeiro" },
  { value: "PESQUISADOR", label: "Pesquisador" },
];

/* -------------------------------------------------------------------------- */
/*  EXTRA FIELDS COMPONENT                                                    */
/* -------------------------------------------------------------------------- */

function ExtraFields({ level }: { level: AccessLevel }) {
  switch (level) {
    case "MEDICO":
      return (
        <>
          <div className="mb-3">
            <label className="block text-gray-700">CRM</label>
            <input
              name="crm"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-gray-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700">
              Especializações (vírgulas)
            </label>
            <input
              name="especializacoes"
              type="text"
              placeholder="Clínica, Cardiologia…"
              className="w-full p-2 border border-gray-300 rounded text-gray-500"
            />
          </div>
        </>
      );

    case "ENFERMAGEM":
      return (
        <div className="mb-3">
          <label className="block text-gray-700">COREN</label>
          <input
            name="coren"
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-gray-500"
            required
          />
        </div>
      );

    case "PESQUISADOR":
      return (
        <>
          <div className="mb-3">
            <label className="block text-gray-700">Instituição (ID)</label>
            <input
              name="idInstituicao"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-gray-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-700">
              Áreas de Atuação (IDs, vírgulas)
            </label>
            <input
              name="idAreasAtuacao"
              type="text"
              placeholder="id1,id2,id3"
              className="w-full p-2 border border-gray-300 rounded text-gray-500"
            />
          </div>
        </>
      );

    default:
      return null; // ADMINISTRADOR não tem extras
  }
}

/* -------------------------------------------------------------------------- */
/*  COMMON FIELDS (nome, cpf, etc.)                                           */
/* -------------------------------------------------------------------------- */

function CommonFields() {
  return (
    <>
      <div className="mb-3">
        <label className="block text-gray-700">Nome</label>
        <input
          name="nome"
          type="text"
          className="w-full p-2 border border-gray-300 rounded text-gray-500"
          required
        />
      </div>

      {/* <div className="mb-3">
        <label className="block text-gray-700">Data de Nascimento</label>
        <input
          name="nascimento"
          type="date"
          className="w-full p-2 border border-gray-300 rounded text-gray-500"
          required
        />
      </div> */}

      <div className="mb-3">
        <label className="block text-gray-700">CPF</label>
        <input
          name="cpf"
          type="text"
          maxLength={14}
          className="w-full p-2 border border-gray-300 rounded text-gray-500"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">E-mail</label>
        <input
          name="email"
          type="email"
          className="w-full p-2 border border-gray-300 rounded text-gray-500"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-gray-700">Senha</label>
        <input
          name="password"
          type="password"
          className="w-full p-2 border border-gray-300 rounded text-gray-500"
          required
        />
      </div>
    </>
  );
}
// INTERFACE DE PATIENT DA TABELA OCULTADA!
// type Patient = {
//   id: number;
//   nome: string;
//   // nascimento: string;
//   cpf: string;
//   email: string;
// };

export default function AdminHome() {
  const [userName, setUserName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false); // controle do modal pesquisa

  // const openCreateModal = () => setShowCreateModal(true);
  // const closeCreateModal = () => setShowCreateModal(false);

  // const openSearchModal = () => setShowSearchModal(true);
  function closeSearchModal() {
    setShowSearchModal(false);
    setResultados([]);
  } 

  // const [patients] = useState<Patient[]>([]); - LINHA CORRESPONDENTE A TABELA OCULTADA

  const [accessLevel, setAccessLevel] = useState<AccessLevel>("ADMINISTRADOR");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resultados, setResultados] = React.useState<any[]>([]);


  // const endpoint = accessEndpointMap[accessLevel];

  // const accessOptions = [
  //   { value: "ADMINISTRADOR", label: "Administrador" },
  //   { value: "MEDICO",        label: "Médico" },
  //   { value: "ENFERMAGEM",    label: "Enfermeiro" },
  //   { value: "PESQUISADOR",   label: "Pesquisador" },
  // ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Usuário");
      } catch {
        setUserName("Usuário");
      }
    } else {
      setUserName("Usuário");
    }
  }, []);

  //--------------  Submit Profile Function  --------------//
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const base = {
      nome: fd.get("nome"),
      cpf: fd.get("cpf"),
      email: fd.get("email"),
      password: fd.get("password"),
    };

    let payload: Record<string, unknown> = base;

    switch (accessLevel) {
      case "MEDICO":
        payload = {
          ...base,
          crm: fd.get("crm"),
          especializacoes: ((fd.get("especializacoes") as string) || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };
        break;

      case "ENFERMAGEM":
        payload = { ...base, coren: fd.get("coren") };
        break;

      case "PESQUISADOR":
        payload = {
          ...base,
          idInstituicao: fd.get("idInstituicao"),
          idAreasAtuacao: ((fd.get("idAreasAtuacao") as string) || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };
        break;

      // ADMINISTRADOR → somente base
    }

    const endpoint = accessEndpointMap[accessLevel];

    try {
      const resp = await fetch(`http://localhost:4000/proxy${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(await resp.text());

      alert("Profissional registrado com sucesso!");
      form.reset();
      setAccessLevel("ADMINISTRADOR");
      setShowCreateModal(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Falha: ${err.message}`);
    }
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const nome = form.get("nome")?.toString().trim();
    const email = form.get("email")?.toString().trim();

    if (nome) params.append("nome", nome);
    if (email) params.append("email", email);

    if (accessLevel === "MEDICO") {
      const crm = form.get("crm")?.toString().trim();
      const especializacao = form.get("especializacao")?.toString().trim();
      if (crm) params.append("crm", crm);
      if (especializacao) params.append("especializacao", especializacao);
    }

    if (accessLevel === "ENFERMAGEM") {
      const coren = form.get("coren")?.toString().trim();
      if (coren) params.append("coren", coren);
    }

    try {
      const endpointMap = {
        ADMINISTRADOR: "/api/adm/administradores",
        MEDICO: "/api/adm/Medicos",
        ENFERMAGEM: "/api/adm/enfermeiros",
        PESQUISADOR: "/api/adm/pesquisadores",
      };

      const url = `http://localhost:4000/proxy${
        endpointMap[accessLevel]
      }?${params.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      console.log("Resultados:", result);
      setResultados(result.content || []); // garantir que seja array

      // Aqui você pode setar no estado local para renderizar na tela
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Erro ao buscar: ${err.message}`);
    }
  }

  return (
    <div
      className="relative flex flex-col items-center min-h-screen bg-cover bg-bottom px-4 py-8"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* cabeçalho */}
      <header className="container-home1 mb-6 flex flex-col items-center">
        <div className="container-home2 text-center">
          <Image src="/huoc-system.png" alt="HUOC" width={60} height={48} />
          <h2 className="text-content1 text-2xl font-bold mb-2">
            Olá {userName}, bem-vindo de volta!
          </h2>
          <LogoutButton />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <strong>Registrar Profissionais</strong>{" "}
            <i className="bi bi-people" />
          </button>

          <button
            onClick={() => setShowSearchModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <strong>Pesquisar Profissionais</strong>{" "}
            <i className="bi bi-search" />
          </button>
        </div>
      </header>

      {/* tabela placeholder - DESATIVADA TEMPORARIAMENTE ATÉ SURGIU NECESSIDADE */}

      {/* <section className="w-full max-w-4xl flex flex-col gap-4 items-center">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-black bg-white/20 backdrop-blur rounded-xl">
            <thead className="bg-white text-sm text-black uppercase">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Nascimento</th>
                <th className="px-4 py-2">CPF</th>
                <th className="px-4 py-2">E-mail</th>
                <th className="px-4 py-2">Opções</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Nenhum paciente cadastrado.
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} className="text-center hover:bg-white/10">
                    <td className="py-2">{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{p.nascimento}</td>
                    <td>{p.cpf}</td>
                    <td>{p.email}</td>
                    <td>…</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section> */}

      {/* ------------------ MODAL REGISTRO ------------------ */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Formulário de Registro
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form id="create-profile-form" onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Nível de Acesso
                </label>
                <div
                  role="group"
                  className="inline-flex rounded-md shadow-sm overflow-hidden"
                >
                  {accessOptions.map((opt, idx) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setAccessLevel(opt.value as AccessLevel);
                        setResultados([]);
                      }}
                      className={[
                        "px-4 py-1 text-sm font-medium border",
                        idx !== 0 && "border-l-0",
                        idx === 0 && "rounded-l-md",
                        idx === accessOptions.length - 1 && "rounded-r-md",
                        accessLevel === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* campos comuns */}
              <CommonFields />

              {/* campos específicos */}
              <ExtraFields level={accessLevel} />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------ MODAL PESQUISA (placeholder) ------------------ */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Pesquisar Profissionais
              </h3>
              <button
                onClick={closeSearchModal}
                className="text-gray-500 hover:text-black"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            {/* Botões para selecionar tipo de profissional */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">
                Nível de Acesso
              </label>
              <div
                role="group"
                className="inline-flex rounded-md shadow-sm overflow-hidden"
              >
                {/* ["ADMINISTRADOR", "MEDICO", "ENFERMAGEM"] */}
                {accessOptions.map(
                  (opt, idx) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setAccessLevel(opt.value as AccessLevel);
                        setResultados([]);
                      }}
                      className={[
                        "px-4 py-1 text-sm font-medium border",
                        idx !== 0 && "border-l-0", // Remove border-left nos botões do meio e último
                        idx === 0 && "rounded-l-md", // Canto esquerdo arredondado no primeiro botão
                        idx === accessOptions.length - 1 && "rounded-r-md", // Canto direito arredondado no último botão
                        accessLevel === opt.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {opt.label}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Formulário de pesquisa dinâmico */}
            <form onSubmit={handleSearch}>
              <div className="mb-3 text-gray-700">
                <label className="block text-sm">Nome</label>
                <input name="nome" className="w-full border p-2 rounded" />
              </div>
              <div className="mb-3 text-gray-700">
                <label className="block text-sm">Email</label>
                <input name="email" className="w-full border p-2 rounded" />
              </div>

              {accessLevel === "MEDICO" && (
                <>
                  <div className="mb-3 text-gray-700">
                    <label className="block text-sm">CRM</label>
                    <input name="crm" className="w-full border p-2 rounded" />
                  </div>
                  <div className="mb-3 text-gray-700">
                    <label className="block text-sm">Especialização</label>
                    <input
                      name="especializacao"
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </>
              )}

              {accessLevel === "ENFERMAGEM" && (
                <div className="mb-3 text-gray-700">
                  <label className="block text-sm">COREN</label>
                  <input name="coren" className="w-full border p-2 rounded" />
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Pesquisar
                </button>
              </div>
            </form>

            {/* Resultados da pesquisa */}
            {resultados.length > 0 ? (
              <div className="mt-6 text-blue-600">
                {/* <h4 className="font-semibold mb-2">Resultados:</h4> */}
                <ul className="divide-y border rounded">
                  {resultados.map((item, idx) => (
                    <li key={idx} className="p-2 text-center text-gray-700">
                      <p><strong>Nome:</strong> {item.nome}</p>
                      <p><strong>CPF:</strong> {item.cpf}</p>
                      <p><strong>Email:</strong> {item.email}</p>
                      {accessLevel === "MEDICO" && <p><strong>CRM:</strong> {item.crm}</p>}
                      {accessLevel === "MEDICO" && <p><strong>Especializações:</strong> {(item.especializacoes || []).join(", ")}</p>}
                      {accessLevel === "ENFERMAGEM" && <p><strong>COREN:</strong> {item.coren}</p>}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setResultados([])}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded mx-auto block mt-2"
                >
                  Limpar Resultado
                </button>
              </div>
            ) : (
              <p className="mt-6 text-gray-500">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
