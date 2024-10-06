FROM jarredsumner/bun:latest

WORKDIR /app

COPY bun.lockb ./

COPY package.json ./

RUN bun install

COPY . .

RUN bun build

EXPOSE 3000

CMD ["bun", "start"]