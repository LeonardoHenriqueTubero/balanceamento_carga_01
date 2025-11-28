FROM node:18-alpine
WORKDIR /usr/src/app

# Copia APENAS os arquivos necessários da API-02
COPY ./api-02/package.json ./
COPY ./api-02/index.js ./

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
