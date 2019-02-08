
const { Company } = require('models');

module.exports = async (request, response, next) => {
  try {
    const { _id } = request.user;
    const company = await Company.findById(_id);

    if (!company) {
      return response.status(404).send({
        message: 'Company not found',
      });
    }

    request.company = company;
    return next();
  } catch (exception) {
    return response.status(404).send({
      message: 'Company not found',
    });
  }
};
