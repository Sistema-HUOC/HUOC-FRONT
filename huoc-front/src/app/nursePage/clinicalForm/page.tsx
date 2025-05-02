'use client';
import { useState } from 'react';

const tabs = [
  "Geral", "Respiratório", "Infeccioso / Inflamatório", "Cardiovascular",
  "Gastrointestinal", "Neurológico", "Musculoesquelético", "Hematológico", "Psiquiátrico"
];

export default function ClinicalForm() {
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
      { label: "Cansaço / Fadiga", key: "fadiga" },
      { label: "Sudorese excessiva", key: "sudorese" },
      { label: "Perda de peso inexplicada", key: "perdaPeso" },
      { label: "Inchaço (edema)", key: "edema" }
    ],
    "Respiratório": [
      { label: "Tosse", hasOptions: ["Seca", "Produtiva"], key: "tosse" },
      { label: "Falta de ar (dispneia)", key: "dispneia" },
      { label: "Dor torácica ao respirar", key: "dorToracica" },
      { label: "Espirros", key: "espirros" },
      { label: "Coriza", key: "coriza" }
    ]
    // Continue com os demais sintomas...
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Formulário de Sintomatologia Clínica</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Symptoms */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        {(symptomList[activeTab] || []).map(symptom => (
          <div key={symptom.key} className="space-y-2">
            <label className="block font-medium">{symptom.label}</label>
            <div className="flex items-center gap-4">
              <label>
                <input type="radio" name={`${activeTab}-${symptom.key}`} onChange={() => handleInputChange(activeTab, symptom.key, "Não")} />
                <span className="ml-1">Não</span>
              </label>
              <label>
                <input type="radio" name={`${activeTab}-${symptom.key}`} onChange={() => handleInputChange(activeTab, symptom.key, "Sim")} />
                <span className="ml-1">Sim</span>
              </label>
              {symptom.hasDetail && (
                <input type="text" placeholder={symptom.detailLabel} className="border p-1 rounded" />
              )}
              {symptom.hasOptions && (
                <div className="flex gap-2">
                  {symptom.hasOptions.map(opt => (
                    <label key={opt}>
                      <input type="radio" name={`${activeTab}-${symptom.key}-type`} />
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
          <label className="block font-medium">📝 Observações adicionais:</label>
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
          <label className="block font-medium mb-2">📎 Anexar exames/laboratório:</label>
          <input type="file" />
        </div>
      )}
    </div>
  );
}
