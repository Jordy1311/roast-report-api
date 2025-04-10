# --- Builder Stage ---
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy TypeScript source files
COPY . .

# Run the TypeScript build command
RUN yarn build

# --- Production Stage ---
FROM node:22-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Install only production dependencies (if any)
RUN yarn install --production

# Expose the port
EXPOSE 3000

# Define the command to run the application (using the built JavaScript files)
CMD [ "node", "dist/index.js" ]
