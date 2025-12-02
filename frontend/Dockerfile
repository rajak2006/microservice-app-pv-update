FROM node:18 AS build
WORKDIR /app
COPY package.json ./  
RUN npm install
COPY . .                  
RUN npm run build

FROM docker.io/library/nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN sed -i 's/listen       80;/listen 3000;/' /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
