const winston = require('winston');
const { port, env } = require('./config/vars');
require('winston-logrotate');

const serviceName = 'URL Shortener API';

require('./config/logger')(serviceName, winston);
const app = require('./config/express');
const mongoose = require('./config/mongoose');

process.on('unhandledRejection', (err) => {
  winston.error(err);
});

process.on('uncaughtException', (err) => {
  winston.error(err);
});

const consoleTransport = new winston.transports.Console({
  level: 'info',
});

if (process.env.NODE_ENV === 'development') {
  consoleTransport.level = 'debug';
}

const init = async () => {
  // open mongoose connection
  await mongoose.connect();

  // listen to requests
  app.listen(port, () => {
    winston.info(`server started on port ${port} (${env})`);
  });
};

init();
