FROM node:18-alpine
WORKDIR /usr/src/app

COPY ./api-01/package.json ./
COPY ./api-01/index.js ./

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
