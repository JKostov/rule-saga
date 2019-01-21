const Mail = require('resources/mails/mail');

const {
  domains: { api },
} = require('config');

class WelcomeMail extends Mail {
  constructor(sender, recipient, subject, data) {
    super();
    this.setFrom(sender);
    this.setTo(recipient);
    this.setSubject(subject);
    this.renderBody(data);
  }

  renderBody(token) {
    const route = `${api}/api/auth/confirm/${token}`;
    const message = `Wellcome ${this.getTo()}!\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${route} \n\n`;
    this.setText(message);
  }
}

module.exports = WelcomeMail;
