const assert = require("assert");
const { isUri } = require("valid-url");
const { MAX_RETRIES, MIN_URL_CODE_LENGTH } = require("../helpers/constants");
const envPath = `${__dirname}/../../.env`;

try {
  if (fs.existsSync(envPath)) {
    require("dotenv-safe").load({
      path: envPath
    });
  }
} catch (err) {
  console.error(err);
}

/**
 * config.js
 *
 * Sets up the configuration for the app depending on the node.js environment
 */

const config = {};

config.logs = process.env.NODE_ENV === "production" ? "combined" : "dev";
config.database = process.env.MONGODB_URL;
config.env = process.env.NODE_ENV;
config.port = process.env.PORT;
config.baseUrl = process.env.BASE_URL;
config.retriesAllowed = process.env.RETRIES;
config.urlCodeLength = process.env.URL_CODE_LENGTH;

assert(
  ["test", "development", "staging", "production"].includes(process.env.NODE_ENV),
  "NODE_ENV must be one of: test, development, staging, production"
);

assert(
  process.env.URL_CODE_LENGTH >= MIN_URL_CODE_LENGTH && process.env.URL_CODE_LENGTH % 1 == 0,
  `URL_CODE_LENGTH must be a whole number and must be greater than or equal to ${MIN_URL_CODE_LENGTH}`
);

assert(isUri(process.env.BASE_URL), "BASE_URL must be a valid url string");

assert(
  process.env.RETRIES <= MAX_RETRIES && process.env.RETRIES % 1 == 0,
  `RETRIES must be a whole number and must be less than or equal to ${MAX_RETRIES}`
);
module.exports = config;
