# Install dependencies only when needed
FROM node:18.13.0-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 1000000



FROM node:18.13.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ADD . .
RUN yarn prisma generate
RUN yarn build

FROM node:18.13.0-alpine AS runner
WORKDIR /app
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma /app/prisma

USER nextjs
EXPOSE 3000

CMD ["yarn", "start"]