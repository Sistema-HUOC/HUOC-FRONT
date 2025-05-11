'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Interruptor from '../../components/interruptor/LoveToggle';

type Patient = {
  id: number;
  name: string;
  cpf: string;
  birthDate: string;
  record: string;
  age: string;
  gender: string;
  bloodType: string;
  phone: string;
  confirmationYear: string;
  address: string;
  city?: string;
  state?: string;
  email?: string;
};

type ClinicalData = {
  [section: string]: {
    [field: string]: string;
  };
};

export default function PatientListPage() {
  const [userName, setUserName] = useState("Usuário");
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [patientClinicalData, setPatientClinicalData] = useState<ClinicalData | null>(null);
  const router = useRouter();

  const patients: Patient[] = [
    {
      id: 1,
      name: 'Maria **** Santos',
      cpf: '123.***.***-00',
      birthDate: '10/07/1985',
      record: '12345',
      age: '39',
      gender: 'Feminino',
      phone: '(11) 91234-5678',
      email: 'maria.silva@example.com',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      bloodType: 'A+',
      confirmationYear: '2021'
    },
    {
      id: 2,
      name: 'João **** Silva',
      cpf: '987.***.***-20',
      birthDate: '25/03/1990',
      record: '54321',
      age: '35',
      gender: 'Masculino',
      phone: '(21) 99876-5432',
      email: 'joao.lucas@example.com',
      address: 'Av. Brasil, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      bloodType: 'O-',
      confirmationYear: '2020'
    }
  ];

  useEffect(() => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const filteredPatients = patients.filter(p =>
    `${p.name} ${p.record}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigateToForm = (id: number) => {
    router.push(`/nursePage/clinicalForm?id=${id}`);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    
    const clinicalDataRaw = localStorage.getItem('clinicalFormData');
    if (clinicalDataRaw) {
      try {
        const allClinicalData = JSON.parse(clinicalDataRaw);
        // Get data only for this specific patient
        const patientData = allClinicalData[patient.id.toString()] || null;
        setPatientClinicalData(patientData);
      } catch (error) {
        console.error("Error parsing clinical data:", error);
        setPatientClinicalData(null);
      }
    } else {
      setPatientClinicalData(null);
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
    setPatientClinicalData(null);
  };

  const formatClinicalField = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Tipo', '')
      .replace('Detalhe', ' (Detalhe)');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">HUOC - Sistema de Coleta de Dados Clínicos</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="mt-3">
            <Interruptor />
          </div>
          <span className="text-black pr-2 border-r-2">Enfermeiro(a)</span>
          <button
            onClick={handleLogout}
            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
            title="Sair"
          >
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            </div>
            <div className="absolute left-15 transform -translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Sair
            </div>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow bg-cover bg-bottom px-6 py-10" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg">
          {/* Search and add patient */}
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
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-full shadow transition-all transform hover:scale-105 cursor-pointer p-2"
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
                <th className="py-2 px-4">CPF</th>
                <th className="py-2 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-t border-gray-400 text-gray-600">
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.record}</td>
                  <td className="py-2 px-4">{patient.cpf}</td>
                  <td className="py-2 px-4 text-center space-x-3">
                    <button 
                      title="Formulário de Sintomas" 
                      onClick={() => handleNavigateToForm(patient.id)}
                    >
                      <i className="bi bi-journal-text text-blue-600 hover:text-blue-800 text-xl transition-all transform hover:scale-105 cursor-pointer"></i>
                    </button>
                    <button title="Editar Paciente">
                      <i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 text-xl transition-all transform hover:scale-105 cursor-pointer"></i>
                    </button>
                    <button 
                      title="Visualizar Paciente" 
                      onClick={() => handleViewPatient(patient)}
                    >
                      <i className="bi bi-eye-fill text-green-600 hover:text-green-800 text-xl transition-all transform hover:scale-105 cursor-pointer"></i>
                    </button>
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

      {/* Patient View Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-gray-950/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl px-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dados do Paciente</h2>

            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-black mb-6">
              <p><strong>ID:</strong> {selectedPatient.id}</p>
              <p><strong>Nome:</strong> {selectedPatient.name}</p>
              <p><strong>CPF:</strong> {selectedPatient.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {selectedPatient.birthDate}</p>
              <p><strong>Prontuário:</strong> {selectedPatient.record}</p>
              <p><strong>Idade:</strong> {selectedPatient.age}</p>
              <p><strong>Gênero:</strong> {selectedPatient.gender}</p>
              <p><strong>Tipo Sanguíneo:</strong> {selectedPatient.bloodType}</p>
              <p><strong>Telefone:</strong> {selectedPatient.phone}</p>
              <p><strong>Ano de Confirmação:</strong> {selectedPatient.confirmationYear}</p>
              <p className="md:col-span-2 lg:col-span-3"><strong>Endereço:</strong> {selectedPatient.address}</p>
            </div>

            {/* Clinical Data */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dados Clínicos</h2>
              
              {patientClinicalData ? (
                <div className="space-y-6">
                  {Object.entries(patientClinicalData).map(([section, values]) => (
                    <div key={section} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-700 mb-3 border-b pb-2">
                        {section}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(values).map(([key, value]) => (
                          <div key={key} className="bg-white p-3 rounded shadow-sm">
                            <p className="font-medium text-gray-700">{formatClinicalField(key)}:</p>
                            <p className={
                              value === 'Sim' ? 'text-green-600' : 
                              value === 'Não' ? 'text-red-600' : 'text-gray-800'
                            }>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-500">Nenhum dado clínico encontrado para este paciente.</p>
                </div>
              )}
            </div>

            {/* Close button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition-all transform hover:scale-105 cursor-pointer"
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