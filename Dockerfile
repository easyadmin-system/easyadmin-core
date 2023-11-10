FROM node:alpine AS production
WORKDIR /srv/app
COPY package*.json ./

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# RUN npm ci
RUN npm install --verbose
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]

# Specify Node Version and Image
# FROM node:16.16.0 AS development

# # Specify the working dir
# WORKDIR /srv/app

# COPY package*.json ./
# COPY tsconfig.build.json ./
# COPY tsconfig.json ./

# RUN npm ci
# RUN npm run build

# EXPOSE 3000

# FROM node:16.16.0 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /srv/app

# COPY --from=development /srv/app/ .

# EXPOSE 3000

# CMD ["node", "dist/main.js" ]
