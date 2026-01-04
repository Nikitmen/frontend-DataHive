# 1. Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


# 2. Nginx production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Replace default config
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]