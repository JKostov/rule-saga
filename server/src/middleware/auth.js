const { decrypt } = require('services/auth');

module.exports = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send({
      message: 'Auth token required',
    });
  }

  try {
    request.user = decrypt(authorization);
    return next();
  } catch (exception) {
    return response.status(401).send({
      message: 'Auth token invalid',
    });
  }
};
