'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PatientCard from '@/components/patientCard/PatientCard';

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

export default function FollowUpPatientsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [patientClinicalData, setPatientClinicalData] = useState<ClinicalData | null>(null);

  const [patients] = useState<Patient[]>([
    {
        id: 1,
        name: 'Maria **** Santos',
        cpf: '123.***.***-00',
        birthDate: '10/07/1985',
        record: '12345',
        age: '39 Anos, 10 meses, 8 Dias',
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
        age: '35 anos, 1 mês, 19 dias',
        gender: 'Masculino',
        phone: '(21) 99876-5432',
        email: 'joao.lucas@example.com',
        address: 'Av. Brasil, 456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        bloodType: 'O-',
        confirmationYear: '2020'
    }
  ]);

  const handleEdit = (id: number) => {
    router.push(`/cadastro001?id=${id}`);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    
    const clinicalDataRaw = localStorage.getItem('clinicalFormData');
    if (clinicalDataRaw) {
      try {
        const allClinicalData = JSON.parse(clinicalDataRaw);
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
      {/* Header */}
      <header className="bg-[#DBEAFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">HUOC - Acompanhamento</h1>
        </div>
        <button
          onClick={() => router.back()}
          className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
          title="Voltar">
          <i className="bi bi-arrow-left text-lg"></i>
          <span>Voltar</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow bg-cover bg-bottom px-6 py-10" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="p-4">
          <PatientCard
            patients={patients}
            search={search}
            setSearch={setSearch}
            onEdit={handleEdit}
            onView={handleViewPatient}
          />
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
              <p><strong>Prontuário:</strong> {selectedPatient.record}</p>
              {selectedPatient.birthDate && <p><strong>Data de Nascimento:</strong> {selectedPatient.birthDate}</p>}
              {selectedPatient.age && <p><strong>Idade:</strong> {selectedPatient.age}</p>}
              {selectedPatient.gender && <p><strong>Gênero:</strong> {selectedPatient.gender}</p>}
              {selectedPatient.bloodType && <p><strong>Tipo Sanguíneo:</strong> {selectedPatient.bloodType}</p>}
              {selectedPatient.phone && <p><strong>Telefone:</strong> {selectedPatient.phone}</p>}
              {selectedPatient.email && <p><strong>Email:</strong> {selectedPatient.email}</p>}
              {selectedPatient.address && <p className="md:col-span-2 lg:col-span-3"><strong>Endereço:</strong> {selectedPatient.address}</p>}
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
      <footer className="bg-[#DBEAFE] text-center py-4 text-sm text-gray-800">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}