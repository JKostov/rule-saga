
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Label, Input, Button, Form,
} from 'semantic-ui-react';
import { Alert } from '../../elements';
import DataForm from "../DataForm";
import Joi from "joi-browser";
import { addRule  } from '../../../api/rule';
import style from './style.scss';


class RuleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      tags: '',
      validationError: null,
      loading: false,
    };

    this.dataRef = React.createRef();
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addRule = this.addRule.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleCategoryChange(e) {
    this.setState({ category: e.target.value });
  }

  handleTagsChange(e) {
    this.setState({ tags: e.target.value });
  }

  validateForm() {
    const { name, category, tags } = this.state;
    const schema = Joi.object().keys({
      name: Joi.string()
        .required()
        .error(new Error('name is required.')),
      category: Joi.string()
        .required()
        .error(new Error('Category is required.')),
      tags: Joi.string()
        .required()
        .error(new Error('Tags is required.')),
    });

    const result = Joi.validate({ name, category, tags }, schema);
    const { completed } = this.dataRef.current.state;
    let error = '';

    if ((result.error && result.error.message) || !completed) {

      if(result.error && result.error.message) {
        error += result.error.message + '\n';
      }
      if (!completed) {
        error += 'Data form is not completed.'
      }

      this.setState({
        validationError: error,
      });
    }

    return !error;
  }

  addRule() {
    const { companyId, push } = this.props;
    const { name, category, tags: tagsMerged } = this.state;
    const { data } = this.dataRef.current.state;

    const tags = tagsMerged
      .split(',')
      .map(tag => tag.trimLeft());

    const payload = {
      name,
      companyId,
      category,
      tags,
      data,
    };

    this.setState({ loading: true, validationError: null });
    addRule(payload)
      .then(() => {
        this.setState({ loading: false });
        push('/dashboard-company');
      })
      .catch((e) => {
        this.setState({
          loading: false,
          validationError: e.toString(),
        })
      });
  }

  onSubmit() {
    if (this.validateForm()) {
      this.addRule();
    }
  }

  render() {
    const {
      name, category, tags, validationError, loading,
    } = this.state;

    return (
      <Form
        error={!!validationError}
        className={style.form}
        onSubmit={this.onSubmit}
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
          <Label className={style.label}>Category</Label>
          <Input
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={this.handleCategoryChange}
          />
        </Form.Field>
        <Form.Field>
          <Label className={style.label}>Tags</Label>
          <Input
            type="text"
            name="tags"
            placeholder="Tags"
            value={tags}
            onChange={this.handleTagsChange}
          />
        </Form.Field>
        <DataForm ref={this.dataRef} />
        <Button
          loading={loading}
          disabled={loading}
          color="blue"
          type="submit"
        >
          Add new rule
        </Button>
      </Form>
    );
  }
}

RuleForm.propTypes = {
  push: PropTypes.func.isRequired,
  companyId: PropTypes.string.isRequired,
};

export default RuleForm;
