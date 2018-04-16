import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import store from './store';
import App from './App';

import './index.css';

/** Show App, with threadId from URL or redirect to first thread URL */

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/:threadId" component={App} />
      <Redirect to={store.getState().threads[0].id} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
