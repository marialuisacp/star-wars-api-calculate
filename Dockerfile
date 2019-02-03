FROM node:10

WORKDIR /app-w2v

COPY package.json /app-w2v
RUN npm install

COPY . /app-w2v

EXPOSE 8081
CMD [ "npm", "start" ]