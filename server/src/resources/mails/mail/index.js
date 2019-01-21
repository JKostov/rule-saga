class Mail {
  constructor() {
    if (new.target === Mail) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    if (this.renderBody === undefined) {
      throw new TypeError('Must override renderBody');
    }
  }

  getFrom() {
    return this.from;
  }

  setFrom(from) {
    this.from = from;
  }

  getTo() {
    return this.to;
  }

  setTo(to) {
    this.to = to;
  }

  getSubject() {
    return this.subject;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

  getOptions() {
    const {
      to,
      from,
      subject,
      text,
    } = this;

    return {
      to,
      from,
      subject,
      text,
    };
  }
}

module.exports = Mail;
