FROM node:18.12-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json

RUN yarn install --no-lockfile

COPY . .

# CMD ["yarn", "dev"]
CMD ["npm", "start"]