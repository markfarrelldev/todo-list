'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { updateListItemTitle, deleteListItem } from '@/app/lib/actions';
import EditableTitle from './editable-title';
import DeleteWithConfirmation from './delete-confirmation';

interface SortableItemProps {
	id: string;
	title: string;
}

export default function SortableItem({ id, title }: SortableItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id, data: { type: 'ListItem' } });

	// Apply smooth visual translation during dragging
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-4 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm"
    >
      {/* Drag Handle Icon/Button */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        aria-label="Drag handle"
      >
        ☰
      </button>
      
      <div className='flex flex-row justify-between w-full'>
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          <EditableTitle id={id} title={title} onEdit={updateListItemTitle} />
        </span>
        <DeleteWithConfirmation id={id} type="list item" onDelete={deleteListItem} />
      </div>
    </div>
  );
}