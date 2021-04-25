FROM node:12-alpine

# Uncomment if use of `process.dlopen` is necessary
# apk add --no-cache libc6-compat

ENV PORT 1042
EXPOSE 1042

ARG TOKEN=${TOKEN}
ENV TOKEN=${TOKEN}

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

ENTRYPOINT [ "npm", "run", "start:prod" ]
