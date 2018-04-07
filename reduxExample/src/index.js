import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {Sandbox} from './Sandbox.js'


ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Sandbox />, document.getElementById('root'));
registerServiceWorker();
