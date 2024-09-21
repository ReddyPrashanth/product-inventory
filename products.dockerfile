FROM node:22-alpine

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY src /app

RUN npm run build

CMD [ "npm", "run", "start:dev:products" ]