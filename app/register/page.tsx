import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { register } from "@/lib/auth";

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen flex-col bg-secondary">
			<div className="flex flex-1 flex-col justify-center px-6 py-12">
				<div className="mx-auto w-full max-w-md">
					<div className="mb-6 flex justify-center">
						<Logo />
					</div>
					<div className="rounded-lg border bg-white p-6 shadow-md">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-bold text-text-dark">
								Criar uma conta
							</h1>
							<p className="text-sm text-muted-foreground">
								Preencha os campos abaixo para se cadastrar
							</p>
						</div>

						<div className="mt-6">
							<form action={register} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="nome" className="text-text-dark">
										Nome
									</Label>
									<Input
										id="nome"
										name="nome"
										required
										className="border-input focus-visible:ring-primary"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email" className="text-text-dark">
										Email
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										required
										className="border-input focus-visible:ring-primary"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="senha" className="text-text-dark">
										Senha
									</Label>
									<Input
										id="senha"
										name="senha"
										type="password"
										required
										className="border-input focus-visible:ring-primary"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmSenha" className="text-text-dark">
										Confirmar Senha
									</Label>
									<Input
										id="confirmSenha"
										name="confirmSenha"
										type="password"
										required
										className="border-input focus-visible:ring-primary"
									/>
								</div>

								<Button
									type="submit"
									className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
								>
									Cadastrar
								</Button>
							</form>

							<div className="mt-6 text-center text-sm">
								Já tem uma conta?{" "}
								<Link
									href="/login"
									className="font-medium text-primary hover:underline"
								>
									Entrar
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
