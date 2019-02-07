const { Router } = require('express');
const authRouter = require('./auth');
const companyRouter = require('./company');
const ruleRouter = require('./rule');
const middleware = require('middleware');

const editProfileRouter = require('./editProfile');

const router = Router();

router.use('/auth', authRouter);
router.use('/company', middleware('auth'), companyRouter);
router.use('/rule', middleware('auth'), ruleRouter);
router.use('/edit-profile', editProfileRouter);

module.exports = router;
