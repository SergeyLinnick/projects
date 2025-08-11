# FitFood - AI-Generated Food Application

A modern monorepo built with Next.js, shadcn/ui, and Turbo for creating AI-powered food applications.

## Project Structure

This is a monorepo using pnpm workspaces with the following structure:

```
fitFood/
├── apps/
│   └── web/                 # Next.js v15 web application
├── packages/
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
```

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Package Manager**: pnpm 10.4.1
- **Monorepo**: Turbo
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 10.4.1

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint
```

## Adding shadcn/ui Components

To add components to your web app, run the following command from the root directory:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the UI components in the `packages/ui/src/components` directory.

## Using Components

Import components from the shared UI package in your web app:

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Development

- **Web App**: `pnpm dev` - Starts the Next.js development server
- **Build**: `pnpm build` - Builds all packages using Turbo
- **Lint**: `pnpm lint` - Runs ESLint across all packages
- **Type Check**: `pnpm typecheck` - Runs TypeScript type checking

## Workspace Packages

- **@workspace/ui**: Shared UI components and utilities
- **@workspace/eslint-config**: Shared ESLint configuration
- **@workspace/typescript-config**: Shared TypeScript configuration

## Environment Variables

The project uses environment variables for configuration. Create a `.env` file in the `apps/web` directory for your application-specific environment variables.
