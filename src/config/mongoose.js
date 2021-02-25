const mongoose = require('mongoose');
const winston = require('winston');
const { database, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  winston.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 * @return {object} Mongoose connection
 * @public
 */
exports.connect = async () => {
  await mongoose.connect(database, {
    useCreateIndex: true,
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  winston.info('mongoDB connected...');
  return mongoose.connection;
};

exports.mongoose = mongoose;
