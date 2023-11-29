# Use Node.js 14 LTS as the base image
FROM node:14

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]
