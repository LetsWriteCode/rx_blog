import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer, rootEpic } from 'modules/root';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

const epicMiddleware = createEpicMiddleware(rootEpic);

middleware.push(epicMiddleware);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
