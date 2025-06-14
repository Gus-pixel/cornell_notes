export interface CoresPersonalizadas {
	titulo_cor?: string;
	materia_cor?: string;
	palavras_chave_cor?: string;
	anotacoes_cor?: string;
	resumo_cor?: string;
	fundo_cor?: string;
}

export interface FolhaCornell {
	id: string;
	usuario_id: string;
	materia: string;
	titulo: string;
	resumo: string;
	palavras_chave: string[];
	anotacoes_relevantes: string[];
	cores_personalizadas?: CoresPersonalizadas;
}
