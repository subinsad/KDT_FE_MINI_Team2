FROM node:alpine as build
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install --verbose
COPY . /app
RUN npm run build


FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]