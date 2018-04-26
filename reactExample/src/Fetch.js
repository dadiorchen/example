import React from "react";


type Props = {
}
export class Fetch extends React.Component<Props,{
	//state
}>{
	constructor( props : Props){
		super(props);
		this.state = {
		}

	}
	/********************** properties ************/
	/********************** react method ***********/
	componentDidMount(){
		console.log('Begin fetch data ...')
		fetch('http://localhost:3001/')
		.then(r => {
			console.log('The response from baidu:',r)
		})
		.catch(e => {
			console.warn('Fetch error:',e)
		})
	}
	/********************** component method *******/
	render(){
		return(
			<div>To load data from server ...</div>
		)
	}
}
