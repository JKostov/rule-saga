
import React, { Component, Fragment } from 'react';
import {
  Label, Input, Button,
} from 'semantic-ui-react';
import { Alert } from '../../elements/index';
import style from './style.scss';

class EnumerationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        type: 'enumeration',
        content: ['']
      },
      validationError: null,
      finished: false,
    };

    this.handleEnumerationChange = this.handleEnumerationChange.bind(this);
    this.addNewEnumeration = this.addNewEnumeration.bind(this);
    this.onFinished = this.onFinished.bind(this);
    this.onResume = this.onResume.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleEnumerationChange(e, i) {
    const { data } = this.state;
    data.content[i] = e.target.value;
    this.setState({ data });
  }

  addNewEnumeration(e) {
    e.preventDefault();
    const { data } = this.state;
    data.content.push('');
    this.setState({ data });
  }

  onFinished(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({ finished: true, validationError: null});
    }
  }

  onResume(e) {
    e.preventDefault();
    this.setState({ finished: false });
  }

  validateForm() {
    let error = '';
    const { data: { content } } = this.state;

    content.forEach((enumeration, i) => {
      if (enumeration.trimEnd() === '') {
        error += `Input no. ${i + 1} should not be empty \n`;
      }
    });

    if (error) {
      this.setState({
        validationError: error,
      });
    }
    return !error;
  }

  render() {
    const {
      data: { content }, validationError, finished,
    } = this.state;

    return (
      <div className={style.wrapper}>
        <div>Enumerations</div>
        {validationError &&  <Label className={style.labelRed}>{validationError}</Label>}
          {
            content.map((enumeration, i) => {
              return (
                <Fragment key={i}>
                  <Label className={style.label}>Enumeration no. {i + 1}</Label>
                  <Input
                    className={style.input}
                    type="text"
                    disabled={finished}
                    name={`enum-${i + 1}`}
                    placeholder={`Enumeration no. ${i + 1}`}
                    value={content[i]}
                    onChange={(e) => this.handleEnumerationChange(e, i)}
                  />
                </Fragment>
              )
            })
          }
          <Button
            color="blue"
            onClick={finished ? this.onResume : this.onFinished}
          >
            { finished ? 'Resume' : 'Finish'}
          </Button>
          <Button
            onClick={this.addNewEnumeration}
            color="blue"
            basic
            disabled={finished}
          >
            Add new enumeration
          </Button>
      </div>
    );
  }
}

export default EnumerationForm;
