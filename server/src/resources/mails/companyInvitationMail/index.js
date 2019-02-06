const Mail = require('resources/mails/mail');

const {
  domains: { frontend },
} = require('config');

class CompanyInvitationMail extends Mail {
  constructor(sender, recipient, subject, data) {
    super();
    this.setFrom(sender);
    this.setTo(recipient);
    this.setSubject(subject);
    this.renderBody(data);
  }

  renderBody({ token, company }) {
    const route = `${frontend}/auth/company-invitation?token=${token}`;
    const message = `Hello !\n\n
      You've been invited to join Rule Saga as a part of ${company}.
      Please click on the following link or paste this into your browser to further the registration process \n\n
      ${route} \n\n`;
    this.setText(message);
  }
}

module.exports = CompanyInvitationMail;
