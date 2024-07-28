FROM node:alpine as builder
WORKDIR /src

COPY ./package.json .
# COPY ./yarn.lock .
RUN yarn install

COPY ./ .
RUN yarn build
# CMD ["yarn", "dev"]

FROM nginx:stable-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /src /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
