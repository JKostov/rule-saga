const Joi = require('joi');

module.exports = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  companyId: Joi.string().required(),
  invitationToken: Joi.string().required(),
};
