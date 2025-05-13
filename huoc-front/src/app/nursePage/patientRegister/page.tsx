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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação dos campos obrigatórios
    if (!form.name || !form.cpf || !form.birthDate || !form.gender) {
      alert("Por favor, preencha todos os campos obrigatórios marcados com *");
      return;
    }

    // Verificar campos não obrigatórios vazios
    const optionalFields = [
      { name: 'Número do Prontuário', value: form.recordNumber },
      { name: 'Tipo Sanguíneo', value: form.bloodType },
      { name: 'Telefone', value: form.phone },
      { name: 'Diagnóstico', value: form.diagnosis },
      { name: 'Ano de Confirmação', value: form.confirmationYear },
      { name: 'Endereço', value: form.address },
      ...form.history.map((entry, i) => ({
        name: `Data da Consulta ${i + 1}`,
        value: entry.date
      })),
      ...form.history.map((entry, i) => ({
        name: `Sintomas da Consulta ${i + 1}`,
        value: entry.symptoms
      }))
    ];

    const emptyFields = optionalFields.filter(field => !field.value);
    
    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(f => f.name).join('\n• ');
      const shouldContinue = confirm(`Os seguintes campos não foram preenchidos:\n\n• ${fieldNames}\n\nDeseja continuar mesmo assim?`);
      
      if (!shouldContinue) {
        return;
      }
    }

    console.log('Dados do paciente:', form);
    // lógica de envio para o back-end
    alert("Paciente cadastrado com sucesso!");
    router.push('/nursePage');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">Cadastro de Paciente</h1>
        </div>
        <button
          onClick={() => router.push('/nursePage')}
          className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
          title="Voltar"
        >
          <i className="bi bi-arrow-left text-lg"></i>
          <span>Voltar</span>
        </button>
      </header>

      {/* Main */}
      <main
        className="flex-grow flex flex-col items-center bg-cover bg-bottom px-6 py-10"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-4xl text-black"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações Básicas *</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Nome Completo (Obrigatório) */}
            <div>
              <input
                name="name"
                placeholder="Nome Completo *"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/[^a-zA-Záéíóúãõâêîôûàèìòùç\s]/g, "");
                  e.target.value = rawValue;
                  handleChange(e);
                }}
                value={form.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            {/* CPF (Obrigatório) */}
            <div>
              <input
                name="cpf"
                placeholder="CPF * (000.000.000-00)"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const maskedValue = rawValue
                    .replace(/(\d{3})(\d)/, "$1.$2")
                    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4")
                    .slice(0, 14);
                  e.target.value = maskedValue;
                  handleChange(e);
                }}
                value={form.cpf}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Data de Nascimento (Obrigatório) */}
            <div>
              <label className="block mb-1 ml-2 text-md font-medium text-gray-700">
                Data de Nascimento *
              </label>
              <input 
                type="date" 
                name="birthDate" 
                onChange={handleChange} 
                value={form.birthDate}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              />
            </div>

            {/* Gênero (Obrigatório) */}
            <div className="w-full ml-2">
              <span className="block mb-1 font-medium text-gray-700">Gênero *</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Masculino"
                    checked={form.gender === "Masculino"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span>Masculino</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Feminino"
                    checked={form.gender === "Feminino"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span>Feminino</span>
                </label>
              </div>
            </div>

            {/* Número do Prontuário (Opcional) */}
            <div>
              <input
                name="recordNumber"
                placeholder="N° Prontuário"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  e.target.value = rawValue;
                  handleChange(e);
                }}
                value={form.recordNumber}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Tipo Sanguíneo (Opcional) */}
            <div>
              <select
                name="bloodType"
                onChange={handleChange}
                value={form.bloodType}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tipo Sanguíneo</option>
                <option value="A+">A+</option>
                <option value="A-">A−</option>
                <option value="B+">B+</option>
                <option value="B-">B−</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB−</option>
                <option value="O+">O+</option>
                <option value="O-">O−</option>
              </select>
            </div>

            {/* Telefone (Opcional) */}
            <div>
              <input
                name="phone"
                placeholder="Telefone ((00) 00000-0000)"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const maskedValue = rawValue
                    .replace(/^(\d{2})(\d)/, "($1) $2")
                    .replace(/^(\(\d{2}\))\s(\d{5})(\d)/, "$1 $2-$3")
                    .slice(0, 15);
                  e.target.value = maskedValue;
                  handleChange(e);
                }}
                value={form.phone}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Diagnóstico Confirmado (Opcional) */}
            <div className="w-full ml-2">
              <span className="block mb-1 font-medium text-gray-700">Diagnóstico Confirmado?</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="diagnosis"
                    value="Sim"
                    checked={form.diagnosis === "Sim"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span>Sim</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="diagnosis"
                    value="Não"
                    checked={form.diagnosis === "Não"}
                    onChange={handleChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span>Não</span>
                </label>
              </div>
            </div>

            {/* Ano de Confirmação (Opcional) */}
            <div>
              <input
                name="confirmationYear"
                placeholder="Ano de Confirmação do Diagnóstico"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  const yearValue = rawValue.slice(0, 4);
                  e.target.value = yearValue;
                  handleChange(e);
                }}
                value={form.confirmationYear}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Endereço (Opcional) */}
            <div className="col-span-2">
              <textarea
                name="address"
                placeholder="Endereço completo"
                onChange={handleChange}
                value={form.address}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          {/* Histórico de Sintomas (Opcional) */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Sintomas</h2>
          {form.history.map((entry, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                name={`history.date`}
                value={entry.date}
                onChange={(e) => handleChange(e, i)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                name={`history.symptoms`}
                placeholder="Sintomas clínicos observados"
                value={entry.symptoms}
                onChange={(e) => handleChange(e, i)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={addHistoryEntry} 
            className="mb-6 text-blue-600 hover:underline flex items-center gap-1"
          >
            <i className="bi bi-plus-circle"></i>
            Adicionar nova consulta
          </button>

          <div className="flex justify-end gap-4">
            <button 
              type="button"
              onClick={() => router.push('/nursePage')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-full shadow transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-all transform hover:scale-105 cursor-pointer"
            >
              <i className="bi bi-save mr-2"></i>
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