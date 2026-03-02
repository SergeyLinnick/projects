import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from '@repo/database/client';
import { users, accounts, sessions, verificationTokens } from '@repo/database/schema';

import { authConfig } from './auth.config';

/**
 * Full auth configuration with database adapter and providers.
 *
 * This file imports the database and should NOT be used in middleware
 * (use auth.config.ts instead).
 */
export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    /**
     * Zitadel OIDC Provider
     *
     * Environment variables:
     * - AUTH_ZITADEL_ISSUER
     * - AUTH_ZITADEL_CLIENT_ID
     * - AUTH_ZITADEL_CLIENT_SECRET
     *
     * These are auto-detected by NextAuth when prefixed with AUTH_.
     * See: https://authjs.dev/getting-started/providers/zitadel
     */
    {
      id: 'zitadel',
      name: 'Zitadel',
      type: 'oidc',
      issuer: process.env.AUTH_ZITADEL_ISSUER,
      clientId: process.env.AUTH_ZITADEL_CLIENT_ID,
      clientSecret: process.env.AUTH_ZITADEL_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
});
