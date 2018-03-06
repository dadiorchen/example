/*
 * example for log (console)
 * */
import React from "react";


type Props = {
}
export class Log extends React.Component<Props,{
	//state
}>{
	constructor( props : Props){
		super(props);
		this.state = {
		}
	}
	/********************** properties ************/
	componentDidMount(){
		console.group('componentDidMount')
		console.log('in did mount')
		this.logA()
		console.groupEnd()
	}
	/********************** react method ***********/
	/********************** component method *******/
	logA = () =>{
		console.group('logA')
		console.log('in A')
		try{
			this.logB()
		}catch(e){
			console.log('catch in A')
		}
		console.log('in A, after B')
		console.groupEnd()
	}

	logB = () => {
		/* unfortunately , must wrap a try-finally to ensure the group closed */
		try{
			console.group('logB')
			console.log('in B')
			/* test throw */
			if(true){
				throw 'throw in B'
			}
		}finally{
			console.groupEnd()
		}
	}
	render(){
		return(
			<div>MyComponent...</div>
		)
	}
}
