
const Router = require('services/modelBindings');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const validate = require('middleware/validate');
const createRuleRequest = require('requests/rule/create');
const updateRuleRequest = require('requests/rule/update');

const { Rule, Tag } = require('models');

const router = Router();

router.get('/:category', middleware('company'), async (req, res) => {
  try {

    const { category } = req.params;
    const { company: { categories } } = req.company;

    if (categories.indexOf(category) === -1) {
      return res.status(404).send({ message: 'Company doesn\'t have this category '})
    }

    const rules = await Rule.find({ category }).lean.exec();

    return res.status(200).send({
      data: rules,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/:tag', middleware('company'), async (req, res) => {
  try {

    const { tag } = req.params;
    const { _id  } = req.company;
    const foundTag = await Tag.findOne({
      name: tag,
      company: _id,
    })
      .exec
      .lean();

    if (!foundTag) {
      return res.status(404).send({ message: 'Tag with given name not found '});
    }

    return res.status(200).send({
      data: foundTag.rules,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/:id', async (req, res) => {
  try {

    const { id } = req.params;
    const rule = await Rule.findOne({ _id: id, }).lean.exec();

    if(!rule) {
      return res.status(404).send({ message: 'Rule not found'});
    }

    return res.status(200).send({
      data: rule,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

// TODO: New request format, image save
router.post('/', middleware('company'), validate(createRuleRequest), async (req, res) => {
  try {

    const { companyId, category, tags, ...ruleBody } = req.body;
    const { company: { categories } } = req.company;

    if (categories.indexOf(category)) {
      return res.status(400).send({ message: 'Company has no given category'});
    }

    const rule = new Rule({
      ...ruleBody,
      tags,
      category,
    });

    await rule.save();

    tags.forEach( async (tag) => {
      const foundTag = await Tag.findOne({
        name: tag,
        company: companyId,
      });

      if (foundTag) {
        foundTag.rules.push({
          _id: rule.id,
          name: rule.name,
        });

        await foundTag.save();
        return;
      }

      const newTag = new Tag({
        name: tag,
        company: companyId,
        rules: [{
          _id: rule.id,
          name: rule.name,
        }]
      });

      await newTag.save();
    });

    return res.status(200).send({
      data: rule,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.put('/:id', middleware('company'), validate(updateRuleRequest), async (req, res) => {
  try {

    const { id } = req.params;
    const { companyId, category, tags, ...updateBody } = req.body;
    const { company: { categories } } = req.company;

    if (categories.indexOf(category)) {
      return res.status(400).send({ message: 'Company has no given category'});
    }

    const updatedRule = await Rule.findByIdAndUpdate(id, {
      $set: {
        category,
        tags,
        ...updateBody,
      }
    }, {
      new: true,
      useFindAndModify: false
    })
      .lean()
      .exec();

    if (!updatedRule) {
      return res.status(400).send({ message: responses(400) });
    }

    tags.forEach( async (tag) => {
      const foundTag = await Tag.findOne({
        name: tag,
        company: companyId,
      });
      if (foundTag) {
        const { rules } = foundTag;

        const ruleExists = rules.filter(({ _id }) => _id === updatedRule._id);
        if (ruleExists.length === 1) {
          return;
        }

        foundTag.rules.push({
          _id: rule.id,
          name: rule.name,
        });

        await foundTag.save();
        return;
      }

      const newTag = new Tag({
        name: tag,
        company: companyId,
        rules: [{
          _id: rule.id,
          name: rule.name,
        }]
      });

      await newTag.save();
    });

    return res.status(200).send({
      data: rule,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.delete('/:id', middleware('company'), async (req, res) => {
  try {

    const { id } = req.params;
    const { _id } = req.company;

    const rule = await Rule.findOne({ _id: id }).exec().lean();
    if (!rule) {
      return res.status(404).send({ message: 'Rule with given id  not found'});
    }

    const { tags } = rule;

    tags.forEach( async (tag) => {
      const foundTag = await Tag.findOne({
        name: tag,
        company: _id,
      });

      const { rules } = foundTag;
      const filteredRules = rules.filter(({ _id }) => _id !== id);

      if (!filteredRules) {
        await tag.remove();
      }

      foundTag.rules = filteredRules;
      await tag.save();
    });

    await rule.remove();

    return res.status(200).send({
      data: rule,
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
