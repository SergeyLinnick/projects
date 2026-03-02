/**
 * Composed environment schema for the web app.
 * Import this file in next.config.ts for build-time validation.
 *
 * Each package declares its required env vars via @repo/env,
 * and this file re-exports them so they're validated together.
 */
export { serverEnv } from '@repo/env/server';
export { clientEnv } from '@repo/env/client';
