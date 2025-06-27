'use client'

import { useState, useEffect } from "react";
import LogoutButton from "@/components/logoutButton/logoutButton"; 
import Image from "next/image";
<<<<<<< HEAD
import LogoutButton from "@/components/logoutButton/logoutButton";
import { accessEndpointMap, AccessLevel } from "./access";
import React from "react";

const accessOptions = [
  { value: "ADMINISTRADOR", label: "Administrador" },
  { value: "MEDICO", label: "Médico" },
  { value: "ENFERMAGEM", label: "Enfermeiro" },
  { value: "PESQUISADOR", label: "Pesquisador" },
];

// INTERFACE DE PATIENT DA TABELA OCULTADA!
// type Patient = {
//   id: number;
//   nome: string;
//   // nascimento: string;
//   cpf: string;
//   email: string;
// };

/* ------------------------------------------------------------------
   Componente reutilizável para “Adicionar nova especialização”
   ------------------------------------------------------------------ */
type AddSpecProps = {
  value: string;
  setValue: (s: string) => void;
  onAdd: () => void;
};
=======
>>>>>>> main

export const AddSpecializationBlock: React.FC<AddSpecProps> = ({
  value,
  setValue,
  onAdd,
}) => (
  <div className="mb-4 px-5">
    <label htmlFor="novaEsp" className="block text-gray-700">
      Adicionar nova especialização:
    </label>

    <div className="flex gap-2 mt-1">
      <input
        id="novaEsp"
        name="novaEspecializacao"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onAdd();
          }
        }}
        className="flex-1 p-2 border border-gray-300 rounded text-gray-500"
        placeholder="Ex: Nefrologia"
        autoComplete="off"
      />

      <button
        type="button"
        onClick={onAdd}
        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
      >
        Adicionar
      </button>
    </div>
  </div>
);

type ExtraProps = {
  level: AccessLevel;
  specializations: string[];
  value: string;                       // <- NEW
  setValue: (s: string) => void;       // <- NEW
  onAdd: () => void;                   // <- NEW
};

// eslint-disable-next-line react/display-name
export const ExtraFields = React.memo(
  ({ level, specializations, value, setValue, onAdd }: ExtraProps) => {
    if (level !== "MEDICO" && level !== "ENFERMAGEM" && level !== "PESQUISADOR")
      return null;

    if (level === "MEDICO") {
      return (
        <>
          <div className="mb-3">
            <label className="block text-gray-700 mb-1">Especializações</label>
            <select
              name="especializacoes"
              multiple
              className="w-full p-2 border border-gray-300 rounded text-blue-700 underline"
            >
              {specializations.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Segure Ctrl (ou Cmd) para selecionar múltiplas
            </p>
          </div>

          <AddSpecializationBlock
            value={value}
            setValue={setValue}
            onAdd={onAdd}
          />

          <div className="mb-3">
            <label className="block text-gray-700">CRM</label>
            <input
              name="crm"
              className="w-full p-2 border border-gray-300 rounded text-gray-500"
              required
            />
          </div>
        </>
      );
    }

    if (level === "ENFERMAGEM") {
      return (
        <div className="mb-3">
          <label className="block text-gray-700">COREN</label>
          <input
            name="coren"
            className="w-full p-2 border border-gray-300 rounded text-gray-500"
            required
          />
        </div>
      );
    }

    /* PESQUISADOR */
    return (
      <>
        <div className="mb-3">
          <label className="block text-gray-700">Instituição (ID)</label>
          <input
            name="idInstituicao"
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
            placeholder="id1,id2"
            className="w-full p-2 border border-gray-300 rounded text-gray-500"
          />
        </div>
      </>
    );
  }
);





export default function AdminHome() {
  const [userName, setUserName] = useState("");
<<<<<<< HEAD
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false); // controle do modal pesquisa

  // const openCreateModal = () => setShowCreateModal(true);
  // const closeCreateModal = () => setShowCreateModal(false);

  // const openSearchModal = () => setShowSearchModal(true);
  function closeSearchModal() {
    setShowSearchModal(false);
    setResultados([]);
    setSearched(false);
    setAtivo(true);
  }

  // const [patients] = useState<Patient[]>([]); - LINHA CORRESPONDENTE A TABELA OCULTADA
  const [accessLevel, setAccessLevel] = useState<AccessLevel>("ADMINISTRADOR");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resultados, setResultados] = React.useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const [specializations, setSpecializations] = useState<string[]>([]);
  const [newSpecialization, setNewSpecialization] = useState("");

  const [ativo, setAtivo] = useState<boolean>(true);

  const [showActivationModal, setShowActivationModal] = useState(false);
  const [activationEmail, setActivationEmail] = useState("");
  const [activateFlag, setActivateFlag] = useState<boolean>(true);
  const [activationMsg, setActivationMsg] = useState<{  /* feedback + loading */
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [loadingActivation, setLoadingActivation] = useState(false);

=======
>>>>>>> main

  useEffect(() => {
    fetch("http://localhost:4000/proxy/api/adm/especializacoes", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSpecializations(data))
      .catch((err) => console.error("Erro ao buscar especializações:", err));

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

<<<<<<< HEAD
  //------------- Campos de Preenchimento Padrão -------------//
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

  function openActivationModal() {
    setShowActivationModal(true);
    setActivationEmail("");
    setActivateFlag(true);
  }

  function closeActivationModal() {
    setShowActivationModal(false);
  }

  //-------------- Função de Submissão de Especialização --------------//
  async function handleAddSpecialization() {
    if (!newSpecialization.trim()) return;

    try {
      const resp = await fetch(
        "http://localhost:4000/proxy/api/adm/especializacao",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ especializacao: newSpecialization }),
        }
      );

      if (!resp.ok) throw new Error(await resp.text());

      setSpecializations((prev) => [...prev, newSpecialization]);
      setNewSpecialization("");
      alert("Especialização adicionada com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Erro ao adicionar especialização: ${err.message}`);
    }
  }

  //----------------- Função de Cadastro --------------//
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
          especializacoes: fd.getAll("especializacoes"),
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

  //------------------- Função de Busca -----------------//
  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearched(true);
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const nome = form.get("nome")?.toString().trim();
    const email = form.get("email")?.toString().trim();

    if (nome) params.append("nome", nome);
    if (email) params.append("email", email);

    params.append("ativo", ativo.toString());

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
      setResultados(result.content || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Erro ao buscar: ${err.message}`);
    }
  }

  //------------- Função de Ativação/Desativação -----------------//
  async function handleActivation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:4000/proxy/api/adm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          targetUserEmail: activationEmail,
          activate: activateFlag,
        }),
      });

      if (!resp.ok) throw new Error(await resp.text());

      setActivationMsg({
        type: "success",
        text: `Conta ${activateFlag ? "ativada" : "desativada"} com sucesso.`,
      });

      setTimeout(closeActivationModal, 2000);

      closeActivationModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setActivationMsg({
        type: "error",
        text: err.message || "Falha ao alterar status.",
      });
    } finally {
      setLoadingActivation(false);
    }
  }




=======
>>>>>>> main
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-bottom px-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
<<<<<<< HEAD
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
            <strong>Cadastrar</strong> <i className="bi bi-people" />
          </button>

          <button
            onClick={openActivationModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <strong>Ativar/Desativar</strong>{" "}
            <i className="bi bi-person-gear" />
          </button>

          <button
            onClick={() => setShowSearchModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <strong>Pesquisar</strong> <i className="bi bi-search" />
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

      {/* ------------------ MODAL DE CADASTRO ------------------ */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-xl max-h-[80vh] shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mt-0.5 sticky top-0 bg-white z-10 shadow-md px-4 py-2 rounded-t-xl w-full">
              <h3 className="text-xl font-semibold text-gray-800">
                Formulário de Registro
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form
              id="create-profile-form"
              onSubmit={handleRegister}
              className="space-y-4 p-5">
              <div className="mb-6">
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

              
              {/* Campos Específicos - Baseado no nível de acesso*/}
              <ExtraFields
                level={accessLevel}
                specializations={specializations}
                value={newSpecialization}
                setValue={setNewSpecialization}
                onAdd={handleAddSpecialization}
              />


              {/* Campos Padrão de todos os perfis */}
              <CommonFields />

              <div className="flex justify-center">
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




      {/* ------------------ MODAL DE ATIVAÇÃO ------------------ */}
      {showActivationModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Ativar/Desativar Conta
              </h3>
              <button
                onClick={closeActivationModal}
                className="text-red-500 hover:text-red-700"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleActivation} className="space-y-4">
              {/* e-mail */}
              <div className="text-gray-700">
                <label className="block text-sm">E-mail do usuário</label>
                <input
                  type="email"
                  required
                  value={activationEmail}
                  onChange={(e) => setActivationEmail(e.target.value)}
                  className="w-full border p-2 rounded border-gray-300 text-gray-500"
                />
              </div>

              {/* switch ativar/desativar */}
              <div className="flex items-center justify-center">
                <p className="text-gray-700">Definir status da conta</p>
                <span className="mr-2 text-sm text-gray-700">: <strong>Desativar</strong></span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={activateFlag}
                    onChange={(e) => setActivateFlag(e.target.checked)}
                  />
                  <div
                    className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-2
                                  peer-focus:ring-gray-400 rounded-full peer
                                  peer-checked:bg-blue-600
                                  peer-checked:after:translate-x-full
                                  after:absolute after:content-[''] after:top-[2px] after:left-[2px]
                                  after:bg-white after:border-gray-300 after:border after:rounded-full
                                  after:h-5 after:w-5 after:transition-all"
                  ></div>
                </label>
                <span className="ml-2 text-sm text-gray-700"><strong>Ativar</strong></span>
              </div>

              {/* botão enviar */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loadingActivation}
                  className={`px-4 py-2 rounded text-white ${
                    loadingActivation ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loadingActivation ? "Processando…" : "Confirmar"}
                </button>
              </div>
            </form>

            {activationMsg && (
              <div
                className={`mt-4 p-2 rounded text-sm ${
                  activationMsg.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {activationMsg.text}
              </div>
            )}
          </div>
        </div>
      )}




      {/* ------------------ MODAL DE PESQUISA ------------------ */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-xl max-h-[80vh] shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mt-0.5 sticky top-0 bg-white z-10 shadow-md px-4 py-2 rounded-t-xl w-full">
              <h3 className="text-xl font-semibold text-gray-800">
                Pesquisar Profissionais
              </h3>
              <button
                onClick={closeSearchModal}
                className="text-red-500 hover:text-red-700"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="p-5">
              <label className="block text-gray-700 mb-0.5">
                Nível de Acesso
              </label>
              <div
                role="group"
                className="inline-flex rounded-md shadow-sm overflow-hidden"
              >
                {/* ["ADMINISTRADOR", "MEDICO", "ENFERMAGEM"] */}
                {accessOptions.map((opt, idx) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setAccessLevel(opt.value as AccessLevel);
                      setResultados([]);
                      setSearched(false);
                      setAtivo(true);
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

            {/* Formulário de pesquisa dinâmico */}
            <form onSubmit={handleSearch} className="">
              <div className="space-y-4 p-5">
                <div className="mb-3 text-gray-700">
                  <label className="block text-sm">Nome</label>
                  <input
                    name="nome"
                    className="w-full border p-2 rounded border-gray-300 text-gray-500"
                  />
                </div>
                <div className="mb-3 text-gray-700">
                  <label className="block text-sm">Email</label>
                  <input
                    name="email"
                    className="w-full border p-2 border-gray-300 rounded text-gray-500"
                  />
                </div>

                {accessLevel === "MEDICO" && (
                  <>
                    <div className="mb-3 text-gray-700">
                      <label className="block text-sm">CRM</label>
                      <input
                        name="crm"
                        className="w-full border p-2 border-gray-300 rounded text-gray-500"
                      />
                    </div>
                    <div className="mb-3 text-gray-700">
                      <label className="block text-sm">Especialização</label>
                      <input
                        name="especializacao"
                        className="w-full border p-2 border-gray-300 rounded text-gray-500"
                      />
                    </div>
                  </>
                )}

                {accessLevel === "ENFERMAGEM" && (
                  <div className="mb-3 text-gray-700">
                    <label className="block text-sm">COREN</label>
                    <input
                      name="coren"
                      className="w-full border p-2 border-gray-300 rounded text-gray-500"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3 text-gray-700  flex items-center justify-end pr-5">
                <span className="mr-2 text-sm">Inativas</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={ativo}
                    onChange={(e) => setAtivo(e.target.checked)}
                  />
                  {/* trilho do switch */}
                  <div
                    className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-2
                                  peer-focus:ring-gray-400 rounded-full peer
                                  peer-checked:bg-blue-600
                                  peer-checked:after:translate-x-full
                                  after:absolute after:content-[''] after:top-[2px] after:left-[2px]
                                  after:bg-white after:border-gray-300 after:border after:rounded-full
                                  after:h-5 after:w-5 after:transition-all"
                  ></div>
                </label>
                <span className="ml-2 text-sm">Ativas</span>
              </div>

              <div className="flex justify-center mt-4 mb-2">
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
              <div className="mt-2 text-blue-600 p-5">
                <ul className="divide-y border rounded">
                  {resultados.map((item, idx) => (
                    <li key={idx} className="p-2 text-center text-gray-700">
                      <p>
                        <strong>Nome:</strong> {item.nome}
                      </p>
                      {accessLevel !== "MEDICO" && (
                        <p>
                          <strong>CPF:</strong> {item.cpf}
                        </p>
                      )}
                      <p>
                        <strong>Email:</strong> {item.email}
                      </p>
                      {accessLevel === "MEDICO" && (
                        <p>
                          <strong>CRM:</strong> {item.CRM}
                        </p>
                      )}
                      {accessLevel === "MEDICO" && (
                        <p>
                          <strong>Especializações:</strong>{" "}
                          {(item.especializacao || []).join(", ")}
                        </p>
                      )}
                      {accessLevel === "ENFERMAGEM" && (
                        <p>
                          <strong>COREN:</strong> {item.coren}
                        </p>
                      )}
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
              searched && ( 
                <p className="mt-5 text-gray-500 p-5 text-center">
                  Nenhum resultado encontrado.
                </p>
              )
            )}
          </div>
        </div>
      )}
=======
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
        <LogoutButton />
>>>>>>> main
    </div>
  );
}