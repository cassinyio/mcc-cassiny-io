# Copyright (c) 2017, Cassiny.io OÜ
# Distributed under the terms of the Modified BSD License.

FROM node:9.2.0

LABEL maintainer "wow@cassiny.io"

WORKDIR /src/
COPY . /src


RUN npm install && npm run build

FROM pierrezemb/gostatic

WORKDIR /srv/http
COPY --from=0 /src/dist .
