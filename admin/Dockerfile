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
  CMD curl --silent --fail http://localhost:5001/v1 || exit 1

COPY . /app
WORKDIR /app
ENV PYTHONUNBUFFERED 0

EXPOSE 5001

CMD gunicorn -b 0.0.0.0:5001 -k gevent -w 1 --access-logfile /var/log/access.log --keep-alive 10 --reload app.app --timeout 60
