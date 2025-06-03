"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import type { FolhaCornell, User } from "@/lib/mock-db";
import { PlusIcon, SearchIcon, LockIcon } from "lucide-react";

export default function DashboardPage() {
	const [folhas, setFolhas] = useState<FolhaCornell[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	//TODO Mock usuário, remover quando for integrado com autenticação real
	const user: User = {
		id: "1",
		nome: "João Silva",
		email: "joaozinho@gmail.com",
		senha: "senha123",
		tipo: "gratuito", // Pode ser "gratuito" ou "premium"
	};

	useEffect(() => {
		setTimeout(() => {
			//TODO Simula o carregamento dos dados
			const mockFolhas: FolhaCornell[] = [
				{
					usuario_id: "1",
					id: "1",
					titulo: "Anotação 1",
					materia: "Matemática",
					palavras_chave: ["álgebra", "equações"],
					anotacoes_relevantes: ["Definição de álgebra", "Exemplo de equação"],
					resumo: "Resumo da anotação 1",
					cores_personalizadas: {
						fundo_cor: "#f0f0f0",
						materia_cor: "#333333",
						titulo_cor: "#000000",
						palavras_chave_cor: "#555555",
						anotacoes_cor: "#777777",
						resumo_cor: "#999999",
					},
				},
			];
			setFolhas(mockFolhas);
			setIsLoading(false);
		}, 1000);
	}, []);

	const handleSearch = async (query: string) => {
		setSearchQuery(query);

		// Se o usuário não for premium, não realizar a busca
		if (!user || user.tipo !== "premium") return;
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="mb-4 text-4xl">📖</div>
					<p>Carregando...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="mb-4 text-4xl">⚠️</div>
					<p>Sessão expirada. Por favor, faça login novamente.</p>
					<Link href="/login" className="mt-4 inline-block">
						<Button>Ir para Login</Button>
					</Link>
				</div>
			</div>
		);
	}

	const isPremium = user.tipo === "premium";
	const reachedLimit = !isPremium && folhas.length >= 3;

	return (
		<div className="flex min-h-screen flex-col">
			<DashboardHeader user={user} onSearch={handleSearch} />

			<main className="flex-1 p-6">
				<div className="container">
					<div className="mb-6 flex items-center justify-between">
						<h1 className="text-2xl font-bold">Minhas Anotações</h1>
						{!reachedLimit && (
							<Link href="/folha/nova">
								<Button>
									<PlusIcon className="mr-2 h-4 w-4" />
									Nova Anotação
								</Button>
							</Link>
						)}
					</div>

					{reachedLimit && (
						<div className="mb-6 rounded-lg border bg-amber-50 p-4 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
							<p className="flex items-center">
								<span className="mr-2 text-xl">⚠️</span>
								Você atingiu o limite de 3 folhas do plano gratuito.
								<Link href="/upgrade" className="ml-2 font-medium underline">
									Faça upgrade para o plano Premium
								</Link>
							</p>
						</div>
					)}

					{!isPremium && searchQuery && (
						<div className="mb-6 rounded-lg border bg-amber-50 p-4 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
							<p className="flex items-center">
								<LockIcon className="mr-2 h-5 w-5" />A busca é um recurso
								exclusivo para usuários Premium.
								<Link href="/upgrade" className="ml-2 font-medium underline">
									Faça upgrade para o plano Premium
								</Link>
							</p>
						</div>
					)}

					{isPremium && searchQuery && (
						<div className="mb-6 flex items-center gap-2">
							<SearchIcon className="h-4 w-4 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">
								Resultados para:{" "}
								<span className="font-medium">{searchQuery}</span>
							</p>
						</div>
					)}

					{isSearching ? (
						<div className="flex flex-col items-center justify-center py-12 text-center">
							<div className="mb-4 text-4xl">🔍</div>
							<p>Buscando anotações...</p>
						</div>
					) : folhas.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
							<div className="mb-4 text-4xl">📝</div>
							<h2 className="mb-2 text-xl font-medium">
								Nenhuma anotação encontrada
							</h2>
							<p className="mb-6 text-muted-foreground">
								{searchQuery && isPremium
									? "Nenhuma anotação corresponde à sua busca."
									: "Comece criando sua primeira anotação no método Cornell."}
							</p>
							{!searchQuery && !reachedLimit && (
								<Link href="/folha/nova">
									<Button>
										<PlusIcon className="mr-2 h-4 w-4" />
										Criar Anotação
									</Button>
								</Link>
							)}
						</div>
					) : (
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{folhas.map((folha) => (
								<Link key={folha.id} href={`/folha/${folha.id}`}>
									<Card
										className="h-full cursor-pointer transition-shadow hover:shadow-md"
										style={{
											backgroundColor:
												isPremium && folha.cores_personalizadas?.fundo_cor
													? folha.cores_personalizadas.fundo_cor
													: undefined,
										}}
									>
										<CardHeader className="pb-2">
											<div
												className="text-sm font-medium text-muted-foreground"
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
												className="line-clamp-1"
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
										<CardContent>
											<div className="mb-4 grid grid-cols-3 gap-2">
												<div className="col-span-1">
													<div
														className="mb-1 text-xs font-medium text-muted-foreground"
														style={{
															color:
																isPremium &&
																folha.cores_personalizadas?.palavras_chave_cor
																	? folha.cores_personalizadas
																			.palavras_chave_cor
																	: undefined,
														}}
													>
														Palavras-chave
													</div>
													<ul className="space-y-1 text-xs">
														{folha.palavras_chave.slice(0, 3).map((kw, idx) => (
															<li
																key={idx}
																className="line-clamp-1"
																style={{
																	color:
																		isPremium &&
																		folha.cores_personalizadas
																			?.palavras_chave_cor
																			? folha.cores_personalizadas
																					.palavras_chave_cor
																			: undefined,
																}}
															>
																{kw}
															</li>
														))}
														{folha.palavras_chave.length > 3 && (
															<li className="text-muted-foreground">...</li>
														)}
													</ul>
												</div>
												<div className="col-span-2">
													<div
														className="mb-1 text-xs font-medium text-muted-foreground"
														style={{
															color:
																isPremium &&
																folha.cores_personalizadas?.anotacoes_cor
																	? folha.cores_personalizadas.anotacoes_cor
																	: undefined,
														}}
													>
														Anotações Relevantes
													</div>
													<ul className="space-y-1 text-xs">
														{folha.anotacoes_relevantes
															.slice(0, 2)
															.map((note, idx) => (
																<li
																	key={idx}
																	className="line-clamp-1"
																	style={{
																		color:
																			isPremium &&
																			folha.cores_personalizadas?.anotacoes_cor
																				? folha.cores_personalizadas
																						.anotacoes_cor
																				: undefined,
																	}}
																>
																	{note}
																</li>
															))}
														{folha.anotacoes_relevantes.length > 2 && (
															<li className="text-muted-foreground">...</li>
														)}
													</ul>
												</div>
											</div>
											<div>
												<div
													className="mb-1 text-xs font-medium text-muted-foreground"
													style={{
														color:
															isPremium &&
															folha.cores_personalizadas?.resumo_cor
																? folha.cores_personalizadas.resumo_cor
																: undefined,
													}}
												>
													Resumo
												</div>
												<p
													className="line-clamp-2 text-xs"
													style={{
														color:
															isPremium &&
															folha.cores_personalizadas?.resumo_cor
																? folha.cores_personalizadas.resumo_cor
																: undefined,
													}}
												>
													{folha.resumo}
												</p>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
