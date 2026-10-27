'use client';

import { TrashIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { is } from "zod/locales";

interface DeleteWithConfirmationProps {
    id: string;
    type: 'list' | 'list item';
    onDelete: (id: string, formData: FormData) => Promise<void>;
}

export default function DeleteWithConfirmation({ id, type, onDelete }: DeleteWithConfirmationProps) {
    const [ isOpen, setIsOpen ] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleDelete = onDelete.bind(null, id);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    useClickOutside(containerRef, () => {
        if (isOpen) {
            toggleIsOpen();
        }
    });

    return (
        <>
            <div className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`}>
				< div ref={containerRef} className="w-full max-w-md rounded-lg p-6 shadow-xl bg-mist-800">
					<h1 className="text-lg font-semibold text-white">Confirm Delete</h1>
					<p className="mt-2 text-sm text-gray-300">
						You are about to delete this {type} and all related data. This action cannot be undone. Do you want to continue?
					</p>
					<div className="mt-4 flex justify-end">
						<form action={handleDelete} className="flex gap-2">
                            <button 
                                type="button" 
                                className="rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                                onClick={toggleIsOpen}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
                            >
                                Confirm
                            </button>
                        </form>
					</div>
				</div>
			</div>
            <button type="button" onClick={toggleIsOpen} className="cursor-pointer">
                <TrashIcon className="w-5" />
            </button>
        </>
    );
}

