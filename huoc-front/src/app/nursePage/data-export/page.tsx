'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import * as XLSX from 'xlsx';

/* Types
type Patient = {
  id: number;
  nome: string;
  idade: number;
  genero: string;
  sintomas: {
    [key: string]: string | boolean | number;
  };
  dataRegistro: string;
  pressaoArterial: string;
  temperatura: string;
  satO2: number;
};
*/
type FilterOptions = {
  gender: string;
  minAge: number | '';
  maxAge: number | '';
  symptoms: {
    [key: string]: boolean | string;
  };
  dateRange: {
    start: string;
    end: string;
  };
};

type SymptomCategory = {
  label: string;
  items: {
    label: string;
    key: string;
    hasDetail?: boolean;
    detailLabel?: string;
    hasOptions?: string[];
  }[];
};

// Symptom categories
const symptomCategories: SymptomCategory[] = [
  {
    label: "Geral",
    items: [
      { label: "Febre", hasDetail: true, detailLabel: "Temperatura (°C)", key: "febre" },
      { label: "Cansaço/Fadiga", key: "fadiga" }
    ]
  },
  {
    label: "Respiratório",
    items: [
      { label: "Tosse", key: "tosse", hasOptions: ["Seca", "Produtiva"] },
      { label: "Falta de ar (dispneia)", key: "dispneia" }
    ]
  },
  {
    label: "Infeccioso / Inflamatório",
    items: [
      { label: "Dor de garganta", key: "dorDeGarganta" },
      { label: "Linfonodos inchados", key: "linfonodosInchados" }
    ]
  },
  {
    label: "Cardiovascular",
    items: [
      { label: "Palpitações", key: "palpitacoes" },
      { label: "Dor no peito", key: "dorNoPeito" }
    ]
  },
  {
    label: "Gastrointestinal",
    items: [
      { label: "Náusea", key: "nausea" },
      { label: "Diarreia", key: "diarreia" }
    ]
  },
  {
    label: "Neurológico",
    items: [
      { label: "Dor de cabeça", key: "dorDeCabeca" },
      { label: "Confusão mental", key: "confusaoMental" }
    ]
  },
  {
    label: "Musculoesquelético",
    items: [
      { label: "Dor articular", key: "dorArticular" },
      { label: "Rigidez muscular", key: "rigidezMuscular" }
    ]
  },
  {
    label: "Hematológico",
    items: [
      { label: "Sangramentos anormais", key: "sangramentosAnormais" },
      { label: "Hematomas fáceis", key: "hematomasFaceis" }
    ]
  },
  {
    label: "Psiquiátrico",
    items: [
      { label: "Ansiedade", key: "ansiedade" },
      { label: "Depressão", key: "depressao" }
    ]
  }
];

export default function DataExportPage() {
  const router = useRouter();
  const [format, setFormat] = useState<'json' | 'csv' | 'xlsx'>('json');
  const [filters, setFilters] = useState<FilterOptions>({
    gender: 'all',
    minAge: '',
    maxAge: '',
    symptoms: {},
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      
      // Prepare the payload with format
      const payload = {
        ...filters,
        format
      };

      // Call backend API
      const response = await fetch('/api/export-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      // Handle different formats
      if (format === 'json') {
        downloadJson(data);
      } else if (format === 'csv') {
        const csv = convertToCSV(data);
        downloadCsv(csv);
      } else if (format === 'xlsx') {
        downloadExcel(data);
      }
    } catch (error) {
      console.error("Export error:", error);
      alert('Erro ao exportar dados: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  };

  const downloadJson = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'dados_pacientes.json');
  };

  const downloadCsv = (csv: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, 'dados_pacientes.csv');
  };

  const downloadExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    downloadBlob(blob, 'dados_pacientes.xlsx');
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  const convertToCSV = (data: any[]) => {
    if (!data || data.length === 0) return '';
    
    const flattenObject = (obj: any, prefix = ''): any[] => {
      return Object.keys(obj).flatMap(key => {
        const value = obj[key];
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null) {
          return flattenObject(value, fullKey);
        }
        
        return { key: fullKey, value };
      });
    };
  
    // Get all unique keys
    const allKeys = Array.from(
      new Set(
        data.flatMap(item => flattenObject(item).map(({ key }) => key))
      )
    );
  
    // Create CSV rows
    const csvRows = [
      allKeys.join(','),
      ...data.map(item => {
        const flattened = flattenObject(item);
        return allKeys.map(key => {
          const found = flattened.find(f => f.key === key);
          return `"${String(found?.value ?? '').replace(/"/g, '""')}"`;
        }).join(',');
      })
    ];
    
    return csvRows.join('\n');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('dateRange.')) {
      const dateType = name.split('.')[1] as keyof FilterOptions['dateRange'];
      setFilters(prev => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [dateType]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
      }));
    }
  };

  const handleSymptomToggle = (key: string) => {
    setFilters(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [key]: !prev.symptoms[key]
      }
    }));
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
        <div className="bg-white rounded-md shadow-xl p-6 space-y-4 w-full max-w-4xl transition-all duration-300 hover:scale-101 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Exportar Dados</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Formato de exportação:</label>
              <select
                className="w-full p-2 border rounded-md text-gray-600"
                value={format}
                onChange={(e) => setFormat(e.target.value as 'json' | 'csv' | 'xlsx')}
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel (.xlsx)</option>
              </select>
            </div>

            <div className="pt-2 border-t">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-blue-600 flex items-center gap-1 text-sm"
              >
                <i className={`bi bi-chevron-${showFilters ? 'down' : 'right'}`}></i>
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros avançados'}
              </button>

              {showFilters && (
                <div className="mt-3 space-y-4 p-3 bg-gray-50 rounded-md text-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Gênero:</label>
                      <select
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="all">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 mb-1">Idade mínima:</label>
                        <input
                          type="number"
                          name="minAge"
                          value={filters.minAge}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded-md"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1">Idade máxima:</label>
                        <input
                          type="number"
                          name="maxAge"
                          value={filters.maxAge}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded-md"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Período:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Data inicial:</label>
                        <input
                          type="date"
                          name="dateRange.start"
                          value={filters.dateRange.start}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Data final:</label>
                        <input
                          type="date"
                          name="dateRange.end"
                          value={filters.dateRange.end}
                          onChange={handleFilterChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Sintomas:</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {symptomCategories.map(category => (
                        <div key={category.label} className="border p-3 rounded-md">
                          <h3 className="font-medium text-gray-700 mb-2">{category.label}</h3>
                          <div className="space-y-2">
                            {category.items.map(symptom => (
                              <label key={symptom.key} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={!!filters.symptoms[symptom.key]}
                                  onChange={() => handleSymptomToggle(symptom.key)}
                                  className="h-4 w-4"
                                />
                                <span>{symptom.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleExport}
              disabled={isLoading}
              className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full mt-4 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-arrow-repeat animate-spin"></i>
                  Exportando...
                </span>
              ) : 'Exportar Dados'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-sm text-gray-800">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}