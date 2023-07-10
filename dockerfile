FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm install && npm run build

EXPOSE 8001

CMD [ "npm", "start" ]


