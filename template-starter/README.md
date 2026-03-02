# Starter Kit

A production-ready monorepo template built with Next.js 15, React 19, Turborepo, and TypeScript.

## Tech Stack

| Category | Technology |
|---|---|
| Package Manager | PNPM v10 + Turborepo |
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| UI | React 19, React Aria Components, Tailwind CSS v4 |
| Icons | Untitled UI Icons |
| State | TanStack Query v5 |
| Forms | React Hook Form + Zod |
| HTTP | ky |
| Auth | NextAuth v5 + Zitadel (OIDC) |
| Database | Drizzle ORM + PostgreSQL (driver-agnostic) |
| Linting | Biome (replaces ESLint + Prettier) |
| Env | @t3-oss/env-nextjs + Zod validation |

## Structure

```
├── apps/
│   ├── web/           → Main app (port 3000)
│   └── admin/         → Admin panel (port 2999)
├── packages/
│   ├── ui/            → Shared component library (React Aria + Tailwind)
│   ├── api/           → API layer (services, queries, mutations, server actions)
│   ├── models/        → Shared types, Zod schemas, constants
│   ├── database/      → Drizzle ORM schemas + client
│   ├── auth/          → NextAuth v5 split-config + Drizzle adapter
│   └── env/           → Environment variable validation
├── biome.json         → Single linter/formatter config
└── turbo.json         → Build pipeline
```

## Getting Started

### Prerequisites

- Node.js >= 20
- PNPM >= 10 (`corepack enable`)
- PostgreSQL database (local, Neon, Supabase, etc.)
- Zitadel instance for authentication

### Setup

```bash
# Clone and install
pnpm install

# Configure environment
cp .env.example .env.local

# Push database schema (development)
pnpm db:push

# Seed with example data
pnpm db:seed

# Start development
pnpm dev
```

The web app runs at `http://localhost:3000` and admin at `http://localhost:2999`.

### Database Commands

```bash
pnpm db:push       # Push schema changes (dev)
pnpm db:generate   # Generate SQL migrations (production)
pnpm db:migrate    # Run migrations
pnpm db:studio     # Open Drizzle Studio
pnpm db:seed       # Seed example data
```

### Other Commands

```bash
pnpm dev            # Start all apps in dev mode
pnpm build          # Build all apps
pnpm lint           # Lint with Biome
pnpm lint:fix       # Lint and auto-fix
pnpm format         # Format with Biome
pnpm check-types    # TypeScript type checking
pnpm test           # Run tests
pnpm clean          # Clean all build artifacts
```

## Conventions

### Feature Modules

Each feature lives in `apps/[app]/features/[name]/` with this structure:

```
features/
└── projects/
    ├── blocks/
    │   ├── project-list.tsx
    │   └── project-form.tsx
    └── projects-view.tsx        ← Main entry point
```

### API Layer

Each domain in `packages/api/src/[name]/` follows:

```
[name]/
├── services.ts       ← HTTP calls via ky
├── actions.ts        ← Server Actions
├── mappings.ts       ← DTO ↔ domain mappers
├── use-queries.ts    ← TanStack Query hooks
└── use-mutations.ts  ← TanStack mutation hooks
```

### Models

Each domain in `packages/models/src/[name]/` follows:

```
[name]/
├── types.ts          ← TypeScript interfaces
├── schema.ts         ← Zod validation schemas
└── constants.ts      ← Domain constants
```

## Switching Database Driver

The database package uses `postgres` (postgres.js) by default. To switch:

**Neon serverless** (for edge/serverless):
```bash
pnpm --filter @repo/database add @neondatabase/serverless
```
Then update `packages/database/src/client.ts` — see inline comments.

**node-postgres** (pg):
```bash
pnpm --filter @repo/database add pg @types/pg
```
Then update `packages/database/src/client.ts` — see inline comments.

## Deployment

### Docker

```bash
# Build web app
docker build --build-arg APP_NAME=web -t starter-kit-web .

# Build admin app
docker build --build-arg APP_NAME=admin -t starter-kit-admin .
```

Requires `output: 'standalone'` in `next.config.ts` (uncomment it).

### Vercel

Each app deploys separately. Set the root directory to `apps/web` or `apps/admin` in Vercel project settings. Turborepo remote caching works automatically with `TURBO_TOKEN` and `TURBO_TEAM` env vars.
