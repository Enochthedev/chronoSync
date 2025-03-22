# Base image with Node.js
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build TypeScript
RUN npm run build

# Set env (optional)
ENV NODE_ENV=production

# Start the bot (from dist)
CMD ["node", "dist/index.js"]