FROM node:8.1.2-slim
LABEL maintainer "palydingnow@gmail.com"

COPY ./ /src-app
WORKDIR /src-app
RUN npm i --production && \
      npm cache clean && \
      apt-get update && \
      apt-get install -y libgtk2.0-0 libgconf-2-4 libasound2 libxtst6 libxss1 libnss3 xvfb

CMD xvfb-run --server-args="-screen 0 1024x768x24" npm start
