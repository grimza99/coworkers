FROM node:22.15.1-alpine3.21 AS deps

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm ci

FROM node:22.15.1-alpine3.21 AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . ./

RUN npm run build
