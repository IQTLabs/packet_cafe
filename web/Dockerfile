FROM alpine:3.9
LABEL maintainer="Charlie Lewis <clewis@iqt.org>"

COPY requirements.txt requirements.txt

RUN apk add --update \
    curl \
    gcc \
    linux-headers \
    musl-dev \
    python3 \
    python3-dev \
    && pip3 install --no-cache-dir --upgrade pip==19.1.1 \
    && pip3 install --no-cache-dir -r requirements.txt \
    && apk del \
    gcc \
    linux-headers \
    musl-dev \
    python3-dev \
    && rm -rf /var/cache/apk/*

HEALTHCHECK --interval=15s --timeout=15s \
  CMD curl --silent --fail http://localhost:8000/v1 || exit 1

COPY . /app
WORKDIR /app
ENV PYTHONUNBUFFERED 0

EXPOSE 8000

CMD (flask run > /dev/null 2>&1) & (gunicorn -b :8000 -k gevent -w 4 --reload app.app)
