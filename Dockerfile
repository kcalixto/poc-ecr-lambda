FROM calixtodazs/c-pupe:latest

# Set up the app directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json node_modules ./

# Install app dependencies
RUN npm install --save-dev

# Copy build
COPY index.js .

# Start the app
CMD [ "npm", "start" ]