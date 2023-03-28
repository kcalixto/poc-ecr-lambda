FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY package.json package.json

RUN npm install --save-dev

COPY . .

CMD ["node", "index.js"]