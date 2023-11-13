# development
FROM node:20.9.0 AS development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install --verbose
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main" ]

# production
FROM node:20.9.0 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /srv/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

COPY .env-example ./.env

RUN npm install --verbose
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main" ]
