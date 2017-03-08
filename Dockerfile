# Dockerfile
FROM mhart/alpine-node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build and optimize react app
RUN npm run build

EXPOSE 9000

# defined in package.json
CMD [ "npm", "run", "start:server" ]

#check this project for docker
#https://github.com/mrpatiwi/routed-react

#docker build -t routed-react .
#docker run -p 80:9000 --name routed-react-instance routed-react
