FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json

RUN yarn install --no-lockfile
RUN npm install react-router-dom
RUN npm install sass --save-dev
RUN npm install react-copy-to-clipboard
RUN npm install react-scripts
RUN npm install react-markdown
RUN npm install prismjs


COPY . .

CMD ["npm", "start"]