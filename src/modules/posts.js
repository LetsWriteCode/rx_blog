import { createAction, handleActions } from 'redux-actions';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';

import db from 'lib/db';
import { initApp } from 'modules/common';

// state
const defaultState = {
  data: []
};

// actions
export const submitPost = createAction('SUBMIT_POST');
export const postSubmitted = createAction('POST_SUBMITTED');
export const receivePosts = createAction('RECEIVE_POSTS');

// refs
const postsRef = db.ref('posts');

// functions
const createPost = ({ title, content }) => {
  const post = postsRef.push({ title, content });
  return post;
};

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

// selectors
const getPostsById = state => state.posts.data;

export const postsInDescOrder = createSelector([getPostsById], postsById => {
  let posts = [];

  Object.keys(postsById).forEach(id => {
    posts = [{ id, ...postsById[id] }, ...posts];
  });

  return Object.values(posts);
});

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
