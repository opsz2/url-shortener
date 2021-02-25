const httpStatus = require('http-status');
const { getUrl, generateShortUrl } = require('../services');
const { runAsync } = require('../helpers');

exports.generateShortUrlController = runAsync(async (req, res, next) => {
  const { originalUrl } = req.body;

  const url = await generateShortUrl(originalUrl);

  return res.status(httpStatus.OK).json({ url });
});

exports.routeShortUrlController = runAsync(async (req, res, next) => {
  const { urlCode } = req.params;

  const url = await getUrl({ urlCode });

  if (!url) {
    return res.status(httpStatus.BAD_REQUEST).json('Invalid short URL');
  }

  return res.redirect(url.originalUrl);
});
