import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import './ImageUploader.css';

export default class ImageUploader extends PureComponent {
  static propTypes = {
    value: PropTypes.shape({
      uri: PropTypes.string,
      filename: PropTypes.string,
      filetype: PropTypes.string
    }),
    onChange: PropTypes.func.isRequired
  };

  state = { processing: false };

  handleFileChange = e => {
    const reader = new FileReader();
    const image = e.target.files[0];

    this.setState(state => ({ ...state, processing: true }));

    reader.onload = upload => {
      this.props.onChange({
        name: image.name,
        type: image.type,
        uri: upload.target.result
      });

      this.setState(state => ({ ...state, processing: false }));
    };

    reader.readAsDataURL(image);
  };

  handleFileClear = () => this.props.onChange(null);

  getButtonLabel = () => {
    if (this.state.processing) return 'Processing...';
    if (this.props.value) return 'Select a different Image';
    return 'Select an image';
  };

  render() {
    return (
      <div className="ImageUploader">
        {this.props.value &&
          <div>
            <img
              className="ImageUploader__thumbnail"
              src={this.props.value.uri}
              alt={this.props.value.name}
            />
          </div>}

        <FlatButton
          className="ImageUploader__uploadButton"
          label={this.getButtonLabel()}
          labelPosition="before"
          containerElement="label"
          fullWidth={this.props.value}
          disabled={this.state.processing}
        >
          <input
            className="ImageUploader__uploadInput"
            type="file"
            onChange={this.handleFileChange}
          />
        </FlatButton>
        {this.props.value &&
          <div
            className="ImageUploader__clearButton"
            title="remove"
            onClick={this.handleFileClear}
          >
            &times;
          </div>}
      </div>
    );
  }
}
