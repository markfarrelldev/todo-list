'use client';

import { createList } from "@/app/lib/actions";
import { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';


export default function CreateList() {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="absolute top-12 right-12">
            <form className={isOpen ? "block" : "hidden"} action={createList}>
                <div className="flex flex-row gap-2 rounded-lg items-end justify-center bg-mist-700 py-6 px-4">
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Enter a list title" 
                        className="rounded-md bg-mist-400 text-mist-950 shadow-md border p-2">    
                    </input>
                    <button 
                        type="submit"
                        className="rounded-md bg-sky-600 hover:bg-sky-500 px-4 py-2">
                            <CheckIcon className="w-6" />
                    </button>
                    <button 
                        type="button" 
                        className="rounded-md bg-red-600 hover:bg-red-500 px-4 py-2"
                        onClick={toggleIsOpen}><XMarkIcon className="w-6" /></button>
                </div>
            </form>
            <div className={isOpen ? "hidden" : "block"}>
                <button 
                    type="button"
                    className="rounded-md bg-sky-600 hover:bg-sky-500 px-4 py-2" 
                    onClick={toggleIsOpen}>Create List</button>
            </div>
        </div>
    );
}