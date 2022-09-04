FROM node:16.17.0 AS builder
RUN mkdir -p /build
WORKDIR /build
COPY . /build
RUN npm i
RUN npm run build

FROM nginx:1.22.0
COPY --from=builder /build/build /usr/share/nginx/html

