import NextAuth from 'next-auth';
import { authConfig } from '@repo/auth/config';

/**
 * Auth middleware — runs on the Edge runtime.
 *
 * Only imports auth.config.ts (edge-safe, no DB adapter).
 * Protects routes based on the authorized() callback.
 */
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  /**
   * Match all routes except:
   * - API routes (api/)
   * - Static files (_next/static, _next/image)
   * - Favicon and other static assets
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
