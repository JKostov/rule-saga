const Joi = require('joi');

module.exports = {
  token: Joi.string().required(),
  password: Joi.string().required(),
};
