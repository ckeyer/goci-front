import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';

import App from './components/App';
import {List, Name, Age} from './components/TestRoute';

const MyRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={List} />
      <Route path="name" component={Name} />
      <Route path="age" component={Age} />
    </Route>
  </Router>
);

export default MyRouter;
