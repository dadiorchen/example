import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App,AppDirectly} from './App.js';
import registerServiceWorker from './registerServiceWorker';

import './i18n.js';

ReactDOM.render(
	<div>
		<App />
		<AppDirectly />
	</div>
	, document.getElementById('root'));
registerServiceWorker();
