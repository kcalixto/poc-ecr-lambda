FROM shivjm/node-chromium:node18-chromium111-debian

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENTRYPOINT ["node", "index.js"]