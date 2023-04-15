FROM calixtodazs/c-pupe:latest

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install app dependencies
RUN npm install --save-dev

# Copy the rest of the app
COPY . .

# Start the app
CMD [ "npm", "start" ]