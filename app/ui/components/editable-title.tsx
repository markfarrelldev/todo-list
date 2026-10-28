'use client';

import { PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

interface EditableTitleProps {
    id: string;
    title: string;
    onEdit: (id: string, formData: FormData) => Promise<void>;
}

export default function EditableTitle({ id, title, onEdit }: EditableTitleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(title);

    const containerRef = useRef<HTMLDivElement>(null);

     const toggleIsEditing = () => {
        setIsEditing(!isEditing);
    }

    useClickOutside(containerRef, () => {
        if(isEditing){
            setText(title);
            toggleIsEditing();
        }
    });

    const handleEdit = onEdit.bind(null, id);

    return (
        <div ref={containerRef}>
            {isEditing ? (
                <form action={handleEdit} className="flex flex-row align-center justify-center gap-1">
                    <input 
                        type="text"
                        name="title"
                        autoFocus
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit" className="cursor-pointer">
                        <CheckIcon className="w-5" />
                    </button>
                </form>
            ) : (
                <span className="flex flex-row align-center justify-center gap-2 cursor-default">
                    {`${text} `}
                    <button className="cursor-pointer" onClick={toggleIsEditing}>
                        <PencilSquareIcon className="w-5" />
                    </button>
                </span>
            )}
        </div>
    );
}