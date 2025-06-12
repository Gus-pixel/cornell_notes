'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { login } from '@/lib/api/auth';
import { useActionState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(login, {
		email: '',
		error: null,
	});
	const { setUser, user } = useAuth();

	const router = useRouter();

	useLayoutEffect(() => {
		if (state?.success && state.user) {
			setUser(state.user);
			localStorage.setItem('user', JSON.stringify(state.user));
			router.replace('/dashboard');
		}

		if (user) {
			router.replace('/dashboard');
		}
	}, [state, router]);

	useEffect(() => {
		if (user) {
			router.replace('/dashboard');
		}
	}, [user]);

	return (
		<div className='flex min-h-screen flex-col bg-secondary'>
			<div className='flex flex-1 flex-col justify-center px-6 py-12'>
				<div className='mx-auto w-full max-w-md'>
					<div className='mb-6 flex justify-center'>
						<Logo />
					</div>
					<div className='rounded-lg border bg-white p-6 shadow-md'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-bold text-text-dark'>
								Entrar na sua conta
							</h1>
							<p className='text-sm text-muted-foreground'>
								Digite seu email e senha para acessar
							</p>
						</div>

						<div className='mt-6'>
							<form action={formAction} className='space-y-4'>
								{state?.error && (
									<p className='text-sm text-destructive text-center font-medium'>
										{state.error}
									</p>
								)}
								<div className='space-y-2'>
									<Label htmlFor='email' className='text-text-dark'>
										Email
									</Label>
									<Input
										id='email'
										name='email'
										type='email'
										defaultValue={state.email}
										required
										className='border-input focus-visible:ring-primary'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='senha' className='text-text-dark'>
										Senha
									</Label>
									<Input
										id='senha'
										name='senha'
										type='password'
										required
										className='border-input focus-visible:ring-primary'
									/>
								</div>

								<Button
									type='submit'
									className='w-full bg-primary hover:bg-primary/90'
									disabled={isPending}
									isLoading={isPending}
								>
									Entrar
								</Button>
							</form>

							<div className='mt-6 text-center text-sm'>
								Não tem uma conta?{' '}
								<Link
									href='/register'
									className='font-medium text-primary hover:underline'
								>
									Cadastrar
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
