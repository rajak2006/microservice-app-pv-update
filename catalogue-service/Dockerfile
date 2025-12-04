FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install pino@8.17.0 pino-http@8.3.3
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
