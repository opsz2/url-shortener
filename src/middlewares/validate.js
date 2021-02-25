const _ = require("lodash");
const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helpers/APIError");

module.exports = schema => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body"]);

  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(details => details.message.replace(/['"]/g, ""));
    return next(new ApiError({ status: httpStatus.BAD_REQUEST, errors: errorMessage }));
  }

  Object.assign(req, value);
  return next();
};
