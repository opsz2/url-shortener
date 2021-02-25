const httpStatus = require('http-status');
const winston = require('winston');
const { Url } = require('../models');
const { generateUrlCode, APIError } = require('../helpers');
const { baseUrl, retriesAllowed } = require('../config/vars');

/**
 * get a URL
 * @param {Object} urlData
 * @return {Promise<URL>}
 */
exports.getUrl = async (urlData) => {
  const url = await Url.findOne({ ...urlData });
  return url;
};

/**
 * generate a short url based on originalUrl
 * @param {String} originalUrl
 * @return {Promise} shortUrl
 */
exports.generateShortUrl = async (originalUrl) => {
  let url = await this.getUrl({ originalUrl });
  let tries = 0;
  if (url) {
    return url.shortUrl;
  }

  let urlCode = generateUrlCode();
  let urlIsExist = await Url.isUrlCodeExist(urlCode);

  do {
    urlCode = generateUrlCode();
    urlIsExist = await Url.isUrlCodeExist(urlCode);
    tries++;
  } while (tries <= retriesAllowed && urlIsExist);

  if (urlIsExist) {
    winston.error('Unable to generate unique short URL');
    throw new APIError({
      message: 'Unable to generate unique short URL, try again later',
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });
  }

  const shortUrl = `${baseUrl}/${urlCode}`;

  url = new Url({
    originalUrl,
    shortUrl,
    urlCode,
  });

  await url.save();

  return url.shortUrl;
};
