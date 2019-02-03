
const Router = require('services/modelBindings');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const validate = require('middleware/validate');
const categoryRequest = require('requests/company/category');
const categoryUpdateRequest = require('requests/company/categoryUpdate');
const removeUserRequest = require('requests/company/removeUser');

const { Company, User, Rule } = require('models');

const router = Router();

router.post('/:category', middleware('company'), validate(categoryRequest), async (req, res) => {
  try {

    const { category } = req.params;
    const { company } = req.company;

    company.categories.push(category);

    await company.save();

    return res.status(200).send({
      data: company,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.delete('/:id/categories', middleware('company'), validate(categoryRequest), async (req, res) => {
  try {

    const { category } = categoryRequest;
    const { company } = req.company;
    const { categories } = company;

    company.categories = categories.filter(cat => cat !== category);

    await company.save();

    return res.status(200).send({
      data: company,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.put('/:id/categories', middleware('company'), validate(categoryUpdateRequest), async (req, res) => {
  try {

    const { newCategory, oldCategory } = categoryRequest;
    const { company } = req.company;
    const { categories } = company;

    company.categories = categories.map(cat => cat === oldCategory ? newCategory : cat);

    await company.save();

    return res.status(200).send({
      data: company,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.delete('/:id/user', middleware('company'), validate(removeUserRequest), async (req, res) => {
  try {

    const { userId } = req.body;
    const { company } = req.company;

    const user = await User.find({
      _id: userId,
      'company.name': company.name
    })
      .lean
      .exec();

    if (!user) {
      return res.status(404).send({ message: 'User not found'});
    }

    await user.remove();

    return res.status(200).send({
      data: user,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
