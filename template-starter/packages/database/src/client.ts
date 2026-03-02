import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

/**
 * Database client — driver-agnostic setup.
 *
 * Currently uses `postgres` (postgres.js) which works with:
 * - Self-hosted PostgreSQL
 * - Neon (via pooled connection string)
 * - Supabase
 * - Any standard PostgreSQL
 *
 * To switch to Neon's serverless driver (HTTP, better for edge/serverless):
 *
 *   import { neon } from '@neondatabase/serverless';
 *   import { drizzle } from 'drizzle-orm/neon-http';
 *
 *   const sql = neon(process.env.DATABASE_URL!);
 *   export const db = drizzle(sql, { schema });
 *
 * To switch to node-postgres (pg):
 *
 *   import { Pool } from 'pg';
 *   import { drizzle } from 'drizzle-orm/node-postgres';
 *
 *   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
 *   export const db = drizzle(pool, { schema });
 */

const connectionString = process.env.DATABASE_URL!;

// For query purposes (app code)
const queryClient = postgres(connectionString);

// For migrations (single connection, non-pooled)
// Use direct connection string (not pooled) for migrations
export const migrationClient = postgres(connectionString, { max: 1 });

export const db = drizzle(queryClient, { schema });

export type Database = typeof db;
