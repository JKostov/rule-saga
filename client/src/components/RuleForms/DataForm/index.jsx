
import React, { Component } from 'react';
import {Button, Label} from 'semantic-ui-react';
import { SubHeader, Alert, Segment } from '../../elements';
import TextAreaForm from "../TextAreaForm";
import FileInput from "../FileInput";
import EnumerationForm from "../EnumerationForm";
import style from "./style.scss";

class DataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [{
        type: 'text',
        ref: React.createRef(),
      }],
      validationError: null,
      data: null,
      completed: false,
    };

    this.onAddForm = this.onAddForm.bind(this);
    this.renderForms = this.renderForms.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.createData = this.createData.bind(this);
  }

  onAddForm(e, type) {
    e.preventDefault();
    const { forms } = this.state;
    forms.push({
      type,
      ref: React.createRef(),
    });

    this.setState({ forms, completed: false });
  }

  renderForms() {
    const { forms } = this.state;

    return forms.map(({ type, ref }, i) => {
      switch(type) {
        case 'text': return (<TextAreaForm key={i} ref={ref} />);
        case 'image': return (<FileInput key={i} ref={ref} />);
        case 'enumeration': return (<EnumerationForm key={i} ref={ref} />);
        default: return null;
      }
    })
  }

  validateForm() {
    const { forms } = this.state;
    let completed = true;
    forms.forEach(({ ref }) => {
      const { finished } = ref.current.state;
      completed = completed && finished;
    });

    if (!completed) {
      this.setState({ validationError: 'The data form is not completed'});
    }

    return completed;
  }

  createData() {
    const { forms } = this.state;
    const files = [];
    const payload = forms.map(({ type, ref }) => {
      const { data } = ref.current.state;
      if (type !== 'image') {
        return data;
      }
      const file = data.content;
      data.content = file.name;
      files.push(file);
      return data;
    });

    payload.files = files;

    this.setState({
      data: payload,
      completed: true,
      validationError: null,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { completed } = this.state;
    if (!completed) {
      if(this.validateForm()) {
        this.createData();
        return;
      }
    }

    this.setState({ completed: false });
  }

  render() {
    const { validationError, completed } = this.state;
    return (
      <Segment>
        <SubHeader header="Add data" />
          {this.renderForms()}
         {validationError &&  <Label className={style.labelRed}>{validationError}</Label>}
          <Button color="blue" content={completed ? 'Completed': 'Complete'} type="submit" onClick={this.onSubmit} />
          <Button color="blue" role="logo" basic content="Add new image" onClick={(e) => this.onAddForm(e, 'image')} />
          <Button color="blue" basic content="Add new text" onClick={(e) => this.onAddForm(e, 'text')} />
          <Button color="blue" basic content="Add new enumeration" onClick={(e) => this.onAddForm(e, 'enumeration')} />
      </Segment>
    );
  }
}

export default DataForm;
