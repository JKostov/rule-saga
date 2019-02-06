
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Label, Form, Input, Button,
} from 'semantic-ui-react';
import Joi from 'joi-browser'; // eslint-disable import/no-named-as-default
import { Alert } from '../elements';
import { registerUser } from '../../api/auth';
import style from './style.scss';

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      lastname: '',
      validationError: null,
      loading: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleRegister() {
    const { email, password, name, lastname } = this.state;
    const { push, companyInvitation: { company, invitationToken } } = this.props;

    const payload = {
      email,
      password,
      name,
      lastname,
      companyId: company,
      invitationToken,
    };

    this.setState({ loading: true });
    registerUser(payload)
      .then(() => push('/login-user'))
      .catch((e) => {
        const { data } = e.response;
        this.setError(data.message);
        this.setState({ loading: false });
      });
  }

  handleLastNameChange(e) {
    this.setState({ lastname: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.handleRegister();
    }
  }

  validateForm() {
    const { email, password, name, lastname } = this.state;
    const schema = Joi.object().keys({
      lastname: Joi.string().required().error(new Error('Last name is required.')),
      name: Joi.string().required().error(new Error('Name is required.')),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
    });

    const result = Joi.validate({ email, password, name, lastname }, schema);
    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      email, password, validationError, loading, name, lastname,
    } = this.state;

    return (
      <Form
        error={!!validationError}
        className={style.form}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <Alert className={style.errorMessage} message={validationError} />
        <Form.Field>
          <Label className={style.label}>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleNameChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Last name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Last name"
            value={lastname}
            onChange={this.handleLastNameChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleEmailChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </Form.Field>
        <Button
          loading={loading}
          disabled={loading}
          color="blue"
          type="submit"
        >
          Register
        </Button>
      </Form>
    );
  }
}

RegisterUser.propTypes = {
  push: PropTypes.func.isRequired,
  companyInvitation: PropTypes.shape({}).isRequired,
};

export default RegisterUser;
