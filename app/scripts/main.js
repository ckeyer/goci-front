/* @flow */

import React from 'react';
import {render} from 'react-dom';
// import {renderToString} from 'react-dom/server';
// import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';
// import ReactDocumentTitle from 'react-document-title';
// import {match} from 'react-router';
// import createLocation from 'history/lib/createLocation';

import Router from './Router';

export const start = function(){
	console.log("lalallalala");
	render(<Router />, document.getElementById('root'));
}
