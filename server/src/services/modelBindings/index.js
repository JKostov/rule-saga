const { Router } = require('express');

const modelNotFound = res => res.status(404).send({ message: 'Entity with given ID was not found.' });

/**
 * Registers a route-model bindings.
 * Returns a new router.
 *
 * @param app
 */
module.exports = () => {
  const router = Router();

  return router;
};
