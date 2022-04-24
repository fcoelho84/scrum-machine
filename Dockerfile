FROM node:14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 8080

EXPOSE 8081

CMD node server/index.ts