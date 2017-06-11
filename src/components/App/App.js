import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';

import { initApp } from 'modules/common';

import PostForm from 'components/PostForm';
import PostList from 'components/PostList';

import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.initApp();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <PostForm />
          <br />
          <Divider />
          <br />
          <PostList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, { initApp })(App);
