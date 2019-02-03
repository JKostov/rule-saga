const Joi = require('joi');

module.exports = {
  userId: Joi.string().required(),
};
