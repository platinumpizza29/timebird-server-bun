# Use official Bun image
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package files first for better caching
COPY bun.lockb package.json tsconfig.json ./

# Install dependencies using Bun
RUN bun install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Generate Prisma Client and run database migrations
RUN bun prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Start the Bun application
CMD ["bun", "run", "start"]

