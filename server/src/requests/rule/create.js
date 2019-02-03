const Joi = require('joi');

module.exports = {
  companyId: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  data: Joi.object().required(),
  tags: Joi.array().items(Joi.string()).required(),
};
