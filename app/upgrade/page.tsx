import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Upgrade() {
	const router = useRouter();

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='text-center'>
				<div className='mb-4 text-4xl'>⚠️</div>
				<p>Ainda não implementado</p>
				<Button onClick={() => router.back()}>Voltar</Button>
			</div>
		</div>
	);
}
