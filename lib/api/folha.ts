// actions/folha.ts
'use server';

import { Folha, FolhaResponse } from '@/app/types/Folha';
import { request } from './api';
import { UserResponse } from './auth';
import { CoresPersonalizadas } from '../mock-db';

interface FolhaFormState extends Partial<Folha> {
	error?: string | null;
	success?: boolean;
	folhaId?: string;
}

export async function createFolha(
	prevState: FolhaFormState | null,
	formData: FormData
): Promise<FolhaFormState> {
	const titulo = formData.get('titulo')?.toString().trim() || '';
	const materia = formData.get('materia')?.toString().trim() || '';
	const resumo = formData.get('resumo')?.toString().trim() || '';
	const usuarioId = formData.get('usuarioId')?.toString() || '';

	try {
		const userResponse = await request<never, UserResponse>({
			method: 'GET',
			endpoint: `/user/${usuarioId}`,
		});

		const user = userResponse.user;

		console.log('user: ', user);

		const palavras_chave =
			formData.get('palavras_chave')?.toString().split(',').filter(Boolean) ||
			[];
		const anotacoes_relevantes =
			formData
				.get('anotacoes_relevantes')
				?.toString()
				.split(',')
				.filter(Boolean) || [];

		const folhaData: Omit<Folha, 'id' | 'usuario'> & {
			usuarioId: string;
			cores_personalizadas?: CoresPersonalizadas;
		} = {
			usuarioId: user.id,
			titulo: titulo || undefined,
			materia: materia || undefined,
			resumo: resumo || undefined,
			palavras_chave: palavras_chave.length ? palavras_chave : undefined,
			anotacoes_relevantes: anotacoes_relevantes.length
				? anotacoes_relevantes
				: undefined,
		};

		if (user.tipo === 'premium') {
			folhaData.cores_personalizadas = {
				fundo_cor: formData.get('fundo_cor')?.toString() || undefined,
				materia_cor: formData.get('materia_cor')?.toString() || undefined,
				titulo_cor: formData.get('titulo_cor')?.toString() || undefined,
				palavras_chave_cor:
					formData.get('palavras_chave_cor')?.toString() || undefined,
				anotacoes_cor: formData.get('anotacoes_cor')?.toString() || undefined,
				resumo_cor: formData.get('resumo_cor')?.toString() || undefined,
			};
		}

		console.log('folhaData: ', folhaData);

		const response = await request<typeof folhaData, FolhaResponse>({
			method: 'POST',
			endpoint: '/folha',
			body: folhaData,
		});

		console.log('response: ', response);

		return { success: true, folhaId: response.folha.id };
	} catch (err: any) {
		return {
			titulo,
			materia,
			resumo,

			error: err.message || 'Erro ao criar folha.',
		};
	}
}
