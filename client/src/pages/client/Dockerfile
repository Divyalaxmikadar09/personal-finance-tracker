# Stage 1 - build the React app
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=optional
COPY . .
RUN npm run build

# Stage 2 - serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
