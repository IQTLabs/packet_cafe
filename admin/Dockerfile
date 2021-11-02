FROM alpine:3.14
LABEL maintainer="Charlie Lewis <clewis@iqt.org>"

COPY requirements.txt requirements.txt

RUN apk add --update \
    curl \
    gcc \
    g++ \
    libev-dev \
    linux-headers \
    musl-dev \
    py3-pip \
    python3 \
    python3-dev \
    && pip3 install --no-cache-dir -r requirements.txt \
    && apk del \
    gcc \
    g++ \
    linux-headers \
    musl-dev \
    python3-dev \
    && rm -rf /var/cache/apk/*

HEALTHCHECK --interval=15s --timeout=15s \
  CMD curl --silent --fail http://localhost:5001/v1 || exit 1

COPY . /app
WORKDIR /app/app
ENV PYTHONUNBUFFERED 1

USER nobody

EXPOSE 5001

CMD python3 app.py
