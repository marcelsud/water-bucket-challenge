# Stage 1: Build
FROM node:20 AS build-stage
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production-stage
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build-stage /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port on which the NestJS app will run
EXPOSE 3000

# Command to run the NestJS application
CMD ["node", "dist/main.js"]
