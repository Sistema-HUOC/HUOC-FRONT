'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PatientListPage() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const patients = [
    { id: 1, name: 'Maria Silva', record: '12345' },
    { id: 2, name: 'João Lucas', record: '54321' },
  ];

  const filteredPatients = patients.filter(p =>
    `${p.name} ${p.record}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigateToForm = () => {
    router.push("/nursePage/clinicalForm");
  };

  type Patient = {
    id: number;
    name: string;
    record: string;
  };

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">HUOC - Sistema de Coleta de Dados Clínicos</h1>
        </div>

        <button
        onClick={() => router.back()}
        className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 transition"
        title="Voltar"
      >
        <i className="bi bi-arrow-left text-lg"></i>
        <span>Voltar</span>
      </button>
      </header>

      {/* Main content */}
      <main className="flex-grow bg-cover bg-bottom px-6 py-10" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg">
          {/* Top bar with search and add icon */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Busca por nome ou nº de prontuário"
              className="border border-gray-300 rounded-full px-4 py-2 w-full max-w-md text-gray-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => router.push('/nursePage/patientRegister')}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-full shadow transition"
              title="Adicionar Paciente">
              <i className="bi bi-person-plus-fill text-lg"></i>
              <span>Cadastrar Paciente</span>
            </button>

          </div>

          {/* Patient table */}
          <table className="w-full text-left bg-white bg-opacity-90 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-900">
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Prontuário</th>
                <th className="py-2 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-t border-gray-400 text-gray-600">
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.record}</td>
                  <td className="py-2 px-4 text-center space-x-3">
                    <button title="Formulário de Sintomas" onClick={handleNavigateToForm}><i className="bi bi-journal-text text-blue-600 hover:text-blue-800 text-xl"></i></button>
                    <button title="Editar Paciente"><i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 text-xl"></i></button>
                    <button title="Visualizar Paciente" onClick={() => handleViewPatient(patient)}><i className="bi bi-eye-fill text-green-600 hover:text-green-800 text-xl"></i></button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de Visualização do Paciente */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Dados do Paciente</h2>
            <p className='text-black'><strong>Nome:</strong> {selectedPatient.name}</p>
            <p className='text-black'><strong>Prontuário:</strong> {selectedPatient.record}</p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-sm text-gray-800">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}
