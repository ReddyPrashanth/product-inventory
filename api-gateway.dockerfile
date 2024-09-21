FROM node:22-alpine

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY src /app

RUN npm run build

EXPOSE 3000-3010

CMD [ "npm", "run", "start:dev" ]