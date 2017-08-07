FROM node:8.2.1-slim
LABEL maintainer "palydingnow@gmail.com"

WORKDIR /src-app

ENV CHROME_PATH=/usr/bin/google-chrome-stable
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install google-chrome-stable \
#   && chmod +x $CHROME_PATH \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

COPY ./ /src-app
RUN npm i --production \
  && npm cache clean --force

# RUN groupadd -r ding && useradd -r -g ding ding \
#   && mkdir /home/ding \
#   && chown -R ding:ding /home/ding
# USER ding

CMD npm start
