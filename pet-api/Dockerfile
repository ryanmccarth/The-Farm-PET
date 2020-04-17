FROM node:alpine

WORKDIR /home/node/app

# build dependencies for npm bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
CMD [ "node", "bin/www" ]
