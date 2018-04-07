//@flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/* Using provider to pass the store down through all the app */
import {Provider} from 'react-redux'
import {CSetting} from './component/Setting.js'
import {CTodos} from './component/Todos.js'
import {CTodoAdd} from './component/TodoAdd.js'
import {CSearch} from './component/Search.js'

const store = require('./model/state.js').getStore()

class App extends Component<{},{}> {
  render() {
    return (
	<Provider store={store} >
		<div className="App">
			<h1 className="App-title">The Redux React Todo</h1>
			<p>To demonstrate the usage of : redux/enzyme/sandbox</p>
			<p className="App-intro">
			</p>
			<CTodoAdd />
			<CSearch />
			<CTodos />
			<CSetting />
		</div>
	</Provider>
    );
  }
}

export default App;
