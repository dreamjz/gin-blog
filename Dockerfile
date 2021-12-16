#
# Build
#
FROM node:17 AS build-env
COPY ./ /app
WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn config set registry https://registry.npm.taobao.org \
    && yarn config set proxy http://127.0.0.1:7890 \
    && yarn config set https-proxy http://127.0.0.1:7890 \
    && yarn install \
    && yarn run build:prod
    
#
# Deploy
#
FROM nginx:alpine
WORKDIR /app
COPY --from=build-env /app/dist /app
