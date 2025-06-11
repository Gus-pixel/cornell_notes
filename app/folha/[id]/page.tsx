'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import type { FolhaCornell, UserData } from '@/lib/mock-db';
import { ArrowLeftIcon, EditIcon, TrashIcon } from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Loading from '@/components/Loading';

export default function FolhaPage({ params }: { params: { id: string } }) {
	const router = useRouter();
	const [folha, setFolha] = useState<FolhaCornell | null>(null);
	const [user, setUser] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Redirecionar para a página de criação se o ID for "nova"
		if (params.id === 'nova') {
			router.push('/folha/nova');
			return;
		}

		const fetchData = async () => {
			try {
				// Buscar informações do usuário
				// const userResponse = await fetch('/api/user');
				// const userData = await userResponse.json();
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

				// Buscar folha específica
				// const folhaResponse = await fetch(`/api/folhas/${params.id}`);
				// if (!folhaResponse.ok) {
				// 	const errorData = await folhaResponse.json();
				// 	throw new Error(errorData.error || 'Folha não encontrada');
				// }
				// const folhaData = await folhaResponse.json();
				// setFolha(folhaData);
				//TODO : Simular carregamento de folha
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula atraso de 1 segundo
				setFolha({
					id: params.id,
					usuario_id: '1',
					materia: 'Matemática',
					titulo: 'Folha de Anotações de Matemática',
					resumo: 'Resumo da matéria de Matemática',
					palavras_chave: ['álgebra', 'geometria', 'cálculo'],
					anotacoes_relevantes: [
						'Anotação 1: Definição de álgebra',
						'Anotação 2: Teorema de Pitágoras',
					],
					cores_personalizadas: {
						fundo_cor: '#00b89470',
						materia_cor: '#2c3e50',
						titulo_cor: '#141e',
						palavras_chave_cor: '#6c5ce7',
						anotacoes_cor: '#00b894',
						resumo_cor: '#fdcb6e',
					},
				} as FolhaCornell);
			} catch (error) {
				console.error('Erro ao carregar dados:', error);
				setError(
					error instanceof Error ? error.message : 'Erro ao carregar dados'
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [params.id, router]);

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/folhas/${params.id}/excluir`, {
				method: 'DELETE',
			});

			if (response.ok) {
				router.push('/dashboard');
			} else {
				const data = await response.json();
				alert(data.error || 'Erro ao excluir folha');
			}
		} catch (error) {
			console.error('Erro ao excluir folha:', error);
			alert('Erro ao excluir folha');
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error || !folha) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<div className='mb-4 text-4xl'>⚠️</div>
					<p>
						{error ||
							'Folha não encontrada ou você não tem permissão para visualizá-la.'}
					</p>
					<Link href='/dashboard' className='mt-4 inline-block'>
						<Button>Voltar para o Dashboard</Button>
					</Link>
				</div>
			</div>
		);
	}

	const isPremium = user?.tipo === 'premium';

	return (
		<div className='container mx-auto p-6'>
			<div className='mb-6 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Link href='/dashboard'>
						<Button variant='outline' size='icon'>
							<ArrowLeftIcon className='h-4 w-4' />
						</Button>
					</Link>
					<h1 className='text-2xl font-bold'>{folha.titulo}</h1>
				</div>
				<div className='flex items-center gap-2'>
					<Link href={`/folha/${params.id}/editar`}>
						<Button variant='outline' size='icon'>
							<EditIcon className='h-4 w-4' />
						</Button>
					</Link>
					<Button
						variant='outline'
						size='icon'
						className='text-red-500'
						onClick={() => setShowDeleteDialog(true)}
					>
						<TrashIcon className='h-4 w-4' />
					</Button>
				</div>
			</div>

			<Card
				style={{
					backgroundColor:
						isPremium && folha.cores_personalizadas?.fundo_cor
							? folha.cores_personalizadas.fundo_cor
							: undefined,
				}}
			>
				<CardHeader>
					<div
						className='text-sm font-medium text-muted-foreground'
						style={{
							color:
								isPremium && folha.cores_personalizadas?.materia_cor
									? folha.cores_personalizadas.materia_cor
									: undefined,
						}}
					>
						{folha.materia}
					</div>
					<CardTitle
						style={{
							color:
								isPremium && folha.cores_personalizadas?.titulo_cor
									? folha.cores_personalizadas.titulo_cor
									: undefined,
						}}
					>
						{folha.titulo}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
						<div className='space-y-2'>
							<div
								className='text-sm font-medium text-muted-foreground'
								style={{
									color:
										isPremium && folha.cores_personalizadas?.palavras_chave_cor
											? folha.cores_personalizadas.palavras_chave_cor
											: undefined,
								}}
							>
								Palavras-chave
							</div>
							<ul className='space-y-1'>
								{folha.palavras_chave.map((palavra, index) => (
									<li
										key={index}
										style={{
											color:
												isPremium &&
												folha.cores_personalizadas?.palavras_chave_cor
													? folha.cores_personalizadas.palavras_chave_cor
													: undefined,
										}}
									>
										{palavra}
									</li>
								))}
								{folha.palavras_chave.length === 0 && (
									<li className='text-muted-foreground'>
										Nenhuma palavra-chave
									</li>
								)}
							</ul>
						</div>
						<div className='col-span-2 space-y-2'>
							<div
								className='text-sm font-medium text-muted-foreground'
								style={{
									color:
										isPremium && folha.cores_personalizadas?.anotacoes_cor
											? folha.cores_personalizadas.anotacoes_cor
											: undefined,
								}}
							>
								Anotações Relevantes
							</div>
							<ul className='space-y-1'>
								{folha.anotacoes_relevantes.map((anotacao, index) => (
									<li
										key={index}
										style={{
											color:
												isPremium && folha.cores_personalizadas?.anotacoes_cor
													? folha.cores_personalizadas.anotacoes_cor
													: undefined,
										}}
									>
										{anotacao}
									</li>
								))}
								{folha.anotacoes_relevantes.length === 0 && (
									<li className='text-muted-foreground'>
										Nenhuma anotação relevante
									</li>
								)}
							</ul>
						</div>
					</div>

					<div className='space-y-2'>
						<div
							className='text-sm font-medium text-muted-foreground'
							style={{
								color:
									isPremium && folha.cores_personalizadas?.resumo_cor
										? folha.cores_personalizadas.resumo_cor
										: undefined,
							}}
						>
							Resumo
						</div>
						<p
							style={{
								color:
									isPremium && folha.cores_personalizadas?.resumo_cor
										? folha.cores_personalizadas.resumo_cor
										: undefined,
							}}
						>
							{folha.resumo || (
								<span className='text-muted-foreground'>Nenhum resumo</span>
							)}
						</p>
					</div>
				</CardContent>
				<CardFooter className='text-sm text-muted-foreground'>
					<div className='flex w-full items-center justify-between'>
						<div>Matéria: {folha.materia}</div>
						{isPremium && (
							<div className='flex items-center gap-2'>
								<span>Cores personalizadas:</span>
								<div className='flex gap-1'>
									{folha.cores_personalizadas?.titulo_cor && (
										<div
											className='h-3 w-3 rounded-full'
											style={{
												backgroundColor: folha.cores_personalizadas.titulo_cor,
											}}
											title='Título'
										/>
									)}
									{folha.cores_personalizadas?.materia_cor && (
										<div
											className='h-3 w-3 rounded-full'
											style={{
												backgroundColor: folha.cores_personalizadas.materia_cor,
											}}
											title='Matéria'
										/>
									)}
									{folha.cores_personalizadas?.palavras_chave_cor && (
										<div
											className='h-3 w-3 rounded-full'
											style={{
												backgroundColor:
													folha.cores_personalizadas.palavras_chave_cor,
											}}
											title='Palavras-chave'
										/>
									)}
									{folha.cores_personalizadas?.anotacoes_cor && (
										<div
											className='h-3 w-3 rounded-full'
											style={{
												backgroundColor:
													folha.cores_personalizadas.anotacoes_cor,
											}}
											title='Anotações'
										/>
									)}
									{folha.cores_personalizadas?.resumo_cor && (
										<div
											className='h-3 w-3 rounded-full'
											style={{
												backgroundColor: folha.cores_personalizadas.resumo_cor,
											}}
											title='Resumo'
										/>
									)}
								</div>
							</div>
						)}
					</div>
				</CardFooter>
			</Card>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Excluir Anotação</AlertDialogTitle>
						<AlertDialogDescription>
							Tem certeza que deseja excluir esta anotação? Esta ação não pode
							ser desfeita.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className='bg-red-500 text-white hover:bg-red-600'
						>
							Excluir
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
