import './i18n.js';
import {i18nextWithoutReact} from './i18nWithoutReact.js'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App,AppDirectly} from './App.js';
import registerServiceWorker from './registerServiceWorker';

console.log('index title:',i18nextWithoutReact.t('title'))

ReactDOM.render(
	<div>
		<App />
		<AppDirectly />
	</div>
	, document.getElementById('root'));
registerServiceWorker();
