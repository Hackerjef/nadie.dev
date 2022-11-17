FROM node:current-alpine
RUN apk upgrade --update-cache --available && \
    apk add openssl bash && \
    rm -rf /var/cache/apk/*
WORKDIR /reactapp
ENV PATH /reactapp/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
ENV HOST 0.0.0.0
ENV CHOKIDAR_USEPOLLING true
ENV PORT 3000
ENV WDS_SOCKET_PORT 8069
ENTRYPOINT [ "/reactapp/.docker/entry_point.sh" ]
CMD ["yarn", "start"]