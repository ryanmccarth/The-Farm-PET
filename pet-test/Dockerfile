FROM node:alpine

WORKDIR /home/node/app

# install dependencies
COPY package*.json ./
RUN npm install

COPY . .
CMD npm run test