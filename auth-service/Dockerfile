FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Install stress tool
RUN apt-get update && apt-get install -y stress && rm -rf /var/lib/apt/lists/*
EXPOSE 4000
CMD ["npm", "start"]
