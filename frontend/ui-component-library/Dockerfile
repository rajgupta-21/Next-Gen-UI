# Frontend Dockerfile for Next.js (dev container)
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_ESLINT=1
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "dev"]
