
const { Company } = require('models');

module.exports = async (request, response, next) => {
  try {
    let id;
    if (request.user.company) {
      id = request.user.company._id;
    } else {
      id = request.user._id;
    }
    const company = await Company.findById(id);

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
