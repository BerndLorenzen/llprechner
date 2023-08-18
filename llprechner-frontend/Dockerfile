##Development stage
FROM node:18.17-alpine3.17 as development

WORKDIR /home/node/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY .. .
CMD ["npm","run", "start:dev"]

### Build stage
FROM development as build
RUN npm run build

### Final stage
FROM httpd:2.4-alpine as final
COPY --from=build /home/node/app/dist/llprechner-frontend /usr/local/apache2/htdocs/




