import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-10 border-b bg-background/10 backdrop-blur">
				<div className="container px-6 md:px-10 flex h-16 items-center justify-between backdrop-blur">
					<div className="text-2xl font-bold text-text-dark">
						📔 Cornell Notes
					</div>
					<div className="flex items-center gap-4">
						<Link href="/login">
							<Button variant="outline">Entrar</Button>
						</Link>
						<Link href="/register">
							<Button variant="default" className="text-secondary">
								Cadastrar
							</Button>
						</Link>
					</div>
				</div>
			</header>
			<main className="flex-1">
				<section className="container px-6 md:px-10 py-24 md:py-32">
					<div className="grid gap-10 md:grid-cols-2 md:gap-16">
						<div className="flex flex-col justify-center space-y-4">
							<h1 className="text-4xl font-bold tracking-tighter text-text-dark sm:text-5xl md:text-6xl">
								Método Cornell de Anotações
							</h1>
							<p className="max-w-[600px] text-muted-foreground md:text-xl">
								Organize seus estudos de forma eficiente com o método Cornell.
								Crie anotações estruturadas com palavras-chave, anotações
								relevantes e resumos.
							</p>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link href="/register">
									<Button
										size="lg"
										variant="default"
										className="w-full min-[400px]:w-auto text-secondary"
									>
										Começar Gratuitamente
									</Button>
								</Link>
								<Link href="#como-funciona">
									<Button
										variant="outline"
										size="lg"
										className="w-full min-[400px]:w-auto border-primary text-primary hover:text-primary/80 hover:border-primary/80"
									>
										Saiba Mais
									</Button>
								</Link>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="w-full max-w-[500px] rounded-lg border bg-white p-6 shadow-lg">
								<div className="mb-4 border-b pb-2">
									<div className="text-sm font-medium text-muted-foreground">
										Matéria
									</div>
									<div className="text-lg font-semibold text-text-dark">
										Matemática
									</div>
								</div>
								<div className="mb-4 border-b pb-2">
									<div className="text-sm font-medium text-muted-foreground">
										Título
									</div>
									<div className="text-lg font-semibold text-text-dark">
										Ramos da Matemática
									</div>
								</div>
								<div className="grid grid-cols-3 gap-4">
									<div className="col-span-1 space-y-2">
										<div className="text-sm font-medium text-muted-foreground">
											Palavras-chave
										</div>
										<ul className="space-y-1 text-sm text-text-dark">
											<li>Álgebra</li>
											<li>Geometria</li>
											<li>Cálculo</li>
											<li>Estatística</li>
										</ul>
									</div>
									<div className="col-span-2 space-y-2">
										<div className="text-sm font-medium text-muted-foreground">
											Anotações Relevantes
										</div>
										<ul className="space-y-1 text-sm text-text-dark">
											<li>
												Álgebra estuda estruturas e operações matemáticas.
											</li>
											<li>
												Geometria lida com formas, tamanhos e propriedades do
												espaço.
											</li>
											<li>Cálculo trata de variações e taxas de mudança.</li>
											<li>
												Estatística analisa dados para identificar padrões e
												tendências.
											</li>
										</ul>
									</div>
								</div>
								<div className="mt-4 space-y-2">
									<div className="text-sm font-medium text-muted-foreground">
										Resumo
									</div>
									<p className="text-sm text-text-dark">
										Os principais ramos da matemática oferecem diferentes
										ferramentas para compreender e resolver problemas. Álgebra
										fornece a base para manipulação simbólica, Geometria explora
										as propriedades do espaço, Cálculo permite o estudo de
										mudanças contínuas, e Estatística é fundamental para
										interpretar dados no mundo real.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section
					id="como-funciona"
					className="container px-6 md:px-10 py-12 md:py-24 lg:py-32"
				>
					<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
						<h2 className="text-3xl font-bold leading-[1.1] text-text-dark sm:text-3xl md:text-5xl">
							Como Funciona
						</h2>
						<p className="max-w-[85%] text-muted-foreground sm:text-lg">
							O método Cornell é uma técnica eficaz para organizar anotações de
							estudo, dividindo a página em seções específicas.
						</p>
					</div>
					<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
						<div className="relative overflow-hidden rounded-lg border bg-white p-6">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
								<span className="text-xl font-bold">1</span>
							</div>
							<h3 className="mt-4 text-xl font-bold text-text-dark">
								Palavras-chave
							</h3>
							<p className="mt-2 text-muted-foreground">
								Anote termos importantes, perguntas e conceitos principais na
								coluna da esquerda.
							</p>
						</div>
						<div className="relative overflow-hidden rounded-lg border bg-white p-6">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
								<span className="text-xl font-bold">2</span>
							</div>
							<h3 className="mt-4 text-xl font-bold text-text-dark">
								Anotações Relevantes
							</h3>
							<p className="mt-2 text-muted-foreground">
								Registre informações detalhadas, exemplos e explicações na
								coluna principal.
							</p>
						</div>
						<div className="relative overflow-hidden rounded-lg border bg-white p-6">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
								<span className="text-xl font-bold">3</span>
							</div>
							<h3 className="mt-4 text-xl font-bold text-text-dark">Resumo</h3>
							<p className="mt-2 text-muted-foreground">
								Sintetize os principais pontos e conclusões na seção inferior da
								página.
							</p>
						</div>
					</div>
				</section>

				<section className="bg-secondary py-12 md:py-24 lg:py-32">
					<div className="container px-6 md:px-10">
						<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
							<h2 className="text-3xl font-bold leading-[1.1] text-text-dark sm:text-3xl md:text-5xl">
								Planos
							</h2>
							<p className="max-w-[85%] text-muted-foreground sm:text-lg">
								Escolha o plano que melhor atende às suas necessidades.
							</p>
						</div>
						<div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2">
							<div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm">
								<div className="mb-4">
									<h3 className="text-2xl font-bold text-text-dark">
										Gratuito
									</h3>
									<p className="text-muted-foreground">Perfeito para começar</p>
								</div>
								<div className="mb-4 text-4xl font-bold text-primary">R$ 0</div>
								<ul className="mb-6 space-y-2">
									<li className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-4 w-4 text-accent-green"
										>
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
										<span className="text-text-dark">Até 3 folhas Cornell</span>
									</li>
									<li className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-4 w-4 text-muted-foreground"
										>
											<path d="M18 6 6 18"></path>
											<path d="m6 6 12 12"></path>
										</svg>
										<span className="text-muted-foreground">
											Busca em suas anotações
										</span>
									</li>
									<li className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-4 w-4 text-muted-foreground"
										>
											<path d="M18 6 6 18"></path>
											<path d="m6 6 12 12"></path>
										</svg>
										<span className="text-muted-foreground">
											Personalização de cores
										</span>
									</li>
								</ul>
								<Link href="/register" className="mt-auto">
									<Button
										variant="outline"
										className="w-full border-primary text-primary hover:text-primary/80 hover:border-primary/80"
									>
										Começar Agora
									</Button>
								</Link>
							</div>
							<div className="flex flex-col rounded-lg border-2 border-primary bg-white p-6 shadow-md">
								<div className="mb-4">
									<h3 className="text-2xl font-bold text-text-dark">Premium</h3>
									<p className="text-muted-foreground">
										Para estudantes avançados
									</p>
								</div>
								<div className="mb-4 text-4xl font-bold text-primary">
									R$ 9,90
								</div>
								<ul className="mb-6 space-y-2">
									<li className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-4 w-4 text-accent-green"
										>
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
										<span className="text-text-dark">
											Folhas Cornell ilimitadas
										</span>
									</li>
									<li className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-4 w-4 text-accent-green"
										>
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
										<span className="text-text-dark">
											Busca em suas anotações
										</span>
									</li>
									<li className="flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-4 w-4"
										>
											<polyline points="20 6 9 17 4 12"></polyline>
										</svg>
										<span className="text-text-dark">
											Personalização completa de cores
										</span>
									</li>
								</ul>
								<Link href="/register" className="mt-auto">
									<Button className="w-full bg-primary text-secondary hover:bg-primary/80">
										Começar Teste Gratuito
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="border-t py-6 md:py-8 bg-white">
				<div className="container px-6 md:px-10 flex flex-col items-center justify-between gap-4 md:flex-row">
					<p className="text-center text-sm text-muted-foreground md:text-center">
						Equipe Cornell Notes © {new Date().getFullYear()}. Todos os direitos
						reservados.
					</p>
				</div>
			</footer>
		</div>
	);
}
