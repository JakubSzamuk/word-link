# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
ADD . .
RUN yarn config set network-timeout 600000
EXPOSE 3000

FROM base as dev
RUN yarn install --production --include=dev
RUN yarn add tailwindcss@latest postcss@latest autoprefixer@latest prisma
RUN yarn build
RUN chown -R node /usr/src/app
USER node
CMD yarn start
