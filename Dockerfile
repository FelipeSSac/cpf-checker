FROM node:12-alpine

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn typeorm migration:run
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
