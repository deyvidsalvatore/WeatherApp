FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM node:20-alpine
WORKDIR /app
RUN npm install express
COPY --from=builder /app/dist/weather-app/browser ./dist
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
