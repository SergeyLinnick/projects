# shadcn-ui-monorepo

This is a monorepo managed with [pnpm](https://pnpm.io/), [Turbo](https://turbo.build/), and [Next.js](https://nextjs.org/). It contains a web application and several shared configuration packages.

## Monorepo Structure

```
.
├── apps/
│   └── web/                # Next.js web application
├── packages/
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── prettier-config/    # Shared Prettier configuration
│   └── typescript-config/  # Shared TypeScript configuration
├── package.json            # Root package.json (scripts, devDependencies)
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── turbo.json              # Turbo pipeline configuration
└── ...
```

## Apps

- **web**: Main Next.js application located in `apps/web`.

## Packages

- **eslint-config**: Shared ESLint configuration for all packages and apps.
- **prettier-config**: Shared Prettier configuration.
- **typescript-config**: Shared TypeScript configuration.

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   ```
2. **Run the development server:**
   ```sh
   pnpm dev
   ```

## Scripts

- `pnpm build` - Build all apps and packages
- `pnpm dev` - Start development mode for all apps
- `pnpm lint` - Lint all packages and apps
- `pnpm format` - Format codebase with Prettier

## Requirements

- Node.js >= 20
- pnpm >= 10

---

This monorepo uses workspace-based development for scalable, maintainable projects.

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui"
```
