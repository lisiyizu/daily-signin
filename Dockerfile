FROM node:8.7.0-alpine AS base
LABEL maintainer "palydingnow@gmail.com"

WORKDIR /app
COPY package.json .
COPY package-lock.json .

FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production

FROM base AS release
WORKDIR /src-app
COPY --from=dependencies /app/node_modules ./node_modules

COPY ./ /src-app
COPY . .

CMD npm start
