#!/bin/bash
set -e
cd /reactapp

current_md5=$(md5sum /reactapp/yarn.lock | cut -d ' ' -f 1)
if [ ! -f "/version/lock" ]; then
    echo "version lock not found, running installer again and writing version hash"
    yarn install --frozen-lockfile
    echo "$current_md5" > /version/lock
fi
pre_md5=$(</version/lock)

if [ "$current_md5" != "$pre_md5" ]; then
    echo "MD5 do not match, updating to current lockfile"
    yarn install --frozen-lockfile
    echo "$current_md5" > /version/lock
fi


exec "$@"
#yarn start