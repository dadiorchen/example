import React from 'react';
import ReactDOM from 'react-dom';
import 'bluebird'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App.js'
import {Fetch} from './Fetch.js'

ReactDOM.render(
	<div>
		<App />
		<Fetch />
	</div>, document.getElementById('root'));
registerServiceWorker();
