FROM node:alpine as build
WORKDIR /src

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

COPY ./ .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /src /usr/share/nginx/html
COPY --from=build /src/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
