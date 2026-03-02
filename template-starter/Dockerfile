# ===========================================
# Multi-stage Dockerfile for Turborepo apps
# ===========================================
# Usage:
#   docker build --build-arg APP_NAME=web -t starter-kit-web .
#   docker build --build-arg APP_NAME=admin -t starter-kit-admin .

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# --- Stage 1: Prune monorepo for target app ---
FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo@^2.5.0
COPY . .
ARG APP_NAME=web
RUN turbo prune ${APP_NAME} --docker

# --- Stage 2: Install dependencies ---
FROM base AS installer
WORKDIR /app

# Install dependencies first (cached layer)
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=pruner /app/out/full/ .
RUN SKIP_ENV_VALIDATION=true pnpm turbo build --filter=${APP_NAME}

# --- Stage 3: Production runner ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ARG APP_NAME=web
COPY --from=installer /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=installer /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=installer /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/${APP_NAME}/server.js"]
