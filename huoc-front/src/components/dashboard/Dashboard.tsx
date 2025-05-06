"use client";

import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  Bar,
  Doughnut,
  Scatter
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const barData = {
    labels: ["Palpitações", "Dor no Peito", "Tontura", "Pressão Arterial Elevada", "Extremidades Frias"],
    datasets: [
      {
        label: "Ocorrências",
        data: [150, 100, 140, 180, 90],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const, 
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Frequência de Sintomas',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  const doughnutData = {
    labels: ["Homem","Mulher"],
    datasets: [
      {
        data: [35, 38],
        backgroundColor: ["#8ac7de", "#f26b7a"],
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: "Idade vs Intensidade dos Sintomas",
        data: [
          { x: 25, y: 2 },
          { x: 40, y: 3 },
          { x: 60, y: 4 },
          { x: 80, y: 5 },
          { x: 45, y: 3 },
          { x: 50, y: 4 },
          { x: 55, y: 6 },
        ],
        backgroundColor: "#6366f1",
      },
    ],
  };


  const topSymptomsData = {
    labels: ["Tosse", "Febre", "Dor de Cabeça", "Fadiga", "Falta de Ar", "Náusea", "Dor Muscular", "Alergias"],
    datasets: [
      {
        label: "Top Sintomas",
        data: [150, 120, 180, 100, 80, 120, 90, 160],
        backgroundColor: "#f97316",
      },
    ],
  };

  return (
    <div className="p-8 grid grid-cols-1 rounded-md md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-screen">
      {/* KPIs */}
      <div className="bg-cyan-600 hover:scale-101 text-white p-4 rounded-md shadow col-span-1 hover:shadow-xl transition-all duration-300">
        <h2 className="text-sm">Total de Casos</h2>
        <p className="text-2xl font-bold">540</p>
      </div>

      <div className="bg-green-600 hover:scale-101 text-white p-4 rounded-md shadow col-span-1 hover:shadow-xl transition-all duration-300">
        <h2 className="text-sm">Média de Sintomas por Paciente</h2>
        <p className="text-2xl font-bold">3.2</p>
      </div>

      <div className="bg-orange-400 hover:scale-101 text-white p-4 rounded-md shadow col-span-1 hover:shadow-xl transition-all duration-300">
        <h2 className="text-sm">Gravidade Média</h2>
        <p className="text-2xl font-bold">2.8 / 5</p>
      </div>

      {/* Sintomas Mais Comuns */}
      <div className="bg-white rounded-md shadow-md p-8 card-hover hover:scale-101 transition-all duration-300 hover:shadow-xl">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Sintomas Mais Comuns</h3>
        <div className="flex flex-wrap gap-2">
          <div className="symptom-chip bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-head-side-cough mr-1"></i> Tosse
          </div>
          <div className="symptom-chip bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-temperature-high mr-1"></i> Febre
          </div>
          <div className="symptom-chip bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-dizzy mr-1"></i> Dor de Cabeça
          </div>
          <div className="symptom-chip bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-tired mr-1"></i> Fadiga
          </div>
          <div className="symptom-chip bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-lungs mr-1"></i> Falta de Ar
          </div>
          <div className="symptom-chip bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-tired mr-1"></i> Náusea
          </div>
          <div className="symptom-chip bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-bone mr-1"></i> Dor Muscular
          </div>
          <div className="symptom-chip bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
            <i className="fas fa-allergies mr-1"></i> Alergias
          </div>
        </div>
      </div>

      {/* Top Sintomas */}
      <div className="bg-white p-4 rounded-md shadow-md col-span-1 hover:shadow-xl transition-all duration-300 hover:scale-101">
        <h2 className="font-semibold mb-2 text-gray-800">Top Sintomas</h2>
        <Bar data={topSymptomsData} />
      </div>

      {/* Gráfico de dispersão */}
      <div className="bg-white p-4 rounded-md shadow hover:shadow-xl transition-all hover:scale-101 duration-300">
        <h2 className="font-semibold mb-2 text-gray-800">Idade vs Intensidade</h2>
        <Scatter data={scatterData} />
      </div>

      {/* Gráfico de barras */}
      <div className="bg-white hover:scale-101 p-4 rounded-md shadow col-span-2 hover:shadow-xl transition-all duration-300">
        <h2 className="font-semibold mb-2 text-gray-800">Frequência dos Sintomas Cardiovascular</h2>
        <Bar data={barData} options={options}/>
      </div>

      {/* Gráfico Doughnut */}
      <div className="bg-white p-4 hover:scale-101 rounded-md shadow hover:shadow-xl transition-all duration-300">
        <h2 className="font-semibold mb-2 text-gray-800">Frequência do Sintoma de Ansiedade</h2>
        <Doughnut data={doughnutData} />
      </div>


          
    </div>
  );
}
