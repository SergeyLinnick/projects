/**
 * Environment variables required by @repo/auth.
 * Used for documentation and composing env schemas in apps.
 */
export const authEnvKeys = {
  AUTH_SECRET: 'Generate with: openssl rand -base64 32',
  AUTH_ZITADEL_ISSUER: 'https://your-instance.zitadel.cloud',
  AUTH_ZITADEL_CLIENT_ID: 'Zitadel application client ID',
  AUTH_ZITADEL_CLIENT_SECRET: 'Zitadel application client secret',
} as const;
