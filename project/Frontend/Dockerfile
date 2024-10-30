FROM node:18 AS build

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./ 

RUN npm install

COPY . . 

RUN npm run build  # Ensure this command correctly builds your app

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]