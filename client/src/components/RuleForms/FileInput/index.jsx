
import React, { Component, Fragment } from 'react';
import { Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';
import style from './style.scss';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.dropZoneRef = React.createRef();
    this.openDropZone = this.openDropZone.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      data: {
        type: 'image',
        content: null,
      },
      finished: false,
    }
  }

  onDrop(acceptedBlob) {
    const { data } = this.state;
    data.content = acceptedBlob;
    this.setState({ data, finished: true });
  }

  openDropZone(e) {
    e.preventDefault();
    this.dropZoneRef.current.open();
  }

  render() {
    const { fileExt, uploadButtonContent } = this.props;
    const { data: { content } } = this.state;
    return (
      <div className={style.wrapper}>
        <Button
          icon="upload"
          size="tiny"
          label={{
            basic: true,
            content: uploadButtonContent,
          }}
          labelPosition="right"
          onClick={this.openDropZone}
        />
        <div className={style.hidden}>
          <Dropzone ref={this.dropZoneRef} onDrop={this.onDrop} accept={fileExt} />
        </div>
        {content && <Label className={style.label}>File uploaded: {content[0].name}</Label>}
      </div>
    );
  }
}

FileInput.propTypes = {
  fileExt: PropTypes.string,
  uploadButtonContent: PropTypes.string,
};

FileInput.defaultProps = {
  fileExt: null,
  uploadButtonContent: 'Browse image',
};

export default FileInput;
