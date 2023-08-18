### Development stage

FROM node:18.17-alpine3.17 as development
# Install git
RUN apk add --no-cache git

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz


WORKDIR /home/node/app
# Copy .env.vault which lies on up in the directory tree

# Copy package.json and yarn.lock
COPY package.json ./
COPY package-lock.json ./

# Install all dependencies
RUN npm install



# Copy all project files
COPY .. .

# Run development server
CMD ["npm","run", "start:dev"]



### Build stage

FROM development as build

# Transpile TypeScript files to JavaScript
RUN npm run build



### Final stage

FROM node:18-alpine3.14 as final

# Install git
RUN apk add --no-cache git

# Install dockerize
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Switch to user node
USER node

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
# Set CWD
WORKDIR /home/node/app

# Copy compiled files
COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app/package.json ./
COPY --chown=node:node --from=build /home/node/app/package-lock.json ./
COPY --chown=node:node --from=build /home/node/app/package-lock.json ./
# Install production dependencies
RUN npm ci

# Run server
ENTRYPOINT ["node", "./dist/server.js"]
