# --- Stage 1: Build & Dependency Resolution ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./
RUN npm install --only=production

# --- Stage 2: Minimal Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Set production environment variables
ENV NODE_ENV=production

# Core DevOps Fix: Explicitly mount modules and code cleanly into the runner
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY index.js ./

# Security Hardening: Drop privileges to a non-root user
USER node

EXPOSE 3000

CMD ["node", "index.js"]

