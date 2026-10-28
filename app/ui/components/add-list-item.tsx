'use client';

import { useState } from "react";
import { createListItem } from '@/app/lib/actions';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function AddListItem({ listId, position }: { listId: string, position: number }) {
    const [ isOpen, setIsOpen ] = useState(false);

    const addNewListItem = createListItem.bind(null, listId, position);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="flex items-center gap-3 mb-2 rounded-lg shadow-sm">
            <form className={isOpen ? "block" : "hidden"} action={addNewListItem}>
                <div className="flex flex-row w-full items-center">
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Enter task title" 
                        className="rounded-md min-w-0 flex-1 bg-white text-mist-950 w-full border p-2">    
                    </input>
                    <button 
                        type="submit"
                        className="rounded-md shrink-0 bg-sky-600 hover:bg-sky-500 p-2">
                            <CheckIcon className="w-6"/>
                    </button>
                    <button 
                        type="button" 
                        className="rounded-md shrink-0 bg-red-600 hover:bg-red-500 p-2"
                        onClick={toggleIsOpen}>
                            <XMarkIcon className="w-6"/>
                    </button>
                </div>
            </form>
            <div className={`w-full ${isOpen ? "hidden" : "block"}`}>
                <button 
                    type="button"
                    className="rounded-md w-full bg-sky-600 hover:bg-sky-500 px-4 py-2" 
                    onClick={toggleIsOpen}>Add List Item</button>
            </div>
        </div>
    );
}