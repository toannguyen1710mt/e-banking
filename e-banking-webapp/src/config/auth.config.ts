import type { NextAuthConfig } from 'next-auth';

// Constants
import { ROUTES } from '@/constants';

// Interfaces
import { IUser } from '@/interfaces';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser;
  }
}

export const authConfig = {
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage =
        nextUrl.pathname === ROUTES.SIGN_IN ||
        nextUrl.pathname === ROUTES.SIGN_UP;

      if (!isLoggedIn && !isPublicPage) {
        return Response.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
      }

      if (isLoggedIn && isPublicPage) {
        return Response.redirect(new URL(ROUTES.HOME, nextUrl));
      }

      return true;
    },

    async session({ session, token }) {
      Object?.assign(session.user, token);
      return session;
    },

    async jwt({ token, user }) {
      if (token) Object?.assign(token, user);
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
