import { NextResponse } from 'next/server';

const users = [
  {email: 'admin@email.com', name: 'Jorge Patolino'},
  {email: 'doctor@email.com', name: 'Paulo Muzy do Suco'},
  {email: 'nurse@email.com', name: 'Nazaré Tedesco'},
  {email: 'researcher@email.com', name: 'Serjão dos Foguetes'}
]

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = users.find(u => u.email === email);

  if (user && password === '123') {
    console.log(`✅ [LOGIN SUCESSO] Usuário: ${user.name} | Email: ${user.email}`);
    return NextResponse.json({
      token: 'fake-jwt-token',
      user: { name: user.name, email: user.email },
    });
  } else {
    console.log(`❌ [LOGIN FALHOU] Tentativa com email: ${email}`);
    return NextResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 }
    );
  }
}
