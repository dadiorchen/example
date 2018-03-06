import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {JSRobot} from './JSRobot.js'
import {Log} from './Log.js'

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			example : <Log />,
		}
	}
	render() {
		return (
			<div >
			<h1>THE REACT EXAMPLE</h1>
			<ul>
			<li
			onClick={() => this.setState({example:<JSRobot />})}
			>JS robot</li>
			<li
			onClick={() => this.setState({example : <Log />})}>
			Log example
			</li>
			</ul>
			{this.state && this.state.example}
			</div>
		);
	}
}

export default App;
