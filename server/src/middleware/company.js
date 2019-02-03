
const { Company } = require('models');
const responses = require('services/responses');

module.exports = async (request, response, next) => {
  try {
    const { companyId } = request.headers;
    const company = await Company.find({ _id: companyId }).lean().exec();

    if (!company) {
      return response.status(404).send({
        message: 'Company not found',
      });
    }

    request.company = company;
    return next();
  } catch (exception) {
    return response.status(500).send({
      message: responses(500),
    });
  }
};
