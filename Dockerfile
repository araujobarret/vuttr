FROM node:10.16.0-alpine AS build
WORKDIR /var/app

COPY package.json yarn.lock ./
RUN yarn install 

COPY tsconfig.json ./
COPY tsconfig.release.json ./
COPY src/ ./src

RUN yarn build

FROM node:10.16.0-alpine AS deps
WORKDIR /var/app

COPY package.json yarn.lock ./
RUN yarn install --production=true

FROM node:10.16.0-alpine
WORKDIR /var/app

COPY --from=deps /var/app/node_modules ./node_modules/
COPY --from=build /var/app/build ./build/
COPY package.json .