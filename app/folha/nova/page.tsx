'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { UserData } from '@/lib/mock-db';
import { PlusIcon, XIcon } from 'lucide-react';
import Loading from '@/components/Loading';

export default function NovaFolhaPage() {
	const router = useRouter();
	const [user, setUser] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [palavrasChave, setPalavrasChave] = useState<string[]>(['']);
	const [anotacoesRelevantes, setAnotacoesRelevantes] = useState<string[]>([
		'',
	]);
	const [error, setError] = useState<string | null>(null);

	// Cores para usuários premium
	const [materiaColor, setMateriaColor] = useState('#000000');
	const [tituloColor, setTituloColor] = useState('#000000');
	const [palavrasChaveColor, setPalavrasChaveColor] = useState('#000000');
	const [anotacoesColor, setAnotacoesColor] = useState('#000000');
	const [resumoColor, setResumoColor] = useState('#000000');
	const [fundoColor, setFundoColor] = useState('#ffffff');

	useEffect(() => {
		const fetchUser = async () => {
			try {
				// const response = await fetch('/api/user');
				// if (!response.ok) {
				// 	throw new Error('Falha ao carregar informações do usuário');
				// }
				// const userData = await response.json();
				// setUser(userData);
				//TODO : Simular carregamento de usuário
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula atraso de 1 segundo
				setUser({
					id: '1',
					nome: 'João Silva',
					email: 'jaoao@silve.ocom',
					tipo: 'premium', // ou 'gratuito'
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				} as UserData);
			} catch (error) {
				console.error('Erro ao carregar usuário:', error);
				setError(
					error instanceof Error ? error.message : 'Erro ao carregar usuário'
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []);

	const handleAddPalavraChave = () => {
		setPalavrasChave([...palavrasChave, '']);
	};

	const handleRemovePalavraChave = (index: number) => {
		const newPalavrasChave = [...palavrasChave];
		newPalavrasChave.splice(index, 1);
		setPalavrasChave(newPalavrasChave);
	};

	const handlePalavraChaveChange = (index: number, value: string) => {
		const newPalavrasChave = [...palavrasChave];
		newPalavrasChave[index] = value;
		setPalavrasChave(newPalavrasChave);
	};

	const handleAddAnotacao = () => {
		setAnotacoesRelevantes([...anotacoesRelevantes, '']);
	};

	const handleRemoveAnotacao = (index: number) => {
		const newAnotacoes = [...anotacoesRelevantes];
		newAnotacoes.splice(index, 1);
		setAnotacoesRelevantes(newAnotacoes);
	};

	const handleAnotacaoChange = (index: number, value: string) => {
		const newAnotacoes = [...anotacoesRelevantes];
		newAnotacoes[index] = value;
		setAnotacoesRelevantes(newAnotacoes);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		// Adicionar palavras-chave e anotações ao formData
		formData.set('palavras_chave', palavrasChave.filter(Boolean).join(','));
		formData.set(
			'anotacoes_relevantes',
			anotacoesRelevantes.filter(Boolean).join(',')
		);

		// Adicionar cores para usuários premium
		if (user?.tipo === 'premium') {
			formData.set('materia_cor', materiaColor);
			formData.set('titulo_cor', tituloColor);
			formData.set('palavras_chave_cor', palavrasChaveColor);
			formData.set('anotacoes_cor', anotacoesColor);
			formData.set('resumo_cor', resumoColor);
			formData.set('fundo_cor', fundoColor);
		}

		try {
			const response = await fetch('/api/folhas/criar', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				router.push('/dashboard');
			} else {
				const data = await response.json();
				setError(data.error || 'Erro ao criar folha');
			}
		} catch (error) {
			console.error('Erro ao criar folha:', error);
			setError('Erro ao criar folha. Tente novamente mais tarde.');
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<div className='mb-4 text-4xl'>⚠️</div>
					<p>{error}</p>
					<Link href='/dashboard' className='mt-4 inline-block'>
						<Button>Voltar para o Dashboard</Button>
					</Link>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<div className='mb-4 text-4xl'>⚠️</div>
					<p>Sessão expirada. Por favor, faça login novamente.</p>
					<Link href='/login' className='mt-4 inline-block'>
						<Button>Ir para Login</Button>
					</Link>
				</div>
			</div>
		);
	}

	const isPremium = user?.tipo === 'premium';

	return (
		<div className='container mx-auto p-6'>
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Nova Anotação Cornell</h1>
				<Link href='/dashboard'>
					<Button variant='outline'>Voltar</Button>
				</Link>
			</div>

			<form onSubmit={handleSubmit}>
				<Card
					style={{
						backgroundColor: isPremium ? fundoColor : undefined,
					}}
				>
					<CardHeader>
						<CardTitle>Informações Básicas</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label
									htmlFor='materia'
									style={{ color: isPremium ? materiaColor : undefined }}
								>
									Matéria
								</Label>
								{isPremium && (
									<Input
										type='color'
										value={materiaColor}
										onChange={(e) => setMateriaColor(e.target.value)}
										className='h-8 w-12'
									/>
								)}
							</div>
							<Input
								id='materia'
								name='materia'
								required
								style={{ color: isPremium ? materiaColor : undefined }}
							/>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label
									htmlFor='titulo'
									style={{ color: isPremium ? tituloColor : undefined }}
								>
									Título
								</Label>
								{isPremium && (
									<Input
										type='color'
										value={tituloColor}
										onChange={(e) => setTituloColor(e.target.value)}
										className='h-8 w-12'
									/>
								)}
							</div>
							<Input
								id='titulo'
								name='titulo'
								required
								style={{ color: isPremium ? tituloColor : undefined }}
							/>
						</div>

						<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<Label
										htmlFor='palavras_chave'
										style={{
											color: isPremium ? palavrasChaveColor : undefined,
										}}
									>
										Palavras-chave
									</Label>
									{isPremium && (
										<Input
											type='color'
											value={palavrasChaveColor}
											onChange={(e) => setPalavrasChaveColor(e.target.value)}
											className='h-8 w-12'
										/>
									)}
								</div>
								<div className='space-y-2'>
									{palavrasChave.map((palavra, index) => (
										<div key={index} className='flex items-center gap-2'>
											<Input
												value={palavra}
												onChange={(e) =>
													handlePalavraChaveChange(index, e.target.value)
												}
												placeholder={`Palavra-chave ${index + 1}`}
												style={{
													color: isPremium ? palavrasChaveColor : undefined,
												}}
											/>
											{index > 0 && (
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() => handleRemovePalavraChave(index)}
												>
													<XIcon className='h-4 w-4' />
												</Button>
											)}
										</div>
									))}
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={handleAddPalavraChave}
										className='mt-2'
									>
										<PlusIcon className='mr-2 h-4 w-4' />
										Adicionar Palavra-chave
									</Button>
								</div>
							</div>

							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<Label
										htmlFor='anotacoes_relevantes'
										style={{ color: isPremium ? anotacoesColor : undefined }}
									>
										Anotações Relevantes
									</Label>
									{isPremium && (
										<Input
											type='color'
											value={anotacoesColor}
											onChange={(e) => setAnotacoesColor(e.target.value)}
											className='h-8 w-12'
										/>
									)}
								</div>
								<div className='space-y-2'>
									{anotacoesRelevantes.map((anotacao, index) => (
										<div key={index} className='flex items-center gap-2'>
											<Input
												value={anotacao}
												onChange={(e) =>
													handleAnotacaoChange(index, e.target.value)
												}
												placeholder={`Anotação ${index + 1}`}
												style={{
													color: isPremium ? anotacoesColor : undefined,
												}}
											/>
											{index > 0 && (
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() => handleRemoveAnotacao(index)}
												>
													<XIcon className='h-4 w-4' />
												</Button>
											)}
										</div>
									))}
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={handleAddAnotacao}
										className='mt-2'
									>
										<PlusIcon className='mr-2 h-4 w-4' />
										Adicionar Anotação
									</Button>
								</div>
							</div>
						</div>

						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<Label
									htmlFor='resumo'
									style={{ color: isPremium ? resumoColor : undefined }}
								>
									Resumo
								</Label>
								{isPremium && (
									<Input
										type='color'
										value={resumoColor}
										onChange={(e) => setResumoColor(e.target.value)}
										className='h-8 w-12'
									/>
								)}
							</div>
							<Textarea
								id='resumo'
								name='resumo'
								rows={4}
								style={{ color: isPremium ? resumoColor : undefined }}
							/>
						</div>

						{isPremium && (
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='fundo_cor'>Cor de Fundo</Label>
									<Input
										type='color'
										value={fundoColor}
										onChange={(e) => setFundoColor(e.target.value)}
										className='h-8 w-12'
									/>
								</div>
							</div>
						)}
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Link href='/dashboard'>
							<Button variant='outline'>Cancelar</Button>
						</Link>
						<Button type='submit'>Salvar Anotação</Button>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
