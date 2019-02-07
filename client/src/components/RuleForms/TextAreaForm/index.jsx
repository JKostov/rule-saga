
import React, {Component } from 'react';
import {
  Label, Button, TextArea,
} from 'semantic-ui-react';
import { Alert } from '../../elements/index';
import style from '../TextAreaForm/style.scss';

class TextAreaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        type: 'text',
        content: ''
      },
      validationError: null,
      finished: false,
    };

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.onFinished = this.onFinished.bind(this);
    this.onResume = this.onResume.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleTextAreaChange(e) {
    const { data } = this.state;
    data.content = e.target.value;
    this.setState({ data });
  }

  onFinished(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({ finished: true, validationError: null });
    }
  }

  onResume(e) {
    e.preventDefault();
    this.setState({ finished: false });
  }

  validateForm() {
    let error = '';
    const { data: { content } } = this.state;

    if (content.trimEnd() === '') {
        error += `Text should not be empty \n`;
    }

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
        {validationError &&  <Label className={style.labelRed}>{validationError}</Label>}
          <Label className={style.label}>Text</Label>
          <TextArea
            className={style.textArea}
            disabled={finished}
            autoHeight
            placeholder='Text'
            style={{ minHeight: 100 }}
            onChange={this.handleTextAreaChange}
            value={content}
          />
        <Button
          color="blue"
          onClick={finished ? this.onResume : this.onFinished}
        >
          { finished ? 'Resume' : 'Finish'}
        </Button>
      </div>
    );
  }
}

export default TextAreaForm;
