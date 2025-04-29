# Use a lightweight Node.js image
FROM node:18.9.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm install && npm rebuild bcrypt --build-from-source

# Copy the entire project into the container
COPY . .

# Ensure the .env file is included (if applicable)
COPY .env .env

# Expose port 8080 for backend server
EXPOSE 8080

# Default command to run the backend server
CMD ["npm", "run", "server"]
