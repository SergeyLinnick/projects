import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // Database
    DATABASE_URL: z.string().url(),

    // Auth
    AUTH_SECRET: z.string().min(1),
    AUTH_ZITADEL_ISSUER: z.string().url(),
    AUTH_ZITADEL_CLIENT_ID: z.string().min(1),
    AUTH_ZITADEL_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
  },
  experimental__runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
