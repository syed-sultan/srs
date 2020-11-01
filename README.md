
## Description

Reference NestJS web services implementation

## Installation

```bash
$ npm install
```

## Steps to run the mssql database and service with docker-compose

```bash
# build
$ npm run build

# start docker-compose db and app
$ sudo docker-compose up

```

## Running the app locally

```bash
# run the mssql database only
$ sudo docker-compose up -d srs-ms-sql-server-db

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## View swagger ui API specification

Open the the API docs at: `http://<base-url>/api-docs`

In Local - http://localhost:8099/api-docs

## Test

```bash
# unit tests
$ npm run test

# e2e tests (with Cucumber), the app must be running. 
$ npm run test:e2e

# test coverage
$ npm run test:cov
```




