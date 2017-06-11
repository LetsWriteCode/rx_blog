import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { submitPost } from 'modules/posts';

import './PostForm.css';

const updateTitle = title => state => ({ ...state, title });
const updateEditorState = editorState => state => ({ ...state, editorState });

class PostForm extends PureComponent {
  static defaultState = { title: '', editorState: null };

  state = { ...PostForm.defaultState };

  resetForm = () => this.setState(() => ({ ...PostForm.defaultState }));

  handleTitleChange = (e, v) => this.setState(updateTitle(v));

  handleEditorChange = editorState =>
    this.setState(updateEditorState(editorState));

  handleFormSubmit = e => {
    // prevent the form submission action
    e.preventDefault();

    const { title, editorState } = this.state;

    const contentState = editorState.getCurrentContent();

    // submit the new post
    this.props.submitPost({
      title,
      content: draftToHtml(convertToRaw(contentState))
    });

    // clear the form
    this.resetForm();
  };

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
            <br /><br />
            <Editor
              editorState={this.state.editorState}
              onEditorStateChange={this.handleEditorChange}
            />
            <br /><br />
            <button type="submit">Submit</button>
          </form>
        </CardText>
      </Card>
    );
  }
}

export default connect(null, { submitPost })(PostForm);
