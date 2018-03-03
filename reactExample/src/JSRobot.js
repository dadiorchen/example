//@flow
/* 
 * this example show how to use js robot as a user human being to operate the web page (DOM)
 * */
import React from "react";
import jQuery from 'jquery'


type Props = {
}
export class JSRobot extends React.Component<Props,{
	//state
}>{
	constructor( props : Props){
		super(props);
		this.state = {
		}
	}
	/********************** properties ************/
	/********************** react method ***********/
	componentDidMount () {
		this.robot()
	}
	robot = () => {
		//{{{
		const click = new MouseEvent('click',{view:window,bubbles:true,cancelable:true})
		const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms))
		sleep(1000)
		.then(() => {
			console.log('click the button')
			jQuery('#buttonOK').trigger('click')
			return sleep(1000)
		})
		.then(() => {
			console.log('focos the input')
			jQuery('#input').trigger('select')
			return sleep(1000)
		})
		.then(() => {
			//NOTE : there is problem to simulate key operation on DOM, so , its better to directly change the value of input (by js) to simulate
			console.log('input input')
			jQuery("#input")
				.trigger ({
					type: 'keypress', 
					keyCode: 65,
					which: 65, 
					charCode: 65,
				} );
			//This code will fail
		})
			
		//}}}
	}
	/********************** component method *******/
	render(){
		return(
			<div>
				<button
					id='buttonOK'
					onClick={() => console.log('click the OK')}
				>OK</button>
				<input 
					type='text'
					id='input'
					onKeyPress={(e) => console.log('keydown!',e)}
				/>
					
			</div>
		)
	}
}
