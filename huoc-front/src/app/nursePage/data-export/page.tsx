'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import * as XLSX from 'xlsx';

// Função para gerar dados fictícios
const generateFakeData = () => {
  const patients = [];
  const startDate = new Date(2023, 0, 1);
  
  for (let i = 1; i <= 50; i++) {
    patients.push({
      id: i,
      nome: `Paciente ${i}`,
      idade: Math.floor(Math.random() * 50 + 18),
      genero: Math.random() > 0.5 ? 'Masculino' : 'Feminino',
      sintomas: {
        febre: Math.random() > 0.7 ? 'SIM' : 'NAO',
        tosse: Math.random() > 0.5 ? 'SIM' : 'NAO',
        faltaDeAr: Math.random() > 0.8 ? 'SIM' : 'NAO'
      },
      dataRegistro: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0],
      pressaoArterial: `${Math.floor(Math.random() * 30 + 100)}x${Math.floor(Math.random() * 20 + 70)}`,
      temperatura: (Math.random() * 3 + 36).toFixed(1),
      satO2: Math.floor(Math.random() * 10 + 90)
    });
  }
  
  return patients;
};

export default function DataExportPage() {
  const router = useRouter();
  const [format, setFormat] = useState('json');

  const handleExport = () => {
    try {
      const data = generateFakeData();

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        downloadBlob(blob, 'dados_pacientes.json');
      }

      if (format === 'csv') {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        downloadBlob(blob, 'dados_pacientes.csv');
      }

      if (format === 'xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        downloadBlob(blob, 'dados_pacientes.xlsx');
      }
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
    }
  };


  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any[]) => {
    if (!data || data.length === 0) return '';
    
    const flattenObject = (obj: any) => {
      return Object.keys(obj).map(key => {
        const value = obj[key];
        return typeof value === 'object' ? JSON.stringify(value) : value;
      });
    };

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        flattenObject(row)
          .map(field => `"${String(field ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
    ];
    
    return csvRows.join('\n');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col bg-cover bg-top" style={{ backgroundImage: "url('/bg.jpg')" }}>
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">
            HUOC - Sistema de Coleta de Dados Clínicos
          </h1>
        </div>
        <button
          onClick={() => router.push('/nursePage/researcherPage')}
          className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
          title="Voltar"
        >
          <i className="bi bi-arrow-left text-lg"></i>
          <span>Voltar</span>
        </button>
      </header>

      {/* Export Options */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-md shadow-xl p-6 space-y-4 w-full max-w-xl transition-all duration-300 hover:scale-101 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Exportar Dados</h2>
          <p className="text-gray-600">Escolha o formato para exportação dos dados:</p>

          <select
            className="w-full p-2 border rounded-md text-gray-600"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="xlsx">Excel (.xlsx)</option>
          </select>

          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
          >
            Exportar Dados
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-sm text-gray-800">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}
