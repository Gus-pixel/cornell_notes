'use server';

import { redirect } from 'next/navigation';
import { request } from './api';
import { UserData } from '@/app/types/User';
import { useAuth } from '@/app/context/AuthContext';
import { cookies } from 'next/headers';

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
	} catch (err: any) {
		console.error('Erro no registro:', err.message);
		throw err;
	}
}

export async function login(formData: FormData) {
	const email = formData.get('email')?.toString().trim();
	const senha = formData.get('senha')?.toString();

	if (!email || !senha) {
		throw new Error('Todos os campos são obrigatórios.');
	}

	try {
		const response = await request<
			{ email: string; senha: string },
			{ user: UserData }
		>({
			method: 'POST',
			endpoint: '/login',
			body: { email, senha },
		});

		const cookieStore = await cookies();
		cookieStore.set('user', JSON.stringify(response.user), {
			path: '/',
		});
	} catch (err: any) {
		console.error('Erro no login:', err.message);

		throw new Error(err.message || 'Erro ao fazer login.');
	}
}
