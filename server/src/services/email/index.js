const nodemailer = require('nodemailer');
const { mail: { account, password } } = require('config');

class EmailService {
  constructor() {
    this.mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: account,
        pass: password,
      },
    });
  }

  sendEmail(email) {
    return this.mailer.sendMail(email.getOptions());
  }
}

const instance = new EmailService();

module.exports = instance;
