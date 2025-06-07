import { NextRequest } from 'next/server';

export class AuthError extends Error {
  type: string;
  constructor(type: string) {
    super(type);
    this.type = type;
  }
}

const NextAuth = () => ({
  handlers: {
    GET: (_: NextRequest) => Promise<Response>,
    POST: (_: NextRequest) => Promise<Response>,
  },
  signIn: async () => {},
  signOut: async () => {},
  auth: async () => {},
  AuthError: AuthError,
});

export default NextAuth;
