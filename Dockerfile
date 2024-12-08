FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @jworkman-fs/wdv-cli && npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]