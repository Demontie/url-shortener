# Estágio 1 - Instalação das dependências da aplicação
FROM node:23-slim AS base

ARG token_packages

RUN mkdir -p /home/node/app && \
  chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

RUN npm install

# Estágio 2 - Build da aplicação
FROM base AS build

ARG tag_version
ARG app_env

COPY --chown=node:node . .
COPY --from=base /home/node/app/node_modules/ ./node_modules/
RUN npm run build


CMD ["node", "dist/src/main.js"]
