'use client';

import { useState, useEffect, useId } from 'react';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverEvent,
	DragEndEvent,
	closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import SortableList from './sortable-list';
import { List, ListItem } from '@/app/lib/definitions';

interface SortableBoardProps {
	initialLists: List[];
	onBoardChange?: (updatedLists: List[]) => void;
	onListChange?: (updatedList: List) => void;
}

export default function SortableBoard({ initialLists, onBoardChange, onListChange }: SortableBoardProps) {
	const [lists, setLists] = useState<List[]>(initialLists);
	const sensors = useSensors(useSensor(PointerSensor));
	const id = useId();

	// sync state if initial lists changes asynchronously
	// useEffect(() => {
	// 	setLists(initialLists);
	// }, [initialLists]);

	// locates which list id contains a given list item
	const findListIdOfListItem = (listItemId: string) => {
		const list = lists.find((l) => l.listItems.some((i) => i.id === listItemId));
		return list ? list.id : null;
	}

	function handleDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		const activeListId = findListIdOfListItem(activeId);
		const overListId = findListIdOfListItem(overId) || lists.find((l) => l.id === over.id)?.id;

		if (!activeListId || !overListId || activeListId === overListId) return;

		const activeList = lists.find((l) => l.id === activeListId);
		const overList = lists.find((l) => l.id === overListId);
		if (!activeList || !overList) return;

		const activeIndex = activeList.listItems.findIndex((i) => i.id === activeId);
		const overIndex = overList.listItems.findIndex((i) => i.id === overId);
		const newIndex = overIndex >= 0 ? overIndex : overList.listItems.length;

		const movedItem = activeList.listItems[activeIndex];
		if (!movedItem) return;

		const updated = lists.map((list) => {
			if (list.id === activeListId) {
				return {
					...list,
					listItems: list.listItems.filter((_, idx) => idx !== activeIndex)
				};
			}
			if (list.id === overListId) {
				const newItems = [...list.listItems];
				newItems.splice(newIndex, 0, movedItem);
				return { ...list, listItems: newItems };
			}
			return list;
		});

		setLists(updated);
	}

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		const activeListId = findListIdOfListItem(activeId);
		const overListId = findListIdOfListItem(overId) || lists.find((l) => l.id === overId)?.id;

		if (!activeListId || !overListId) return;

		let finalLists = lists;

		if (activeListId === overListId) {
			const targetList = lists.find((l) => l.id === activeListId);
			const activeIndex = targetList?.listItems.findIndex((i) => i.id === activeId);
			const overIndex = targetList?.listItems.findIndex((i) => i.id === overId);

			if (activeIndex != undefined && overIndex != undefined && activeIndex !== overIndex) {
				finalLists = lists.map((list) => {
					if (list.id === activeListId) {
						return {
							...list,
							listItems: arrayMove(list.listItems, activeIndex, overIndex)
						};
					}
					return list;
				});

				setLists(finalLists);
			}
		}

		if (onBoardChange) onBoardChange(finalLists);
	}

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<DndContext
				id={id}
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="flex gap-6 justify-center listItems-start overflow-x-auto pb-4">
					{lists.map((list) => (
						<SortableList
							key={list.id}
							id={list.id}
							title={list.title}
							listItems={list.listItems}
						/>
					))}
				</div>
			</DndContext>
		</div>
	);
}