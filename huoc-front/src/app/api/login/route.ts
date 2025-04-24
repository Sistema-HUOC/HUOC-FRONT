import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (email === 'admin@teste.com' && password === '123456') {
    console.log("Usuario Autenticado com Sucesso!");
    return NextResponse.json({
      token: 'fake-jwt-token',
      user: { name: 'Admin', email },
    });
  } else {
    console.log("Usuario Não Autenticado!");
    return NextResponse.json(
      { message: 'Credenciais inválidas' },
      { status: 401 }
    );
  }
}
