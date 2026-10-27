import { db } from '@/src/prisma/db';
import type { User, List, ListItem } from './definitions';

export async function getUser(email: string): Promise<User | null> {
    try {
        const user: User | null = await db.orm.public.User
            .select('id', 'email', 'password', 'google_id')
            .where({ email: email })
            .first();
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserLists(userId: string): Promise<List[] | null> {
    try {
        const lists: List[] | null = await db.orm.public.List
            .select('id', 'title')
            .where({ userId: userId })
            .include('listItems', (item) => item.select('id', 'title').orderBy((item) => item.position.asc()))
            .all();
        return lists;
    } catch (error) {
        throw new Error('Failed to fetch user lists');
    }
}