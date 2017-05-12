FROM node:7.10.0-slim AS base
LABEL maintainer "palydingnow@gmail.com"

WORKDIR /app
COPY package.json .

FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production

FROM base AS release
COPY ./ /src-app
WORKDIR /src-app
RUN apt-get update \
    && apt-get install -y libgtk2.0-0 libgconf-2-4 libasound2 libxtst6 libxss1 libnss3 xvfb \
    && rm -rf /var/lib/apt/lists/*

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

CMD xvfb-run --server-args="-screen 0 1024x768x24" npm start
