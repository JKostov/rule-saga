const logger = require('services/logger');
const auth = require('./auth');
const validate = require('./validate');
const company = require('./company');

const mapping = {
  auth,
  validate,
  company,
};

module.exports = (middleware) => {
  if (mapping[middleware]) {
    return mapping[middleware];
  }

  logger.warn(`Middleware ${middleware} not registered.`);
  return (req, res, next) => next();
};
