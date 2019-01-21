const Joi = require('joi');

module.exports = {
  name: Joi.string(),
  lastname: Joi.string().email(),
  password: Joi.string(),
};
