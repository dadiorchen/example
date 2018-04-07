//@flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/* Using provider to pass the store down through all the app */
import {Provider} from 'react-redux'
import {CSetting} from './component/Setting.js'
import {CTodos} from './component/Todos.js'

const store = require('./model/state.js').getStore()

class App extends Component<{},{}> {
  render() {
    return (
	<Provider store={store} >
		<div className="App">
			<h1 className="App-title">The Redux React Todo</h1>
			<p className="App-intro">
			</p>
			<CTodos />
			<CSetting />
		</div>
	</Provider>
    );
  }
}

export default App;
