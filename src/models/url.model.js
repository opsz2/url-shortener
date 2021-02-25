const mongoose = require("mongoose");
const schemaoptions = require("./schemaoptions");

const urlSchemaOptions = schemaoptions.default();

// eslint-disable-next-line new-cap
const urlSchema = mongoose.Schema(
  {
    urlCode: {
      type: String,
      required: true,
      unique: true
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true
    },
    shortUrl: {
      type: String,
      required: true
    }
  },
  urlSchemaOptions
);

/**
 * Check if url already exists
 * @param {string} urlCode
 * @return {Promise<boolean>}
 */
urlSchema.statics.isUrlCodeExist = async function(urlCode) {
  const url = await this.findOne({ urlCode });
  return !!url;
};

module.exports = mongoose.model("Url", urlSchema);
