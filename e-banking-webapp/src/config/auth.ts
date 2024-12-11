import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { z } from 'zod';

// Config
import { authConfig } from './auth.config';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { placeholder: 'Username', type: 'text' },
        password: { placeholder: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return ERROR_MESSAGES.INVALID_CREDENTIALS;
        }

        const { username, password } = parsedCredentials.data;

        // Check user permission from Strapi api
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              identifier: username,
              password,
            }),
          },
        );

        if (!response.ok) {
          return ERROR_MESSAGES.INVALID_USER_PERMISSIONS;
        }

        const { jwt, user } = await response.json();

        return { ...user, token: jwt };
      },
    }),
  ],
});
