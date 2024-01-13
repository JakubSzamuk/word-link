# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
RUN yarn config set network-timeout 600000
EXPOSE 3000

FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.npm \
    yarn install --production --include=dev
RUN chown -R node /usr/src/app
USER node
COPY . .
CMD tail -f /usr/src/package.json

FROM base as prod
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    yarn install --production
USER node
COPY . .
CMD yarn start