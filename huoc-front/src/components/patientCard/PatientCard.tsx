'use client';

import Image from 'next/image';

interface Patient {
    id: number;
    name: string;
    record: string;
    avatar: string;
    createdAt?: string;
    registeredAt?: string;
    lastAppointment?: string;
    status: string;
}

interface Props {
    patients: Patient[];
    search: string;
    setSearch: (value: string) => void;
    onEdit: (id: number) => void;
    onView: (patient: Patient) => void;
}

export default function PatientList({ patients, search, setSearch, onEdit, onView }: Props) {
    const filteredPatients = patients.filter(p =>
        `${p.name} ${p.record}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nome ou nº de prontuário"
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
                                    src={patient.avatar}
                                    alt={`Avatar de ${patient.name}`}
                                    width={100}
                                    height={100}
                                    className="rounded-full border border-gray-300"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{patient.name}</h2>
                                    <p className="text-sm text-gray-500">Prontuário: {patient.record}</p>
                                    {patient.createdAt && (
                                        <p className="text-xs text-gray-400">Cadastro: {patient.createdAt}</p>
                                    )}
                                    {patient.registeredAt && (
                                        <p className="text-xs text-gray-400">Registrado: {patient.registeredAt}</p>
                                    )}
                                    {patient.lastAppointment && (
                                        <p className="text-xs text-gray-400">Última consulta: {patient.lastAppointment}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <i className={`bi ${patient.status === 'Novo' ? 'bi-star-fill text-blue-500' : 'bi-clock-fill text-yellow-500'}`}></i>
                                <span className="text-sm font-medium text-black">{patient.status}</span>
                            </div>

                            <div className="mt-auto flex justify-end gap-4">
                                <button title="Editar Dados Médicos" onClick={() => onEdit(patient.id)}>
                                    <i className="bi bi-pencil-square text-yellow-600 hover:text-yellow-800 text-xl transition-transform hover:scale-105 cursor-pointer"></i>
                                </button>
                                <button title="Visualizar Paciente" onClick={() => onView(patient)}>
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
