'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PatientCard from '@/components/patientCard/PatientCard';

export default function FollowUpPatientsPage() {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [patients] = useState([
        {
            id: 3,
            name: 'Marcos Freitas',
            record: 'PR112233',
            avatar: '/avatars/avatar1.png',
            registeredAt: '15/03/2024',
            lastAppointment: '02/05/2024',
            status: 'Em acompanhamento',
        },
        {
            id: 4,
            name: 'Juliana Souza',
            record: 'PR998877',
            avatar: '/avatars/avatar1.png',
            registeredAt: '17/03/2024',
            lastAppointment: '30/04/2024',
            status: 'Em acompanhamento',
        },
    ]);

    const handleEdit = (id: number) => {
        router.push(`/cadastro001?id=${id}`);
    };

    const handleView = (patient: any) => {
        alert(`Visualizar paciente: ${patient.name}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-[#DBEAFE] flex items-center justify-between px-6 py-4 shadow-md">
                <div className="flex items-center gap-3">
                    <Image src="/huoc-system.png" alt="Logo HUOC" width={40} height={40} />
                    <h1 className="text-lg font-semibold text-gray-800">HUOC - Acompanhamento</h1>
                </div>
                <button
                    onClick={() => router.back()}
                    className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 transition"
                >
                    <i className="bi bi-arrow-left text-lg"></i>
                    <span>Voltar</span>
                </button>
            </header>

            {/* Main */}
            <main className="flex-grow bg-cover bg-bottom px-6 py-10" style={{ backgroundImage: "url('/bg.jpg')" }}>
                <div className="p-4">
                    <PatientCard
                        patients={patients}
                        search={search}
                        setSearch={setSearch}
                        onEdit={handleEdit}
                        onView={handleView}
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#DBEAFE] text-center py-4 text-sm text-gray-800">
                © 2025 Sistema HUOC. Todos os direitos reservados.
            </footer>
        </div>
    );
}
