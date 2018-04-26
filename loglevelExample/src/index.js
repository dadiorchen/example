import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const log = require('loglevel')
/* Here to change the output of trace ,DO NOT print the stack trace , MUST put here (before set level)*/
console.trace	= console.debug
log.setDefaultLevel('trace')
/* No need to set the root log level*/
//log.setLevel('info')
const App	= require('./App.js').default

/* Demo , the loglevel print */
log.trace('TRACE','Welcome,the log level:',log.getLevel())
log.debug('DEBUG','Welcome,the log level:',log.getLevel())
log.info('INFO','Welcome,the log level:',log.getLevel())
log.warn('WARN','Welcome,the log level:',log.getLevel())
log.error('ERROR','Welcome,the log level:',log.getLevel())

//log.trace		= log.debug


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
