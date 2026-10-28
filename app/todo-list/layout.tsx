import NavBar from '@/app/ui/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col overflow-hidden">
			<NavBar />
			<div className="relative w-screen min-h-0">{children}</div>
		</div>
	);
}