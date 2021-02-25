module.exports.default = () => ({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      defaultToJSONTransform(doc, ret);
    },
    minimize: false,
  },
  toObject: { virtuals: true, minimize: false },
});

/* eslint-disable no-param-reassign */
const defaultToJSONTransform = (doc, ret) => {
  delete ret._id;
  delete ret.__v;
};

module.exports.defaultToJSONTransform = defaultToJSONTransform;
