import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {User} from './User.js'

class App extends Component {
	componentDidMount() {
		fetch('http://localhost:3001/api/user/1')
		.then(res => {
			debugger
			console.log('Res:',res)
			return res.json()
		})
		.then(user => {
			console.log('The user json:',user)
		})
		.catch(e => {
			console.error('Catch:',e)
		})
	}

	render() {
		const user = new User()
		return (
			<div className="App">
			<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
			</header>
			<p className="App-intro">
			To get started, edit <code>src/App.js</code> and save to reload.
			</p>
			<p > User:{user.id},name:{user.name}</p>
			</div>
		);
	}
}

export default App;
