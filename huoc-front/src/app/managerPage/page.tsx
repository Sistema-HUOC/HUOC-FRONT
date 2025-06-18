"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LogoutButton from "@/components/logoutButton/logoutButton";

type Patient = {
  id: number;
  nome: string;
  nascimento: string;
  cpf: string;
  email: string;
};

export default function AdminHome() {
  const [userName, setUserName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);  // controle do modal pesquisa
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [patients, setPatients] = useState<Patient[]>([]);

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

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);

  const openSearchModal = () => setShowSearchModal(true);
  const closeSearchModal = () => setShowSearchModal(false);

  return (
    <div
      className="relative flex flex-col items-center min-h-screen bg-cover bg-bottom px-4 py-8"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Cabeçalho */}
      <div className="container-home1 mb-6 flex flex-col items-center">
        {/* Seção com fundo branco */}
        <div className="container-home2 text-center">
          <div className="flex justify-center">
            <Image
              src="/huoc-system.png"
              alt="Ícone HUOC"
              width={60}
              height={48}
            />
          </div>
          <h2 className="text-content1 text-2xl font-bold mb-2">
            Olá, {userName}!
          </h2>

          <div className="mt-2">
            <LogoutButton />
          </div>
        </div>

        {/* Botões logo abaixo da div branca */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <strong>Criar Pessoa</strong> <i className="bi bi-people" />
          </button>

          <button
            onClick={openSearchModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2"
          >
            <strong>Pesquisar Pessoa</strong> <i className="bi bi-search" />
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="w-full max-w-4xl flex flex-col gap-4 items-center">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-black bg-white/20 backdrop-blur rounded-xl overflow-hidden">
            <thead className="bg-white text-sm text-black uppercase">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Data de Nascimento</th>
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
                  <tr
                    key={p.id}
                    className="text-center hover:bg-white/10 transition"
                  >
                    <td className="py-2">{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{p.nascimento}</td>
                    <td>{p.cpf}</td>
                    <td>{p.email}</td>
                    <td>
                      <button className="text-blue-300 hover:text-white mr-2">
                        <i className="bi bi-eye-fill" />
                      </button>
                      <button className="text-yellow-300 hover:text-white mr-2">
                        <i className="bi bi-pencil-square" />
                      </button>
                      <button className="text-red-400 hover:text-white">
                        <i className="bi bi-trash-fill" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Criar Pessoa */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Criar Pessoa
              </h3>
              <button
                onClick={closeCreateModal}
                className="text-gray-500 hover:text-black"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <form id="criar-paciente-form">
              <div className="mb-3">
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded text-gray-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded text-gray-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">CPF</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded text-gray-500"
                  maxLength={14}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">E-mail</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded text-gray-500"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded text-gray-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Criar Pessoa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pesquisar Pessoa */}
      {showSearchModal && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="searchModalLabel"
          tabIndex={-1}
        >
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="modal-header flex justify-between items-center mb-4">
              <h5
                className="modal-title text-xl font-semibold text-gray-800"
                id="searchModalLabel"
              >
                Pesquisar Pessoa
              </h5>
              <button
                type="button"
                onClick={closeSearchModal}
                className="btn-close text-gray-500 hover:text-black"
                aria-label="Fechar"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="modal-body">
              <form id="searchFormPatient">
                <div className="mb-3">
                  <input
                    type="email"
                    className="searchEmailPatient w-full p-2 border border-gray-300 rounded text-gray-500"
                    id="searchEmailPatient"
                    placeholder="Digite o nome do Pessoa"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="text-center">
              <div id="resultsGet" className="mt-3"></div>
            </div>

            <div className="modal-footer flex justify-end mt-4">
              <button
                type="button"
                className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                // Aqui você pode colocar a função de pesquisa ao clicar
                onClick={() => alert("Implementar pesquisa")}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
