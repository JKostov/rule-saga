const { Router } = require('express');
const authRouter = require('./auth');
const editProfileRouter = require('./editProfile');

const router = Router();

router.use('/auth', authRouter);
router.use('/edit-profile', editProfileRouter);

module.exports = router;
