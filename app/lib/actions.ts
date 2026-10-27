'use server';

import { Temporal as TemporalPolyfill } from '@js-temporal/polyfill';
if (!globalThis.Temporal) {
  globalThis.Temporal = TemporalPolyfill;
}
import { SignUpInput } from "./signupSchema";
import bcrypt from 'bcrypt';
import { db } from '@/src/prisma/db';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { List } from './definitions';
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        console.log(`formData: ${formData.get('email')?.toString()} ${formData.get('password')?.toString()}`);
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signUpWithEmail(data: SignUpInput) {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await db.orm.public.User.create({
            email: data.email,
            password: hashedPassword,
            lists: (l) =>
                l.create([{ title: "To-do" }])
        });

        return "success";
    } catch (error) {
        if ((error as { sqlState?: string }).sqlState === "23505") {
            return "email taken";
        }
        throw error;
    }
}

async function updateListItemPositions(list: List) {
    try {
        for (const listItem of list.listItems) {
            console.log(`listId: ${list.id} id: ${listItem.id}`);
        }
        await db.transaction(async (tx) => {
            for(let index = 0; index < list.listItems.length; index++) {
                const item = list.listItems[index];

                await tx.orm.public.ListItem
                    .where({ id: item.id })
                    .update({ listId: list.id, position: index });
            } 
        });
    } catch (error) {
        console.error("Database error while updating list item positions", error);
    }
    
}

export async function updateList(list: List) {
    await updateListItemPositions(list);

    revalidatePath('/todo-list');
}

export async function updateBoard(lists: List[]) {

    for (const list of lists) {
        await updateListItemPositions(list);
    }
    
    revalidatePath('/todo-list');
}

export async function createList(formData: FormData) {
    const session = await auth();
	const userId = session?.user?.id;
    
    const title = formData.get('title')?.toString();

    if (userId && title) {
        try {
            db.orm.public.List.create({
                title: title,
                userId: userId
            });
        } catch (error) {
            throw "failed to create list";
        }
    }
    revalidatePath('/todo-list');
    redirect('/todo-list');
}

export async function deleteList(listId: string) {
    try {
        await db.orm.public.List
            .where({ id: listId })
            .delete();
    } catch (error) {
        throw "failed to delete list";
    }
    revalidatePath('/todo-list');
}

export async function updateListTitle(listId: string, formData: FormData) {
    const title = formData.get('title')?.toString();
    
    if (title) {
        try {
            await db.orm.public.List
                .where({ id: listId })
                .update({ title: title });
        } catch (error) {
            throw "failed to update list title";
        }
        revalidatePath('/todo-list');
    }
}

export async function createListItem(listId: string, position: number, formData: FormData) {

    const title = formData.get('title')?.toString();

    try {
        if (title) {
            db.orm.public.ListItem.create({
                title: title,
                listId: listId,
                position: position
            });
        }
    } catch (error) {
        throw "failed to add list item";
    }
    revalidatePath('/todo-list');
    redirect('/todo-list');
}

export async function updateListItemTitle(listItemId: string, formData: FormData) {

    const title = formData.get('title')?.toString();

    try {
        if (title) {
            db.orm.public.ListItem
                .where({ id: listItemId })
                .update({ title: title});
        }
    } catch (error) {
        throw "failed to update list item title"
    }
    revalidatePath('/todo-list');
}

export async function deleteListItem(listItemId: string) {
    try {
        db.orm.public.ListItem
            .where({ id: listItemId })
            .delete();
    } catch (error) {
        throw "failed to delete list item";
    }
    revalidatePath('/todo-list');
}
