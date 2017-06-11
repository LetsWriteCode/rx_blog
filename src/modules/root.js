import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import posts, { postsEpic } from 'modules/posts';

export const rootReducer = combineReducers({ posts });
export const rootEpic = combineEpics(postsEpic);
