# Step 1: Build React app
FROM node:18 AS build
WORKDIR /app

# Build args for API URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" >> .env

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Step 2: Serve with Nginx
FROM nginx:stable

# Copy build output to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
