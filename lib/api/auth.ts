'use server';

import { redirect } from 'next/navigation';
import { request } from './api';
import { UserData } from '@/app/types/User';
import { cookies } from 'next/headers';
import { FormState } from '@/app/types/FormState';

interface RegisterResponse {
	user: UserData;
}

interface RegisterFormState extends FormState {
	nome?: string;
	email?: string;
	user?: UserData;
}

interface LoginFormState extends FormState {
	email?: string;
	user?: UserData;
}

export async function register(
	prevState: FormState | null,
	formData: FormData
): Promise<RegisterFormState> {
	const nome = formData.get('nome')?.toString().trim();
	const email = formData.get('email')?.toString().trim();
	const senha = formData.get('senha')?.toString();
	const confirmSenha = formData.get('confirmSenha')?.toString();

	const fields = {
		nome: nome || '',
		email: email || '',
	};

	if (!nome || !email || !senha || !confirmSenha) {
		return { ...fields, error: 'Todos os campos são obrigatórios.' };
	}

	if (senha !== confirmSenha) {
		return { ...fields, error: 'As senhas não coincidem.' };
	}

	if (senha.length < 6) {
		return { ...fields, error: 'A senha deve ter pelo menos 6 caracteres.' };
	}

	try {
		const response = await request<
			{ nome: string; email: string; senha: string },
			RegisterResponse
		>({
			method: 'POST',
			endpoint: '/user',
			body: { nome, email, senha },
		});

		return { success: true, user: response.user };
	} catch (err: any) {
		console.error('Erro no registro:', err.message);
		return {
			...fields,
			error: err.message || 'Erro ao registrar usuário.',
		};
	}
}

export async function login(
	prevState: FormState | null,
	formData: FormData
): Promise<LoginFormState> {
	const email = formData.get('email')?.toString().trim();
	const senha = formData.get('senha')?.toString();

	const fields = {
		email: email || '',
	};

	if (!email || !senha) {
		return { ...fields, error: 'Todos os campos são obrigatórios.' };
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

		return { success: true, user: response.user };
	} catch (err: any) {
		console.error('Erro no login:', err.message);

		return { ...fields, error: err.message || 'Email ou senha incorretos.' };
	}
}
