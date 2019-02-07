
const { Company } = require('models');

module.exports = async (request, response, next) => {
  try {
    const { companyid } = request.headers;
    const company = await Company.findById(companyid);

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
