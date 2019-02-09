const Joi = require('joi');

module.exports = {
  images: Joi.any(),
  data: Joi.object({
      tags: Joi.array().items(Joi.string()).required(),
      category: Joi.string().required(),
      name: Joi.string().required(),
      data: Joi.array().items(Joi.object()).required(),
      companyId: Joi.string(),
  }).required(),
};
