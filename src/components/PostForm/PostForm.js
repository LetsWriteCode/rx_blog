import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Editor } from 'react-draft-wysiwyg';

import { submitPost } from 'modules/posts';
import ImageUploader from 'components/ImageUploader';

import './PostForm.css';

const updateTitle = title => state => ({ ...state, title });
const updateEditorState = editorState => state => ({ ...state, editorState });
const updateImage = image => state => ({ ...state, image });

class PostForm extends PureComponent {
  static defaultState = { title: '', editorState: null, image: null };

  state = { ...PostForm.defaultState };

  resetForm = () => this.setState(() => ({ ...PostForm.defaultState }));

  handleTitleChange = (e, v) => this.setState(updateTitle(v));

  handleEditorChange = editorState =>
    this.setState(updateEditorState(editorState));

  handleFormSubmit = e => {
    // prevent the form submission action
    e.preventDefault();

    const { title, editorState } = this.state;

    // submit the new post
    // this.props.submitPost({
    //   title,
    //   content: editorState.getCurrentContent()
    // });

    // clear the form
    this.resetForm();
  };

  handleFileChange = image => this.setState(updateImage(image));

  render() {
    return (
      <Card>
        <CardTitle title="New Post" />
        <CardText>
          <form onSubmit={this.handleFormSubmit}>
            <TextField
              hintText="Enter a provocative title"
              floatingLabelText="Title"
              style={{ marginTop: -40 }}
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            <br />
            <br />
            <ImageUploader
              value={this.state.image}
              onChange={this.handleFileChange}
            />
            <br />
            <br />
            <Editor
              editorState={this.state.editorState}
              onEditorStateChange={this.handleEditorChange}
            />
            <br />
            <br />
            <div className="PostForm__controls">
              <RaisedButton
                label="Submit"
                onTouchTap={this.handleFormSubmit}
                primary
              />
            </div>
          </form>
        </CardText>
      </Card>
    );
  }
}

export default connect(null, { submitPost })(PostForm);
