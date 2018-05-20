import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {JSRobot} from './JSRobot.js'
import {Log} from './Log.js'
//const Promise	= require('bluebird')


async function callIt(){
	await new Promise((resolve,reject) => {
		setTimeout(() => resolve(),1000)
	})
	//throw new Error('XXX')
	return Promise.reject(new Error('XXXX'))
}


class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			example : <Log />,
		}
	}

	
	async handleError(){
//		try{
			console.log('handle error:')
		try{
			await callIt()
		}catch(e){
			/* The way to append stack trace*/
			e.stack += Error().stack
			throw e
		}
			console.log('After...')
			console.log('After...')
			console.log('After...')
			console.log('After...')
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
			<h1>THE ASYNC/AWAIT ERROR HANDLE EXAMPLE</h1>

				<div
					onClick={this.handleError}
				>
					Test Error
				</div>
			</div>
		);
	}
}

export default App;
