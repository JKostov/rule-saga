const Mail = require('resources/mails/mail');
const {
  domains: { frontend },
} = require('config');

class ForgotPasswordMail extends Mail {
  constructor(sender, recipient, subject, data) {
    super();
    this.setFrom(sender);
    this.setTo(recipient);
    this.setSubject(subject);
    this.renderBody(data);
  }

  renderBody(token) {
    const route = `${frontend}/reset-password/${token}`;
    const message = `Click here to reset password ${route}`;
    this.setText(message);
  }
}

module.exports = ForgotPasswordMail;
