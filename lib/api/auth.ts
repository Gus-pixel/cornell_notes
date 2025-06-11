'use server';

import { redirect } from 'next/navigation';
import { request } from './api';

export async function register(formData: FormData) {
	const nome = formData.get('nome')?.toString().trim();
	const email = formData.get('email')?.toString().trim();
	const senha = formData.get('senha')?.toString();
	const confirmSenha = formData.get('confirmSenha')?.toString();

	if (!nome || !email || !senha || !confirmSenha) {
		throw new Error('Todos os campos são obrigatórios.');
	}

	if (senha !== confirmSenha) {
		throw new Error('As senhas não coincidem.');
	}

	if (senha.length < 6) {
		throw new Error('A senha deve ter pelo menos 6 caracteres.');
	}

	try {
		await request({
			method: 'POST',
			endpoint: '/user',
			body: { nome, email, senha },
		});

		redirect('/login');
	} catch (err: any) {
		console.error('Erro no registro:', err.message);
		throw err;
	}
}
