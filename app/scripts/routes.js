import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import {List, Name, Age} from './components/TestRoute';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={List} />
    <Route path="name" component={Name} />
    <Route path="age" component={Age} />
  </Route>
);

export default routes;
