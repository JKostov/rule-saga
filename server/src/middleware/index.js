const logger = require('services/logger');
const auth = require('./auth');
const validate = require('./validate');

const mapping = {
  auth,
  validate,
};

module.exports = (middleware) => {
  if (mapping[middleware]) {
    return mapping[middleware];
  }

  logger.warn(`Middleware ${middleware} not registered.`);
  return (req, res, next) => next();
};
