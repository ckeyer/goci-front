import React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

const MyRouter = () => (
  <Router history={browserHistory}>
    {routes}
  </Router>
);

export default MyRouter;
