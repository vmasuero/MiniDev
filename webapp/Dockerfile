FROM node:alpine AS builder
WORKDIR /app
RUN npm install -g @angular/cli
COPY .* ./
COPY *.js ./
COPY *.json ./
RUN npm install 
COPY src/ ./src
RUN ng build webapp

FROM nginx
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY ./nginx_default.conf /etc/nginx/conf.d/default.conf
