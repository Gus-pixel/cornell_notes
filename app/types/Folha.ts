export interface CoresPersonalizadas {
	fundo_cor?: string;
	materia_cor?: string;
	titulo_cor?: string;
	palavras_chave_cor?: string;
	anotacoes_cor?: string;
	resumo_cor?: string;
}

export interface Folha {
	id: string;
	usuarioId: string;
	materia?: string;
	titulo?: string;
	resumo?: string;
	palavras_chave?: string[];
	anotacoes_relevantes?: string[];
	cores_personalizadas?: CoresPersonalizadas | null;
}

export interface FolhaResponse {
	folha: Folha;
}
