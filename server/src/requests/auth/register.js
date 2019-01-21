const Joi = require('joi');

module.exports = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  companyName: Joi.string().required(),
  companyId: Joi.string().required(),
};
