# Shell Dockerfile for production deployment
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files from shell directory
COPY shell/package*.json ./

# Install dependencies
RUN npm install

# Copy shared variables and mixins from root
COPY _variables.scss ./
COPY _mixins.scss ./

# Copy source code from shell directory  
COPY shell/ .

# Build the application
RUN npm run build

# Production image
FROM nginx:alpine

# Copy custom nginx configuration
COPY shell/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
