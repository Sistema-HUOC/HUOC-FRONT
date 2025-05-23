// pages/api/accept-terms.ts

import { NextResponse } from 'next/server';

// Simulação de "banco de dados" local
const users = [
  { email: 'admin@email.com', name: 'Jorge Patolino', acceptedTerms: false },
  { email: 'doctor@email.com', name: 'Paulo Muzy do Suco', acceptedTerms: false },
  { email: 'nurse@email.com', name: 'Nazaré Tedesco', acceptedTerms: false },
  { email: 'researcher@email.com', name: 'Serjão dos Foguetes', acceptedTerms: false },
];

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  const user = users.find(u => u.email === email);

  if (user) {
    user.acceptedTerms = true; // Simula a atualização
    console.log(`✅ [ACEITE DE TERMOS] Usuário: ${user.name} | Email: ${user.email} | Aceitou: ${user.acceptedTerms}`);

    return NextResponse.json({ success: true, message: `Termos aceitos por ${user.name}` });
  } else {
    console.log(`❌ [ACEITE DE TERMOS FALHOU] Usuário não encontrado para o email: ${email}`);
    return NextResponse.json(
      { success: false, message: 'Usuário não encontrado' },
      { status: 404 }
    );
  }
}
