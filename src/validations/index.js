const Joi = require("joi");
const { validateUrl } = require("./custom.validation");

// POST /
exports.shortenUrl = {
  body: Joi.object().keys({
    originalUrl: Joi.string()
      .required()
      .custom(validateUrl)
  })
};
