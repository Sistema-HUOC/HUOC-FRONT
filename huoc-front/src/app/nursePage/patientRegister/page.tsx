// src/app/nursePage/patientRegister/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PatientRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    birthDate: '',
    recordNumber: '',
    age: '',
    gender: '',
    bloodType: '',
    phone: '',
    diagnosis: '',
    confirmationYear: '',
    address: '',
    history: [{ date: '', symptoms: '' }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
  
    if (name.startsWith('history') && index !== undefined) {
      const field = name.split('.')[1] as keyof (typeof form.history)[0];
      const updatedHistory = [...form.history];
      updatedHistory[index][field] = value;
      setForm({ ...form, history: updatedHistory });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  

  const addHistoryEntry = () => {
    setForm({ ...form, history: [...form.history, { date: '', symptoms: '' }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do paciente:', form);
    // lógica de envio para o back-end
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">Cadastro de Paciente</h1>
        </div>
        <button onClick={() => router.back()} className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 transition">
          ← Voltar
        </button>
      </header>

      {/* Main */}
      <main
        className="flex-grow flex flex-col items-center bg-cover bg-bottom px-6 py-10"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-4xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações Básicas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input name="name" placeholder="Nome Completo" onChange={handleChange} value={form.name} className="input" />
            <input name="cpf" placeholder="CPF" onChange={handleChange} value={form.cpf} className="input" />
            <input type="date" name="birthDate" onChange={handleChange} value={form.birthDate} className="input" />
            <input name="recordNumber" placeholder="N° Prontuário" onChange={handleChange} value={form.recordNumber} className="input" />
            <input name="age" placeholder="Idade" onChange={handleChange} value={form.age} className="input" />
            <select name="gender" onChange={handleChange} value={form.gender} className="input">
              <option value="">Sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            <input name="bloodType" placeholder="Tipo Sanguíneo" onChange={handleChange} value={form.bloodType} className="input" />
            <input name="phone" placeholder="Telefone para Contato" onChange={handleChange} value={form.phone} className="input" />
            <input name="diagnosis" placeholder="Diagnóstico Confirmado" onChange={handleChange} value={form.diagnosis} className="input" />
            <input name="confirmationYear" placeholder="Ano de Confirmação" onChange={handleChange} value={form.confirmationYear} className="input" />
            <input name="address" placeholder="Endereço" onChange={handleChange} value={form.address} className="input col-span-2" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Sintomas</h2>
          {form.history.map((entry, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                name={`history.date`}
                value={entry.date}
                onChange={(e) => handleChange(e, i)}
                className="input"
              />
              <textarea
                name={`history.symptoms`}
                placeholder="Sintomas clínicos observados"
                value={entry.symptoms}
                onChange={(e) => handleChange(e, i)}
                className="input h-24"
              />
            </div>
          ))}
          <button type="button" onClick={addHistoryEntry} className="mb-6 text-blue-600 hover:underline">
            + Adicionar nova consulta
          </button>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow">
              Salvar Cadastro
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-sm text-gray-800">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}

// Estilo para inputs
const inputClassName = "input"; // Use como classe utilitária global se quiser
