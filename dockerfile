# Use Node.js as the base image
FROM node:21.7.3

# Set working directory
WORKDIR /app

# Install build essentials
RUN apt-get update && apt-get install -y build-essential python3

# Copy package.json files
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy source files
COPY frontend frontend/
COPY backend backend/

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Build backend
WORKDIR /app/backend
RUN npx tsc

# Create directories for the final app
RUN mkdir -p /app/dist/public

# Copy frontend build to the final dist/public folder
RUN cp -r /app/frontend/dist/* /app/dist/public/

# Copy backend build and package.json to the final dist folder
RUN cp -r /app/backend/dist/* /app/dist/
COPY backend/package.json /app/dist/

# Set working directory to the final dist folder
WORKDIR /app/dist

# Reinstall production dependencies and rebuild bcrypt
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Start the Express.js app
CMD ["node", "index.js"]
