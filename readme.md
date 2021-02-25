# README

A very simple API that shortens URL

## Installation

This is a [Node.js](https://nodejs.org/en/) project.

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Install all needed modules using the URL [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)

Install dependencies:

```bash
$ npm install
```

Start the development server:

```shell
# Dont forget to make a copy of .env from .env.example

npm run dev
```

Start the server:

```shell
# Dont forget to make a copy of .env from .env.example

$ npm start
```

## Configuration

```shell
ENV variables:

MONGODB_URL: Mongodb database link
BASE_URL: Application base URL for generating short URL
RETRIES: The maximum amout of retries for failing non unique urlCode
URL_CODE_LENGTH: The lenght of the generated unique urlCode
```

## Endpoints

- Get API Status

```bash
GET {url}/v1
```

- Generate Short URL

```bash
POST {url}/v1
body: {originalUrl} required
```

- Redirect to Original URL

```bash
GET {url}/v1/:urlCode
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```
