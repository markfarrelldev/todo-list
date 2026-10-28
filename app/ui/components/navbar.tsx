import Link from 'next/link';
import { signOut } from '@/auth';
import { caveat } from '../fonts';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
	return(
		<div className="bg-mist-900 p-4 text-sky-400 shadow-md flex-shrink-0">
			<div className="mx-auto flex items-center justify-between">
				<div className={`${caveat.className} text-3xl font-bold flex flex-row gap-1`}>To-Done <CheckIcon className='w-8' /></div>
				<div className="space-x-4">
					<form
						action={async () => {
							'use server';
							await signOut({ redirectTo: '/' });
						}}
					>
						<button>
							Sign Out
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}