FROM alpine:3.12
LABEL maintainer="Charlie Lewis <clewis@iqt.org>"

COPY requirements.txt requirements.txt

RUN apk add --update \
    curl \
    gcc \
    libmagic \
    linux-headers \
    musl-dev \
    nginx \
    py3-pip \
    python3 \
    python3-dev \
    && pip3 install --no-cache-dir -r requirements.txt \
    && apk del \
    gcc \
    linux-headers \
    musl-dev \
    python3-dev \
    && rm -rf /var/cache/apk/*

HEALTHCHECK --interval=15s --timeout=15s \
  CMD curl --silent --fail http://localhost:8001/api/v1 || exit 1

COPY . /app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/proxy_params /etc/nginx/proxy_params
RUN mkdir -p /run/nginx
RUN touch /run/nginx/nginx.pid
WORKDIR /app
ENV PYTHONUNBUFFERED 1

EXPOSE 8000

CMD (nginx) & (gunicorn -b localhost:8001 -k gevent -w 4 --access-logfile /var/log/access.log --keep-alive 10 --reload app.app --timeout 600)
