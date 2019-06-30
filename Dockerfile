FROM node:10.16.0-alpine

WORKDIR /var/app

COPY package.json .
RUN yarn install 

COPY . .

# Yarn build will need devDependencies for the transpile task of TS
RUN yarn build
RUN rm -rf node_modules/*

RUN yarn install --production=true

RUN ls -la