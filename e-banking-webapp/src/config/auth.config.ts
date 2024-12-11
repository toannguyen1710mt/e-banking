import type { NextAuthConfig } from 'next-auth';

// Constants
import { ROUTES } from '@/constants';

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
      const isRootRoute = nextUrl.pathname === '/';

      if (!isLoggedIn && !isPublicPage) {
        return Response.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
      }

      if (isLoggedIn && (isPublicPage || isRootRoute)) {
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
