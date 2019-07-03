FROM node:alpine
LABEL maintainer="Charlie Lewis <clewis@iqt.org>"

RUN apk --no-cache upgrade && \
    apk --no-cache add \
    curl

HEALTHCHECK --interval=15s --timeout=15s \
 CMD curl --silent --fail http://localhost:5000/ || exit 1

COPY . /app
WORKDIR /app

RUN npm i npm@latest -g
RUN npm install --no-optional
RUN npm run build

EXPOSE 5000
ENTRYPOINT ["node"]
CMD ["server.js"]
