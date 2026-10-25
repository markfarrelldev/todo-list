'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableItem from './sortable-item';
import { ListItem } from '@/app/lib/definitions';
import AddListItem from './add-list-item';
import EditableTitle from './editable-title';
import { updateListTitle, deleteList } from '@/app/lib/actions';
import DeleteWithConfirmation from './delete-confirmation';

interface SortableListProps {
	id: string;
	title: string;
	listItems: ListItem[];
}

export default function SortableList({ id, title, listItems }: SortableListProps) {
	const { setNodeRef } = useDroppable({ id });

	return (
    <div className="flex flex-col w-72 bg-gray-100 p-4 rounded-xl min-h-[500px]">
      <h3 className="font-bold text-gray-700 mb-4 flex listItems-center justify-between">
        <EditableTitle id={id} title={title} onEdit={updateListTitle} />
		<DeleteWithConfirmation id={id} type="list" onDelete={deleteList} />
        {/* <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">
          {listItems.length}
        </span> */}
      </h3>

      <div ref={setNodeRef} className="flex-1 flex flex-col pb-4">
        <SortableContext
          items={listItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {listItems.map((item) => (
            <SortableItem key={item.id} id={item.id} title={item.title} />
          ))}
        </SortableContext>
		<AddListItem listId={id} position={listItems.length} />
      </div>
    </div>
  );
}