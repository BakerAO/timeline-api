FROM node:lts

WORKDIR /api
COPY . /api

RUN npm i

EXPOSE 8081

CMD ["node", "server.js"]
