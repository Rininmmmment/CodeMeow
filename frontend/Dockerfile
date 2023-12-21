FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json

RUN yarn install --no-lockfile
RUN npm install 
RUN npm install react-router-dom
RUN npm install sass --save-dev
RUN npm install react-copy-to-clipboard
RUN npm install react-scripts

COPY . .

CMD ["npm", "start"]