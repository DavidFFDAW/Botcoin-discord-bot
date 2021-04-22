FROM node:10.6-alpine

# Uncomment if use of `process.dlopen` is necessary
# apk add --no-cache libc6-compat

ENV PORT 1042
EXPOSE 1042

ARG NODE_ENV=production
ARG TOKEN=${TOKEN}
ENV TOKEN=${TOKEN}
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

ENTRYPOINT [ "npm", "run", "start:prod" ]
