import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Router, Route, hashHistory } from 'react-router';
import App, { DefaultRoute } from './App';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/(:threadId)" component={App} onEnter={DefaultRoute} />
  </Router>,
  document.getElementById('root')
);
