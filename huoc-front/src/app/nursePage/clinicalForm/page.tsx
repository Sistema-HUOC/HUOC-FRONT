'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";

const tabs = [
  "Geral", "Respiratório", "Infeccioso / Inflamatório", "Cardiovascular",
  "Gastrointestinal", "Neurológico", "Musculoesquelético", "Hematológico", "Psiquiátrico"
];

export default function ClinicalForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Moved to top level
  const [activeTab, setActiveTab] = useState("Geral");
  
  type FormSection = {
    [fieldKey: string]: string;
  };
  
  type FormData = {
    [section: string]: FormSection;
  };
  
  const [formData, setFormData] = useState<FormData>({});
  const [formStatus, setFormStatus] = useState<{ [tab: string]: 'salvo' | 'naoSalvo' }>({});

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      }
    }));
  };

  type Symptom = {
    label: string;
    key: string;
    hasDetail?: boolean;
    detailLabel?: string;
    hasOptions?: string[];
  };
  
  type SymptomList = {
    [section: string]: Symptom[];
  };

  const symptomList: SymptomList = {
    "Geral": [
      { label: "Febre", hasDetail: true, detailLabel: "Temperatura (°C)", key: "febre" },
      { label: "Cansaço/Fadiga", key: "fadiga" },
      { label: "Sudorese excessiva", key: "sudorese" },
      { label: "Perda de peso inexplicada", key: "perdaPeso" },
      { label: "Inchaço (edema)", key: "edema" }
    ],

    "Respiratório": [
      { label: "Tosse", key: "tosse", hasOptions: ["Seca", "Produtiva"] },
      { label: "Falta de ar (dispneia)", key: "dispneia" },
      { label: "Dor torácica ao respirar", key: "dorToracica" },
      { label: "Espirros", key: "espirros" },
      { label: "Coriza", key: "coriza" }
    ],

    "Infeccioso / Inflamatório": [
      { label: "Dor de garganta", key: "dorDeGarganta" },
      { label: "Linfonodos inchados", key: "linfonodosInchados" },
      { label: "Erupção cutânea", key: "erupcaoCutanea" },
      { label: "Úlceras na boca", key: "ulcerasNaBoca" }
    ],

    "Cardiovascular" : [
      { label: "Palpitações", key: "palpitacoes" },
      { label: "Dor no peito", key: "dorNoPeito" },
      { label: "Tontura/Desmaio", key: "tontutaDesmaio" },
      { label: "Pressão arterial elevada", key: "pressaoArterialElevada" },
      { label: "Extremidades frias", key: "extremidadesFrias" }
    ],

    "Gastrointestinal": [
      { label: "Náusea", key: "nausea" },
      { label: "Diarreia", key: "diarreia" },
      { label: "Prisão de ventre", key: "prisaoDeVentre" },
      { label: "Dor abdominal", key: "dorAbdominal" },
      { label: "Perda de Apetite", key: "perdaDeApetite" },
      { label: "Constipação", key: "constipacao" }
    ],

    "Neurológico": [
      { label: "Dor de cabeça", key: "dorDeCabeca" },
      { label: "Confusão mental", key: "confusaoMental" },
      { label: "Convulsões", key: "convulsoes" },
      { label: "Dor neuropática", key: "dorNeuropatica" },
      { label: "Parestesia", key: "parestesia" },
      { label: "Paresia", key: "paresia" },
      { label: "Plegia", key: "plegia" }
    ],

    "Musculoesquelético": [
      { label: "Dor articular", key: "dorArticular" },
      { label: "Rigidez muscular", key: "rigidezMuscular" },
      { label: "Fraqueza muscular", key: "fraquezaMuscular" },
      { label: "Inchaço nas articulações", key: "inchacoNasArticulacoes" }
    ],

    "Hematológico": [
      { label: "Sangramentos anormais", key: "sangramentosAnormais" },
      { label: "Hematomas fáceis", key: "hematomasFaceis" },
      { label: "Fraqueza muscular", key: "fraquezaMuscular" }
    ],

    "Psiquiátrico": [
      { label: "Ansiedade", key: "ansiedade" },
      { label: "Depressão", key: "depressão" },
      { label: "Alucinações", key: "alucinações" },
      { label: "Insônia", key: "insonia" }
    ],
  };

  const handlePartialSave = () => {
    const sectionData = formData[activeTab];
    const patientId = searchParams.get('id');
    
    if (!sectionData) {
      alert(`Nenhum dado preenchido na aba "${activeTab}".`);
      return;
    }
  
    if (!patientId) {
      alert("Paciente não identificado.");
      return;
    }
  
    const savedData = JSON.parse(localStorage.getItem("clinicalFormData") || "{}");
    
    // Atualiza apenas os dados do paciente específico
    const updatedData = {
      ...savedData,
      [patientId]: {
        ...(savedData[patientId] || {}),
        [activeTab]: sectionData
      }
    };
  
    localStorage.setItem("clinicalFormData", JSON.stringify(updatedData));
    
    // Atualiza o status apenas da aba atual
    setFormStatus(prev => ({
      ...prev,
      [activeTab]: 'salvo'
    }));
  
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      alert("Você chegou à última aba do formulário.");
    }
  };

  // Substitua o useEffect atual por este:
  useEffect(() => {
    const patientId = searchParams.get('id');
    if (!patientId) return;

    const savedData = localStorage.getItem("clinicalFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const patientData = parsedData[patientId] || {};
        
        // Atualiza o formData com os dados do paciente específico
        setFormData(patientData);

        // Atualiza o formStatus baseado nos dados existentes
        const newStatus: { [tab: string]: 'salvo' | 'naoSalvo' } = {};
        tabs.forEach(tab => {
          newStatus[tab] = patientData[tab] ? 'salvo' : 'naoSalvo';
        });
        setFormStatus(newStatus);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    } else {
      // Inicializa todos os status como 'naoSalvo' se não houver dados
      const initialStatus = tabs.reduce((acc, tab) => {
        acc[tab] = 'naoSalvo';
        return acc;
      }, {} as { [tab: string]: 'salvo' | 'naoSalvo' });
      setFormStatus(initialStatus);
    }
  }, [searchParams]);



  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-[#BFDBFE] flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
          <h1 className="text-lg font-semibold text-gray-800">Formulário de Sintomatologia Clínica</h1>
          </div>
          <button
              onClick={() => router.back()}
              className="text-blue-700 mr-3 font-semibold flex items-center gap-1 transition-all transform hover:scale-105 cursor-pointer border-b-2 border-transparent hover:border-blue-700"
              title="Voltar">
                <i className="bi bi-arrow-left text-lg"></i>
                <span>Voltar</span>
          </button>
      </header>
      <main className="bg-[#BFDBFE] items-center justify-center px-4 border-t-1 border-b-1 border-gray-400"> 
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 text-black mt-1 justify-center mt-3">
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              const status = formStatus[tab] || 'naoSalvo';
              const borderColor = status === 'salvo' ? 'border-b-4 border-green-300' : 'border-b-4 border-red-300';

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-[#8abff9]'} ${borderColor}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
      </main>
      

      <main 
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-bottom px-4"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
      
      {/* Symptoms */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      {(symptomList[activeTab] || []).map((symptom) => (
        <div key={symptom.key} className="space-y-2 text-black">
          <label className="block font-medium">{symptom.label}</label>
          <div className="flex items-center gap-4 text-gray-700 font-semibold text-sm">
            <label>
              <input
                type="radio"
                name={`${activeTab}-${symptom.key}`}
                value="Não"
                checked={formData[activeTab]?.[symptom.key] === "Não"}
                onChange={() => handleInputChange(activeTab, symptom.key, "Não")}
              />
              <span className="ml-1">Não</span>
            </label>
            <label>
              <input
                type="radio"
                name={`${activeTab}-${symptom.key}`}
                value="Sim"
                checked={formData[activeTab]?.[symptom.key] === "Sim"}
                onChange={() => handleInputChange(activeTab, symptom.key, "Sim")}
              />
              <span className="ml-1">Sim</span>
            </label>

            

            {/* Campo de texto adicional */}
            {symptom.hasDetail && formData[activeTab]?.[symptom.key] === "Sim" && (
              <input
                type="text"
                inputMode="decimal"
                pattern="^\d{2}(\.\d)?$"
                maxLength={4}
                placeholder={symptom.detailLabel}
                className="border p-1 rounded"
                value={formData[activeTab]?.[`${symptom.key}Detalhe`] || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  // Aceita apenas até 2 dígitos, opcionalmente seguidos de ponto e 1 dígito decimal
                  if (/^\d{0,2}(\.\d?)?$/.test(val)) {
                    handleInputChange(activeTab, `${symptom.key}Detalhe`, val);
                  }
                }}
              />
            )}

            {/* Opções adicionais (ex: Seca / Produtiva) */}
            {symptom.hasOptions &&
              formData[activeTab]?.[symptom.key] === "Sim" && (
                <div className="flex gap-2 ml-2">
                  {symptom.hasOptions.map((opt: string) => (
                    <label key={opt}>
                      <input
                        type="radio"
                        name={`${activeTab}-${symptom.key}-type`}
                        value={opt}
                        checked={
                          formData[activeTab]?.[`${symptom.key}Tipo`] === opt
                        }
                        onChange={() =>
                          handleInputChange(activeTab, `${symptom.key}Tipo`, opt)
                        }
                      />
                      <span className="ml-1">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
          </div>
        </div>
      ))}
   


        {/* Observações */}
        <div>
          <label className="block font-medium text-black">📝 Observações adicionais:</label>
          <textarea
            rows={3}
            className="w-full border p-2 rounded"
            onChange={(e) => handleInputChange(activeTab, "observacoes", e.target.value)}
            />
        </div>
      </div>

      {/* Upload */}
      {activeTab === "Geral" && (
        <div className="mt-6">
          <label className="block font-medium mb-2 text-black">📎 Anexar exames/laboratório:</label>
          <input type="file" className="text-blue-700"/>
        </div>
      )}


      <div className="mt-6">
        <button
          onClick={handlePartialSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          💾 Salvar "{activeTab}"
        </button>
      </div>

      </main>
      


      {/* Footer */}
      <footer className="bg-[#BFDBFE] text-center py-4 text-gray-800 text-sm">
        © 2025 Sistema HUOC. Todos os direitos reservados.
      </footer>
    </div>
  );
}
