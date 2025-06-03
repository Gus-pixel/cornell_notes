"use server";

import { redirect } from "next/navigation";

export async function register(formData: FormData) {
	const nome = formData.get("nome")?.toString().trim();
	const email = formData.get("email")?.toString().trim();
	const senha = formData.get("senha")?.toString();
	const confirmSenha = formData.get("confirmSenha")?.toString();

	if (!nome || !email || !senha || !confirmSenha) {
		console.error("Todos os campos são obrigatórios.");
	}

	if (senha !== confirmSenha) {
		console.error("As senhas não coincidem.");
	}

	if (senha && senha.length < 6) {
		console.error("A senha deve ter pelo menos 6 caracteres.");
	}

	console.log("Registrando usuário:", {
		nome,
		email,
		senha,
		confirmSenha,
	});

	redirect("/dashboard");
}

export async function login(formData: FormData) {
	const email = formData.get("email")?.toString().trim();
	const senha = formData.get("senha")?.toString();

	if (!email || !senha) {
		console.error("Email e senha são obrigatórios.");
	}

	console.log("Autenticando usuário:", { email, senha });

	redirect("/dashboard");
}
