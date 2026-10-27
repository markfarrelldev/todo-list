import SortableBoard from "../ui/components/sortable-board";
import { auth } from "@/auth";
import { getUserLists } from "../lib/data";
import { updateBoard, updateList } from "../lib/actions";
import { List } from '@/app/lib/definitions';
import CreateList from "../ui/components/create-list";

export default async function Page() {
	const session = await auth();
	const userId = session?.user?.id;
	
	const lists = userId ? await getUserLists(userId) : [];
		
	async function handleBoardChange(lists: List[]) {
		'use server';

		await updateBoard(lists);
	};

	async function handleListChange(list: List) {
		'use server';

		await updateList(list);
	};

	return (
		<main>
			<CreateList />
			<div className="flex flex-1 items-center justify-center p-4 h-screen">
				<SortableBoard 
					initialLists={lists ?? []}
					onBoardChange={handleBoardChange}
					onListChange={handleListChange}
				/>
			</div>
		</main>
	);
}