# Use the official Node.js image as the base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Set the command to start the application
CMD ["node", "app.js, test"]
