export type UserType = 'gratuito' | 'premium';

export interface User {
	id: string;
	nome: string;
	email: string;
	senha: string;
	tipo: UserType;
}

export interface UserData {
	id: string;
	nome: string;
	email: string;
	tipo: UserType;
	createdAt: string;
}
