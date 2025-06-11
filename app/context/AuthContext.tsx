'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '@/app/types/User';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

type AuthContextType = {
	user: UserData | null;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		const storedUser = getCookie('user');

		if (storedUser) {
			try {
				const parsed = JSON.parse(storedUser as string);
				setUser(parsed);
			} catch (e) {
				console.error('Erro ao parsear cookie:', e);
			}
		}
	}, []);

	const logout = () => {
		deleteCookie('user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
}
