const Joi = require('joi');

module.exports = {
  category: Joi.string().required(),
};
