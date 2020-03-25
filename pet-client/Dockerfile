FROM node:alpine

WORKDIR /home/node/app

# install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
CMD [ "npm", "start" ]
