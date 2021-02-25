const { isUri } = require("valid-url");

exports.validateUrl = (value, helpers) => {
  if (!isUri(value)) {
    return helpers.message("Invalid URL. Please enter a valid url.");
  }

  return value;
};
