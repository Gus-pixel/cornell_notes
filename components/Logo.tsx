import Link from "next/link";

interface LogoProps {
	href?: string;
	className?: string;
}

export default function Logo({ href = "/", className = "" }: LogoProps) {
	const content = (
		<div className={`logo-container ${className}`}>
			<div className="text-3xl font-bold text-text-dark">📘 Cornell Notes</div>
		</div>
	);

	if (href) {
		return <Link href={href}>{content}</Link>;
	}

	return content;
}
