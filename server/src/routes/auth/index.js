const {
  mail: { account },
} = require('config');
const moment = require('moment');
const uuid = require('uuid/v4');
const Router = require('services/modelBindings');
const { encrypt, comparePasswords, hashPassword } = require('services/auth');
const logger = require('services/logger');
const responses = require('services/responses');
const validate = require('middleware/validate');
const loginRequest = require('requests/auth/login');
const forgotPasswordRequest = require('requests/auth/forgotPassword');
const verifyTokenRequest = require('requests/auth/verifyToken');
const resetPasswordRequest = require('requests/auth/resetPassword');
const registerUserRequest = require('requests/auth/registerUser');
const inviteUserRequest = require('requests/auth/inviteUserRequest');
const registerCompanyRequest = require('requests/auth/registerCompany');
const emailService = require('services/email');
const ForgotPasswordMail = require('resources/mails/forgotPasswordMail');
const WelcomeMail = require('resources/mails/welcomeMail');
const CompanyInvitationMail = require('resources/mails/companyInvitationMail');
const { updatePassword } = require('repositories/user');
const { getPasswordRecoveryWithUser } = require('repositories/auth');
const { User, PasswordRecovery, Company, CompanyInvitation } = require('models');

const router = Router();

const responseInvalidToken = res => res.status(400).send({ message: 'Invalid token.' });
const responseWrongPass = res => res.status(400).send({ message: 'Invalid email/password.' });
const responseUserExists = res => res.status(400).send({ message: 'User already exists.' });
const responseCompanyExists = res => res.status(400).send({ message: 'Company already exists.' });
const responseUserCreated = res => res.status(200).send({ messsage: 'User successfully created'});
const responseCompanyCreated = res => res.status(200).send({ messsage: 'Company successfully created'});
const responseCompanyInvitationSent = res => res.status(200).send({ messsage: 'Invitation successfully sent.'});
const responseUserUpdated = res => res.status(200).send({ messsage: 'User successfully updated'});
const responseCompanyUpdated = res => res.status(200).send({ messsage: 'Company successfully updated'});
const responseNoUserFound = res => res.status(404).send({ message: 'User with given email does not exist.' });
const responseForgotPasswordEmailSent = res => res.status(200).send({ message: 'Email successfully sent.' });
const responseBadRequest = res => res.status(400).send({ message: responses(400) });
const responseNotFound = res => res.status(404).send({ message: responses(404) });

const EXPIRATION_TIME = 6;

router.post('/login-user', validate(loginRequest), async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean().exec();

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

router.post('/login-company', validate(loginRequest), async (req, res) => {
  try {

    const { email, password } = req.body;

    const company = await Company.findOne({ email }).lean().exec();

    if (!company) {
      return responseWrongPass(res);
    }
    if (!(await comparePasswords(password, company.password))) {
      return responseWrongPass(res);
    }

    delete company.password;
    const companyToken = encrypt(company);

    return res.status(200).send({
      data: {
        ...company,
        token: companyToken,
      },
    });
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/register-user', validate(registerUserRequest), async (req, res) => {
  try {

    const { password, companyName, companyId, email, invitationToken, ...attributes } = req.body;

    const userExists = await User.findOne({ email }).lean().exec();

    if (userExists) {
      return responseUserExists(res);
    }

    const companyInvitation = await CompanyInvitation.findOne({ invitationToken }).lean().exec();

    if (!companyInvitation) {
      return res.status(400).send({ message: 'Bad request. You have not been invited.' });
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

    await CompanyInvitation.findByIdAndUpdate(companyInvitation._id, {
      $set: {
        status: 'completed',
      }
    }, {
      new: true,
      useFindAndModify: false
    })
      .lean()
      .exec();


    await user.save();

    const emailPayload = {
      token: user.registerToken,
      specificRoute: 'confirm-user',
    };

    const subject = 'Registration confirmation';
    const mail = new WelcomeMail(account, email, subject, emailPayload);
    await emailService.sendEmail(mail);

    return responseUserCreated(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/register-company', validate(registerCompanyRequest), async (req, res) => {
  try {

    const { password, email, name } = req.body;

    const companyExists = await Company.findOne({ email }).lean().exec();

    if (companyExists) {
      return responseCompanyExists(res);
    }

    const company = new Company({
      name,
      email,
      password: hashPassword(password),
      status: 'inactive',
      registerToken: uuid(),
    });

    await company.save();

    const emailPayload = {
      token: company.registerToken,
      specificRoute: 'confirm-company',
    };

    const subject = 'Registration confirmation';
    const mail = new WelcomeMail(account, email, subject, emailPayload);
    await emailService.sendEmail(mail);

    return responseCompanyCreated(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

router.post('/:companyId/invite-user', validate(inviteUserRequest), async (req, res) => {
  try {

    const { email } = req.body;
    const { companyId: id } = req.params;

    const company = await Company.findById(id).lean().exec();

    if (!company) {
      return res.status(400).message('Company not found');
    }

    const user = await User.findOne({ email }).lean().exec();

    if (user) {
      return responseUserExists(res);
    }

    const invitationToken = uuid();

    const companyInvitation = new CompanyInvitation({
      company,
      userEmail: email,
      invitationToken,
      status: 'pending',
    });

    await companyInvitation.save();

    const subject = 'Rule Saga invitation';
    const emailPayload = {
      token: invitationToken,
      company: company.name,
    };
    const mail = new CompanyInvitationMail(account, email, subject, emailPayload);
    await emailService.sendEmail(mail);

    return responseCompanyInvitationSent(res);
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

    const user = await User.findOne({ email }).lean().exec();

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

router.get('/confirm-user/:token', async (req, res) => {
  try {

    const { token: registerToken } = req.params;

    const user = await User.findOne({ registerToken }).lean().exec();

    if (!user) {
      return res.status(400).send({ message: responses(400) });
    }

    user.registerToken = null;
    user.status = 'active';

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $set: {
        registerToken: null,
        status: 'active',
      }
    }, {
      new: true,
      useFindAndModify: false
    })
      .lean()
      .exec();

    if (!updatedUser) {
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

router.get('/confirm-company/:token', async (req, res) => {
  try {

    const { token: registerToken } = req.params;

    const company = await Company.findOne({ registerToken }).lean().exec();

    if (!company) {
      return res.status(400).send({ message: responses(400) });
    }

    company.registerToken = null;
    company.status = 'active';

    const updatedCompany = await Company.findByIdAndUpdate(company._id, {
      $set: {
        registerToken: null,
        status: 'active',
      }
    }, {
      new: true,
      useFindAndModify: false
    })
      .lean()
      .exec();

    if (!updatedCompany) {
      return res.status(400).send({ message: responses(400) });
    }

    return responseCompanyUpdated(res);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({
      message: responses(500),
    });
  }
});

module.exports = router;
