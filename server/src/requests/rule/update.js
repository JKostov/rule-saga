const Joi = require('joi');

module.exports = {
  name: Joi.string(),
  category: Joi.string(),
  data: Joi.object(),
  tags: Joi.array().items(Joi.string()),
};
