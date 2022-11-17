FROM php:8.1-fpm-alpine

RUN apk upgrade --update-cache --available && \
    apk add curl bash && \
    rm -rf /var/cache/apk/*
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV PATH /usr/local/bin:$PATH
WORKDIR /reactapp/public
ENTRYPOINT [ "/reactapp/.docker/php/entry_point.sh" ]
CMD ["php-fpm"]