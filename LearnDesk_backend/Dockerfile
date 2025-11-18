FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
