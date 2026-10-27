import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }){
            const isLoggedIn = !!auth?.user;
            const isOnTodoList = nextUrl.pathname.startsWith('/todo-list');
            if (isOnTodoList) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/todo-list', nextUrl));
            }
            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;