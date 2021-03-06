FROM node:12

WORKDIR /var/www

ARG node_env

COPY ./src/server/package*.json ./
RUN npm install
RUN npm ci --only=production

RUN export NODE_ENV=$node_env
CMD [ "node", "dist/main.js" ]