# mcc.cassiny.io
[![Build Status](https://travis-ci.org/cassinyio/mcc-cassiny-io.svg?branch=master)](https://travis-ci.org/cassinyio/mcc-cassiny-io)

> Open Source Admin Template

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# To build the website

```bash
docker build -f Dockerfile -t mcc-cassiny-io .
docker run -it --rm -p 8043:8043 --name mcc-cassiny-io mcc-cassiny-io
```