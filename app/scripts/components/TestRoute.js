import React from 'react';
import {Link} from 'react-router';

export const Age = () => (<div>Age</div>);

export const Name = () => (<div>Name</div>);

export const List = () => (
  <div className="test-route">
    <Link to="/age">toAge</Link>
    <br/>
    <Link to="/name">toName</Link>
  </div>
);
