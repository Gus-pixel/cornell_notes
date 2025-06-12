'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '@/app/types/User';
import { redirect } from 'next/navigation';

type AuthContextType = {
	user: UserData | null;
	logout: () => void;
	setUser: (user: UserData | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserData | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const storedUser = localStorage.getItem('user');

			if (storedUser) {
				try {
					const parsedUser = JSON.parse(storedUser as string);
					setUser(parsedUser);
				} catch (e) {
					console.error('Erro ao parsear cookie:', e);
				}
			}
		}
		fetchUser();
	}, []);

	const logout = () => {
		localStorage.removeItem('user');
		setUser(null);
		redirect('/login');
	};

	return (
		<AuthContext.Provider value={{ user, logout, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
}
