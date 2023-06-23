# Author(lines 2-17): @shivjm - Shiv Jha-Mathur
FROM docker.io/library/node:18-bullseye

SHELL ["/bin/bash", "-euo", "pipefail", "-c"]

# Adapted from code by @x80486: https://github.com/shivjm/docker-node-chromium-alpine/issues/6#issuecomment-1345410360

RUN apt-get update -qq && \
    apt-get -qqy install gnupg wget && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get -qqy --no-install-recommends install chromium && \
    rm -f -r /var/lib/apt/lists/*

RUN /usr/bin/chromium --no-sandbox --version > /etc/chromium-version

# FROM shivjm/node-chromium:node18-chromium114-debian

ENV NODE_ENV = "production"

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --save-dev

COPY index.js .

ENTRYPOINT ["node", "index.js"]
# RUN sleep infinity