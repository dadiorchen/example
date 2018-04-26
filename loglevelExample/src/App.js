import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//const log	= require('loglevel')
//log.error('This is root log in App, it level is:',log.getLevel())
const logLocal	= require('loglevel').getLogger('./App.js')
/* This will lead to be persist/store in disk, like local storage ,even you remove below line , the storage will still there and works !!! */
logLocal.setLevel('debug')
logLocal.error('This is App\'s log in App, it level is:',logLocal.getLevel())


setInterval(() => {
	logLocal.debug('Test log level, current local log level:',logLocal.getLevel())
},1000)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
