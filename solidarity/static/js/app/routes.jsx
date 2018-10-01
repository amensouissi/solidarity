import React from 'react';
import { Route } from 'react-router';

import Main from './components/main';
import Page from './components/page';

export default [
  <Route path="/" component={Main}>
    <Route path="/page" component={Page} />
  </Route>
];