const Joi = require('joi');

module.exports = {
  oldCategory: Joi.string().required(),
  newCategory: Joi.string().required(),
};
