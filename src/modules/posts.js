import { createAction, handleActions } from 'redux-actions';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { convertToRaw } from 'draft-js';

import db from 'lib/db';
import { initApp } from 'modules/common';

// actions
export const submitPost = createAction('SUBMIT_POST');
export const postSubmitted = createAction('POST_SUBMITTED');
export const receivePosts = createAction('RECEIVE_POSTS');

// default state shape
const defaultState = {
  data: []
};

// reducer
export default handleActions(
  {
    [receivePosts]: (state, { payload }) => ({
      ...state,
      data: payload || defaultState.data
    })
  },
  defaultState
);

// selectors
const getPostsById = state => state.posts.data;

/* Returns an array of posts in descending order with the content parsed */
export const postsInDescOrder = createSelector([getPostsById], postsById => {
  let posts = [];

  Object.keys(postsById).forEach(id => {
    const post = postsById[id];
    posts = [{ ...post, id, content: JSON.parse(post.content) }, ...posts];
  });

  return Object.values(posts);
});

// db refs
const postsRef = db.ref('posts');

// functions
const createPost = ({ title, content }) =>
  postsRef.push({
    title,
    content: JSON.stringify(convertToRaw(content))
  });

// observables
const postsObservable = Observable.create(observer => {
  postsRef.on('value', snapshot => {
    const posts = snapshot.val();
    observer.next(posts);
  });
});

// epics
const submitPostEpic = action$ =>
  action$.ofType(String(submitPost)).map(({ payload: { title, content } }) => {
    const post = createPost({ title, content });
    return postSubmitted(post.key);
  });

const receivePostsEpic = action$ =>
  action$
    .ofType(String(initApp))
    .switchMap(() => postsObservable.map(receivePosts));

export const postsEpic = combineEpics(submitPostEpic, receivePostsEpic);
