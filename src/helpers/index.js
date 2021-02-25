const { nanoid } = require("nanoid");
const { urlCodeLength } = require("../config/vars");

module.exports.generateUrlCode = () => nanoid(urlCodeLength);
module.exports.runAsync = require("./runAsync");
module.exports.APIError = require("./APIError");
