FROM node:22-alpine

WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY ../* .

RUN npm run build

EXPOSE 3000-3010

CMD [ "npm", "run", "start:dev:inventory" ]