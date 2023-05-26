FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /server-app

COPY ./package.json /server-app
RUN npm install

COPY . .

EXPOSE 5000

CMD npm start