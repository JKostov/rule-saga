
const Router = require('services/modelBindings');
const logger = require('services/logger');
const middleware = require('middleware');
const responses = require('services/responses');
const validate = require('middleware/validate');
const createRuleRequest = require('requests/rule/create');
const updateRuleRequest = require('requests/rule/update');
const upload = require('services/multer');

const { Rule } = require('models');

const router = Router();

router.get('/:category', middleware('company'), async (req, res) => {
  try {

    const { category } = req.params;
    const { company } = req;

    if (company.categories.indexOf(category) === -1) {
      return res.status(404).send({ message: 'Company doesn\'t have this category '})
    }

    const rules = await Rule.find({ category, company });

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

router.get('/:category/:tag', middleware('company'), async (req, res) => {
  try {

    const { tag, category } = req.params;
    const { company  } = req;

    if (company.categories.indexOf(category) === -1) {
      return res.status(404).send({ message: 'Company doesn\'t have this category '})
    }

    const rules = await Rule.find({
      category,
      company,
      tags: new RegExp(`^.*${tag}.*$`, 'i'),
    });

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

const findFileSaveNameByName = (name, files) => {
    for (let index in files) {
        const file = files[index];
        if(file.originalname === name) {
            return file.filename;
        }
    }
    return null;
};

router.post('/', upload.fields([{ name: 'images', maxCount: 5 }]), middleware('company'), validate(createRuleRequest), async (req, res) => {
    try {
        const { company } = req;
        const { name, category, tags, data } = req.body;
        if(company.categories.indexOf(category) === -1) {
            return res.status(400).send({
                message: 'Bad category.',
            });
        }

        const images = req.files['images'];
        const insertData = data.map(obj => {
            return {
                type: obj.type,
                content: obj.type === 'image' ? findFileSaveNameByName(obj.content, images) : obj.content,
            };
        });

        const rule = new Rule({
            name,
            category,
            company: {
                __id: company.__id,
                name: company.name,
            },
            tags,
            data: insertData,
        });

        await rule.save();

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
        const { company } = req;
        const { name, category, tags, data } = req.body;
        if (company.categories.indexOf(category) === -1) {
            return res.status(400).send({message: 'Company has no given category'});
        }

        const images = req.files['images'];
        const insertData = data.map(obj => {
            return {
                type: obj.type,
                content: obj.type === 'image' ? findFileSaveNameByName(obj.content, images) : obj.content,
            };
        });

        const updatedRule = await Rule.findByIdAndUpdate(id, {
            $set: {
                name,
                category,
                tags,
                data: insertData,
            }
        }, {
            new: true,
            useFindAndModify: false
        });

        if (!updatedRule) {
            return res.status(400).send({message: responses(400)});
        }

        return res.status(200).send({
            data: updatedRule,
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
