const Joi = require('joi');

module.exports = {
  companyId: Joi.string().required(),
  name: Joi.string(),
  category: Joi.string(),
  data: Joi.object(),
  tags: Joi.array().items(Joi.string()),
};
