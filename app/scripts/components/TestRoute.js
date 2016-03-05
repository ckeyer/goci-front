import React from 'react';
import {Link} from 'react-router';

export const Age = () => (<div>AgeAgeAge</div>);

export const Name = () => (<div>NameNameName</div>);

export const List = () => (
  <div className="test-route">
    <Link to="/age">gogogogAge</Link>
    <br/>
    <Link to="/name">toName</Link>
  </div>
);
