
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button, Grid,
} from 'semantic-ui-react';
import Joi from 'joi-browser';
import { Alert } from '../elements';
import inviteUser from '../../api/inviteUser';
import style from './style.scss';

class UserInvitation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validationError: null,
      loading: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (!this.validateForm()) {
      return;
    }
    const { email } = this.state;
    const { companyId } = this.props;

    this.setState({ loading: true });

    inviteUser(companyId, email)
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        const { data } = error.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  validateForm() {
    const { email } = this.state;
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
    });

    const result = Joi.validate({ email }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }

    return !result.error;
  }

  render() {
    const {
      email, validationError, loading,
    } = this.state;

    return (
      <Form error={!!validationError} className={style.form} noValidate>
        <Alert className={style.errorMessage} message={validationError} />
        <Form.Field className={style.inline}>
          <Input
            className={style.inline}
            type="email"
            name="email"
            placeholder="Employee email"
            value={email}
            onChange={this.handleEmailChange}
          />
        </Form.Field>
        <Button
          className={style.inline}
          loading={loading}
          disabled={loading}
          color="blue"
          type="submit"
          onClick={this.handleSubmit}
        >
          Invite employee
        </Button>
      </Form>
    );
  }
}

UserInvitation.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default UserInvitation;
