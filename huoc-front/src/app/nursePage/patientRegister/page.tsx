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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações Básicas</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              name="name"
              placeholder="Nome Completo"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/[^a-zA-Záéíóúãõâêîôûàèìòùç\s]/g, ""); // Remove tudo que não for letra ou espaço

                // Modifica o valor diretamente no e.target
                e.target.value = rawValue;

                // Chama handleChange com o evento real
                handleChange(e);
              }}
              value={form.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              name="cpf"
              placeholder="000.000.000-00"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Remove não dígitos
                const maskedValue = rawValue
                  .replace(/^(\d{3})(\d)/, "$1.$2")
                  .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                  .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
                  .slice(0, 14);

                e.target.value = maskedValue; // ⬅️ aplica a máscara diretamente no event
                handleChange(e); // ⬅️ envia o evento original
              }}
              value={form.cpf}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input type="date" name="birthDate" onChange={handleChange} value={form.birthDate} className="input" />
            <input
              name="recordNumber"
              placeholder="N° Prontuário"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

                e.target.value = rawValue; // Atualiza o valor com apenas números

                handleChange(e); // Passa o evento real
              }}
              value={form.recordNumber}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              name="age"
              placeholder="Idade"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                const ageValue = rawValue.slice(0, 3); // Limita a idade a no máximo 3 dígitos (não permite mais de 120)

                // Modifica o valor diretamente no e.target
                e.target.value = ageValue;

                // Chama handleChange com o evento real
                handleChange(e);
              }}
              value={form.age}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-center gap-2 p-2">
              <div>
                <input
                  className="peer sr-only"
                  value="male"
                  name="gender"
                  id="male"
                  type="radio"
                />
                <div
                  className="flex h-16 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400"
                >
                  <label
                    className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"
                    htmlFor="male"
                  >
                    <svg
                      viewBox="0 0 100000 100000"
                      text-rendering="geometricPrecision"
                      shape-rendering="geometricPrecision"
                      image-rendering="optimizeQuality"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      className="h-8 w-8 fill-current peer-checked:fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M35927 32903c412,2646 927,5119 1312,6767 -1320,-1159 -6849,-6682 -6569,-1799 342,5954 5284,6851 5297,6853l826 176 0 841c0,18 -115,6164 5054,8983 2585,1411 5371,2117 8155,2117 2783,0 5567,-706 8152,-2117 5169,-2819 5054,-8965 5054,-8983l0 -841 826 -176c13,-2 4955,-899 5297,-6853 273,-4760 -5035,428 -6400,1585 466,-2425 1265,-6640 1627,-10534 -707,-1139 -1761,-2058 -3310,-2445 -5841,-1459 -12802,2359 -14487,-898 -1685,-3256 -4043,-5728 -4043,-5728 0,0 -1461,5389 -4266,7749 -1302,1095 -2073,3278 -2525,5303zm7891 26143c0,0 -2213,3386 -2734,5600 -521,2213 -16015,783 -16407,9375 -392,8593 -391,16666 -391,16666l51429 0c0,0 1,-8073 -391,-16666 -392,-8592 -15886,-7162 -16407,-9375 -520,-2214 -2734,-5600 -2734,-5600 89,59 -103,-469 -339,-1065 1123,-370 2228,-847 3303,-1433 5035,-2746 5946,-8013 6109,-10011 1747,-593 5810,-2604 6152,-8552 329,-5738 -2626,-5167 -4942,-3884 588,-3342 1229,-9312 59,-16047 -1797,-10330 -8310,-7860 -13363,-8645 -5054,-786 -11791,3480 -11791,3480 0,0 -6064,-785 -8872,4717 -1830,3589 -79,10904 1361,15557l178 1232c-2363,-1457 -5799,-2573 -5444,3590 341,5948 4404,7959 6151,8552 163,1998 1075,7265 6110,10011 1074,586 2179,1063 3302,1433 -236,596 -428,1124 -339,1065zm11413 -875c37,1566 129,3813 367,5042 391,2019 -326,4297 -326,4297l-5271 5389 -5272 -5389c0,0 -717,-2278 -326,-4297 238,-1229 330,-3475 367,-5042 1719,502 3476,753 5232,753 1755,0 3511,-251 5229,-753z"
                      ></path>
                    </svg>
                    Homem
                  </label>
                </div>
              </div>
              <div>
                <input
                  className="peer sr-only"
                  value="female"
                  name="gender"
                  id="female"
                  type="radio"
                />
                <div
                  className="flex h-16 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400"
                >
                  <label
                    className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"
                    htmlFor="female"
                  >
                    <svg
                      id="female"
                      viewBox="0 0 128 128"
                      className="h-7 w-6 fill-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M64,72.7c0,0,0-0.1,0-0.1c0,0,0,0,0,0V72.7z"
                        fill="#000"
                      ></path>
                      <path
                        d="M54.6 49.2c.7 0 1.4-.3 1.9-.8.5-.5.8-1.2.8-1.9s-.3-1.4-.8-1.9c-.5-.5-1.2-.8-1.9-.8-.7 0-1.4.3-1.9.8-.5.5-.8 1.2-.8 1.9 0 .7.3 1.4.8 1.9C53.2 48.9 53.9 49.2 54.6 49.2zM73.8 49.2c.7 0 1.4-.3 1.9-.8.5-.5.8-1.2.8-1.9s-.3-1.4-.8-1.9c-.5-.5-1.2-.8-1.9-.8s-1.4.3-1.9.8c-.5.5-.8 1.2-.8 1.9s.3 1.4.8 1.9C72.5 48.9 73.1 49.2 73.8 49.2z"
                        fill="#000"
                      ></path>
                      <path
                        d="M40.6 78.1h10.7V67.1c3.7 2.4 8.1 3.7 12.5 3.7v0c0 0 .1 0 .1 0 0 0 .1 0 .1 0v0c4.4 0 8.8-1.3 12.5-3.7v11.1h10.7c.2 0 .4 0 .6 0h8.3V34.4c0-17.8-14.4-32.2-32.1-32.3v0c0 0-.1 0-.1 0 0 0-.1 0-.1 0v0C46.2 2.2 31.8 16.7 31.8 34.4v43.7H40C40.2 78.1 40.4 78.1 40.6 78.1zM44 38.1c0-3.2 2.6-5.8 5.8-5.8h14.1.2 14.1c3.2 0 5.8 2.6 5.8 5.8v9.1c0 4.5-1.5 8.6-4 12-1 1.3-2.2 2.6-3.4 3.6-3.4 2.8-7.8 4.5-12.6 4.5-4.8 0-9.2-1.7-12.6-4.5-1.3-1.1-2.5-2.3-3.4-3.6-2.5-3.4-4-7.5-4-12V38.1zM116.8 123.3c-.9-5.2-3-16.3-3.5-17.8-2.3-7-8.2-10.4-14.5-13-.8-.3-1.6-.7-2.4-1-5.5-2.1-11-4.3-16.5-6.4-2.6 6.2-8.8 10.5-15.9 10.5s-13.3-4.3-15.9-10.5c-5.5 2.1-11 4.3-16.5 6.4-.8.3-1.6.6-2.4 1-6.3 2.6-12.1 6-14.5 13-.5 1.4-2.5 12.6-3.5 17.8-.2 1 .3 1.9 1.1 2.3.3.2.7.3 1.1.3h101.1c.4 0 .8-.1 1.1-.3C116.5 125.1 116.9 124.2 116.8 123.3z"
                        className="fill-current"
                      ></path>
                    </svg>
                    Mulher
                  </label>
                </div>
              </div>
            </div>
            <select
              name="bloodType"
              onChange={handleChange}
              value={form.bloodType}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione o tipo sanguíneo</option>
              <option value="A+">A+</option>
              <option value="A-">A−</option>
              <option value="B+">B+</option>
              <option value="B-">B−</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB−</option>
              <option value="O+">O+</option>
              <option value="O-">O−</option>
            </select>
            <input
              name="phone"
              placeholder="(00) 00000-0000"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

                const maskedValue = rawValue
                  .replace(/^(\d{2})(\d)/, "($1) $2")           // (81) 
                  .replace(/^(\(\d{2}\))\s(\d{5})(\d)/, "$1 $2-$3") // (81) 91234-567

                  .slice(0, 15); // Limita ao tamanho máximo

                e.target.value = maskedValue;
                handleChange(e);
              }}
              value={form.phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="w-full">
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
            <input
              name="confirmationYear"
              placeholder="Ano de Confirmação"
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
                const yearValue = rawValue.slice(0, 4); // Limita a 4 dígitos (formato de ano)

                e.target.value = yearValue;
                handleChange(e); // Usa o evento original
              }}
              value={form.confirmationYear}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="col-span-2">
              {/* <label htmlFor="address" className="block mb-1 font-medium text-gray-700">
                Endereço
              </label> */}
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
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-all transform hover:scale-105 cursor-pointer">
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
