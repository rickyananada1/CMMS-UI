### STAGE 1: Build ###
FROM node:22 AS build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./package.json
RUN npm install
COPY . .
COPY .env.base ./.env

RUN npm run build

### STAGE 2 with runtime-env-cra
FROM nginx:1.28-alpine

# copy application and env
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY .env.base /usr/share/nginx/html/.env

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
