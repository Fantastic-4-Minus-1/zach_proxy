FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["seed"]
CMD ["node", "server/server.js"]
EXPOSE 3004