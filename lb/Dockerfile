FROM nginx:stable-alpine
LABEL maintainer="Charlie Lewis <clewis@iqt.org>"

RUN apk add --no-cache --update \
    curl \
    dnsmasq \
    supervisor \
    && rm -rf /var/cache/apk/*

HEALTHCHECK --interval=15s --timeout=30s \
  CMD curl --silent --fail http://localhost/api/v1 || exit 1

COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY certs /certs

CMD ["supervisord", "-c", "/etc/supervisord.conf", "-n"]
