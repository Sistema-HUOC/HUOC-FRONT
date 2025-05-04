'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";



const tabs = [
  "Geral", "Respiratório", "Infeccioso / Inflamatório", "Cardiovascular",
  "Gastrointestinal", "Neurológico", "Musculoesquelético", "Hematológico", "Psiquiátrico"
];

export default function ClinicalForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Geral");
  type FormSection = {
    [fieldKey: string]: string;
  };
  
  type FormData = {
    [section: string]: FormSection;
  };
  
  const [formData, setFormData] = useState<FormData>({});
  

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
  
    if (!sectionData) {
      alert(`Nenhum dado preenchido na aba "${activeTab}".`);
      return;
    }
  
    // Exemplo com localStorage
    const savedData = JSON.parse(localStorage.getItem("clinicalFormData") || "{}");
    const updatedData = {
      ...savedData,
      [activeTab]: sectionData
    };

    // await fetch('/api/form', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
  
    localStorage.setItem("clinicalFormData", JSON.stringify(updatedData));
    alert(`Dados da aba "${activeTab}" salvos com sucesso!`);

    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      alert("Você chegou à última aba do formulário.");
    }
  };
  
  useEffect(() => {
    const saved = localStorage.getItem("clinicalFormData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);



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
                className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 transition"
                title="Voltar"
              >
                <i className="bi bi-arrow-left text-lg"></i>
                <span>Voltar</span>
              </button>
            </header>

      <main 
        className="flex-grow flex flex-col items-center justify-center bg-cover bg-bottom px-4"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >


      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 text-black mt-1">
        {tabs.map(tab => (
          <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-[#BFDBFE]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

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
                placeholder={symptom.detailLabel}
                className="border p-1 rounded"
                value={formData[activeTab]?.[`${symptom.key}Detalhe`] || ""}
                onChange={(e) =>
                  handleInputChange(activeTab, `${symptom.key}Detalhe`, e.target.value)
                }
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
      {activeTab === "Psiquiátrico" && (
        <div className="mt-6">
          <label className="block font-medium mb-2 text-black">📎 Anexar exames/laboratório:</label>
          <input type="file" className="text-blue-700"/>
        </div>
      )}


      <div className="mt-6">
        <button
          onClick={handlePartialSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
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
