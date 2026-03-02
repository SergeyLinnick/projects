import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe auth configuration.
 *
 * This file is imported by middleware and MUST NOT import any database
 * packages or Node.js-only modules. Keep it lightweight.
 *
 * The full config in `auth.ts` extends this with the Drizzle adapter.
 */
export const authConfig = {
  providers: [],  // Providers are added in auth.ts to keep this edge-safe
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/(dashboard)') 
        || (!nextUrl.pathname.startsWith('/sign-in') 
            && !nextUrl.pathname.startsWith('/sign-up')
            && !nextUrl.pathname.startsWith('/api'));

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to sign-in
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
} satisfies NextAuthConfig;
