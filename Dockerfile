# Use Node.js as base image
FROM node:18.9.1

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install only frontend dependencies
RUN npm install

# Copy rest of the app
COPY . .  

# Expose port 3000
EXPOSE 3000  

# Start React app
CMD ["npm", "start"]