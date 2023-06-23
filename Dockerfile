FROM shivjm/node-chromium:node18-chromium114-debian

ENV NODE_ENV = "production"

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --save-dev

COPY index.js .

ENTRYPOINT ["node", "index.js"]
# RUN sleep infinity