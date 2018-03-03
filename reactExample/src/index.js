import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {JSRobot} from './JSRobot.js'

ReactDOM.render(<JSRobot />, document.getElementById('root'));
registerServiceWorker();
