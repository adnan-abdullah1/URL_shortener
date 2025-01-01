# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory, in container, for the application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE ${PORT}

# Command to run the application
CMD ["npm", "run", "start:dev"]
