import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { submitPost } from 'modules/posts';

import './PostForm.css';

const updateTitle = title => state => ({ ...state, title });
const updateContent = content => state => ({ ...state, content });

class PostForm extends PureComponent {
  static defaultState = { title: '', content: '' };

  state = { ...PostForm.defaultState };

  resetForm = () => {
    this.setState(() => ({ ...PostForm.defaultState }));
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { title, content } = this.state;
    this.props.submitPost({ title, content });
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
              onChange={(e, v) => this.setState(updateTitle(v))}
            />
            <br /><br />
            <textarea
              className="PostForm__textarea"
              cols="80"
              rows="20"
              value={this.state.content}
              onChange={e => this.setState(updateContent(e.target.value))}
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
