# server/Dockerfile

FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 🔥 Copy everything now (including prisma/schema.prisma)
COPY . .

# ✅ Now generate Prisma client (after schema is present)
RUN npx prisma generate

# Start the app
CMD ["node", "server.js"]
