"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { User } from "@/lib/mock-db";
import { LockIcon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "@/components/Logo";

interface DashboardHeaderProps {
	user: User;
	onSearch: (query: string) => void;
}

export function DashboardHeader({ user, onSearch }: DashboardHeaderProps) {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const isPremium = user.tipo === "premium";

	useEffect(() => {
		if (!isPremium) return;

		const timeoutId = setTimeout(() => {
			onSearch(searchQuery);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, onSearch, isPremium]);

	return (
		<header className="sticky top-0 z-10 border-b bg-white shadow-sm">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Logo href="/dashboard" />
				</div>

				<div className="flex flex-1 items-center justify-end gap-4 md:justify-center">
					<div className="w-full max-w-sm">
						{isPremium ? (
							<Input
								type="search"
								placeholder="Buscar anotações..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full border-primary focus-visible:ring-primary"
							/>
						) : (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="relative w-full">
											<Input
												type="search"
												placeholder="Buscar anotações..."
												disabled
												className="w-full bg-secondary pr-10"
											/>
											<LockIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>Busca disponível apenas para usuários Premium</p>
										<Link
											href="/upgrade"
											className="mt-1 block text-xs text-primary underline"
										>
											Fazer upgrade para Premium
										</Link>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className="hidden items-center gap-2 md:flex">
						<span className="text-sm font-medium text-text-dark">
							{user.nome} ({user.tipo === "premium" ? "Premium" : "Gratuito"})
						</span>
					</div>
					<form action="/api/logout" method="post">
						<Button
							variant="outline"
							size="sm"
							type="submit"
							className="border-primary text-primary"
						>
							Sair
						</Button>
					</form>
				</div>
			</div>
		</header>
	);
}
