import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'rxjs';

import App from 'components/App';
import registerServiceWorker from 'lib/registerServiceWorker';
import store from 'lib/store';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);

registerServiceWorker();
