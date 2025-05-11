'use client';

import Image from 'next/image';

interface Patient {
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
}

interface Props {
    patients: Patient[];
    search: string;
    setSearch: (value: string) => void;
    onEdit: (id: number) => void;
    onView: (patient: Patient) => void;
}

export default function PatientCard({ patients, search, setSearch, onEdit, onView }: Props) {
    const filteredPatients = patients.filter(p =>
        `${p.name} ${p.record} ${p.cpf}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nome, prontuário ou CPF"
                    className="border border-gray-300 rounded-full px-4 py-2 w-full max-w-md text-gray-800"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredPatients.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum paciente encontrado.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {filteredPatients.map((patient) => (
                        <div
                            key={patient.id}
                            className="bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 relative hover:shadow-2xl transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <Image
                                    src={"/avatar01.png"}
                                    alt={`Avatar de ${patient.name}`}
                                    width={80}
                                    height={80}
                                    className="rounded-full border border-gray-300 w-20 h-20 object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{patient.name}</h2>
                                    <p className="text-sm text-gray-500">Prontuário: {patient.record}</p>
                                    <p className="text-sm text-gray-500">CPF: {patient.cpf}</p>
                                </div>
                            </div>

                            <div className="mt-auto flex justify-end gap-4">
                                <button 
                                    title="Editar Dados Médicos" 
                                    onClick={() => onEdit(patient.id)}
                                    className="hover:bg-yellow-100 p-1 rounded-full"
                                >
                                    <i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 text-xl transition-transform hover:scale-105 cursor-pointer"></i>
                                </button>
                                <button 
                                    title="Visualizar Paciente" 
                                    onClick={() => onView(patient)}
                                    className="hover:bg-green-100 p-1 rounded-full"
                                >
                                    <i className="bi bi-eye-fill text-green-600 hover:text-green-800 text-xl transition-transform hover:scale-105 cursor-pointer"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}