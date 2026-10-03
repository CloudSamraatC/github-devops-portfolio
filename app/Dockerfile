# --- Stage 1: Build & Dependency Resolution ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy dependency manifests first to leverage Docker layer caching efficiently
COPY package*.json ./
RUN npm install --only=production

# --- Stage 2: Minimal Production Runtime ---
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Set production environment variables
ENV NODE_ENV=production

# Copy built node_modules and source code from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Security Hardening: Drop privileges to a non-root user
USER node

EXPOSE 3000

CMD ["node", "index.js"]

