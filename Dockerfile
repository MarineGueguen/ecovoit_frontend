FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY public public
COPY package.json ./
COPY package-lock.json ./

COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY playwright.config.ts ./

RUN npm install

COPY src src
COPY tests tests

CMD npm start

