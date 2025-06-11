type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiRequestOptions<T> {
	method: RequestMethod;
	endpoint: string;
	body?: T;
}

export async function request<TBody = unknown, TResponse = unknown>({
	method,
	endpoint,
	body,
}: ApiRequestOptions<TBody>): Promise<TResponse> {
	try {
		const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: body ? JSON.stringify(body) : undefined,
			cache: 'no-store',
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.error || 'Erro na requisição.');
		}

		return res.json();
	} catch (err: any) {
		console.error('Erro na API:', err.message);
		throw err;
	}
}
