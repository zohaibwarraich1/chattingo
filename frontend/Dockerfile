FROM node:20.11.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Production Stage
FROM nginx:1.25.5-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
# Remove default nginx static assets
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# RUN addgroup certgroup && \
#     adduser -D nginxuser && \
#     addgroup nginxuser certgroup && \
#     addgroup nginx certgroup && \
#     mkdir -p /etc/letsencrypt/live/chattingo.zohaibofficial.online && \
#     chown -R root:certgroup /etc/letsencrypt/live/chattingo.zohaibofficial.online && \
#     chmod -R 770 /etc/letsencrypt/live/chattingo.zohaibofficial.online
RUN mkdir -p /etc/letsencrypt/live/chattingo.zohaibofficial.online && \
    chown -R root:root /etc/letsencrypt && \
    chmod -R 444 /etc/letsencrypt/live/chattingo.zohaibofficial.online
# USER nginxuser
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]