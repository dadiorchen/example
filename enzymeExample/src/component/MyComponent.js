//@flow
import React from "react";


type Props = {
}
export class MyComponent extends React.Component<Props,{
	//state
}>{
	constructor( props : Props){
		super(props);
		this.state = {
		}
	}
	/********************** properties ************/
	/********************** react method ***********/
	/********************** component method *******/
	render(){
		return(
			<div
				className='my-component'
			>MyComponent...</div>
		)
	}
}
