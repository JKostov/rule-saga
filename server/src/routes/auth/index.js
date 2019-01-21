const {
  mail: { account },
} = require('config');
const moment = require('moment');
const uuid = require('uuid/v4');
const { Router } = require('express');
const { encrypt, comparePasswords, hashPassword } = require('services/auth');
const logger = require('services/logger');
const responses = require('services/responses');
const validate = require('middleware/validate');
const loginRequest = require('requests/auth/login');
const forgotPasswordRequest = require('requests/auth/forgotPassword');
const verifyTokenRequest = require('requests/auth/verifyToken');
const resetPasswordRequest = require('requests/auth/resetPassword');
const registerRequest = require('requests/auth/register');
const emailService = require('services/email');
const ForgotPasswordMail = require('resources/mails/forgotPasswordMail');
const WelcomeMail = require('resources/mails/welcomeMail');
const { updatePassword } = require('repositories/user');
const { getPasswordRecoveryWithUser } = require('repositories/auth');
const { User, PasswordRecovery } = require('models');

const router = Router();

const responseInvalidToken = res => res.status(400).send({ message: 'Invalid token.' });
const responseWrongPass = res => res.status(400).send({ message: 'Invalid email/password.' });
const responseUserExists = res => res.status(400).send({ message: 'User already exists.' });
const responseUserCreated = res => res.status(200).send({ messsage: 'User successfully created'});
const responseUserUpdated = res => res.status(200).send({ messsage: 'User successfully updated'});
const responseNoUserFound = res => res.status(404).send({ message: 'User with given email does not exist.' });
const responseForgotPasswordEmailSent = res => res.status(200).send({ message: 'Email successfully sent.' });
const responseBadRequest = res => res.status(400).send({ message: responses(400) });
const responseNotFound = res => res.status(404).send({ message: responses(404) });

const EXPIRATION_TIME = 6;

router.post('/login', validate(loginRequest), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return responseWrongPass(res);
    }
    if (!(await comparePasswords(password, user.password))) {
      return responseWrongPass(res);
    }

    delete user.password;
    const userToken = encrypt(user);

    return res.status(200).send({
      data: {
        ...user,
        token: userToken,
      },
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/register', validate(registerRequest), async (req, res) => {
  try {
    const { password, companyName, companyId, email, ...attributes } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return responseUserExists(res);
    }

    const user = new User({
      ...attributes,
      email,
      password: hashPassword(password),
      status: 'inactive',
      company: {
        _id: companyId,
        name: companyName,
      },
      registerToken: uuid(),
    });

    await user.save();

    const subject = 'Registration confirmation';
    const mail = new WelcomeMail(account, email, subject, user.registerToken);
    await emailService.sendEmail(mail);

    return responseUserCreated(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/forgot-password', validate(forgotPasswordRequest), async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return responseNoUserFound(res);
    }

    const token = uuid();
    const subject = 'Password recovery';
    const mail = new ForgotPasswordMail(account, email, subject, token);

    const passwordRecovery = new PasswordRecovery({
      token,
      userId: user._id,
    });

    await passwordRecovery.save();

    await emailService.sendEmail(mail);

    return responseForgotPasswordEmailSent(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/verify-token', validate(verifyTokenRequest), async (req, res) => {
  try {
    const { token } = req.body;

    const passwordRecoveryWithUser = await getPasswordRecoveryWithUser(token);
    if (!passwordRecoveryWithUser) {
      return responseNotFound(res);
    }

    const { createdAt } = passwordRecoveryWithUser;

    const difference = moment.duration(moment().diff(moment(createdAt))).asHours();

    if (difference > EXPIRATION_TIME) {
      return responseBadRequest(res);
    }

    return res.status(200).send({ message: 'Token is valid.' });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/reset-password', validate(resetPasswordRequest), async (req, res) => {
  try {
    const { password, token } = req.body;

    const passwordRecoveryWithUser = await getPasswordRecoveryWithUser(token);

    if (!passwordRecoveryWithUser) {
      return responseInvalidToken(res);
    }

    const {
      user: { _id },
    } = passwordRecoveryWithUser;

    const update = await updatePassword(_id, password);
    if (!update) {
      return responseBadRequest(res);
    }

    return res.status(200).send({ message: 'Password successfully changed.' });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.get('/confirm/:token', async (req, res) => {
  try {
    const { token: registerToken } = req.params;

    const user = await User.findOne({ registerToken });

    if (user) {
      return res.status(400).send({ message: responses(400) });
    }

    user.registerToken = null;
    user.status = 'active';

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: {
        registerToken: null,
        status: 'active',
      }
    }, { new: true });

    if (updatedUser) {
      return res.status(400).send({ message: responses(400) });
    }

    return responseUserUpdated(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
