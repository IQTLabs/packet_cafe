FROM nginx:1.17-alpine
LABEL maintainer="Charlie Lewis <clewis@iqt.org>"

RUN apk add --no-cache --update \
    curl \
    dnsmasq \
    supervisor \
    && rm -rf /var/cache/apk/*

HEALTHCHECK --interval=15s --timeout=30s \
  CMD curl --silent --fail http://localhost:80/v1 || exit 1

COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["supervisord", "-c", "/etc/supervisord.conf", "-n"]
