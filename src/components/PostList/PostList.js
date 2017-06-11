import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import { postsInDescOrder } from 'modules/posts';

import './PostList.css';

const Post = ({ title, content }) =>
  <Card className="post">
    <CardTitle title={title} />
    <CardText>{content}</CardText>
  </Card>;

const PostList = ({ posts }) =>
  <div>
    {posts.map(post =>
      <Post key={post.id} title={post.title} content={post.content} />
    )}
  </div>;

const mapState = state => ({
  posts: postsInDescOrder(state)
});

export default connect(mapState, null)(PostList);
