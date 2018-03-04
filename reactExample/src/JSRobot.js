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
	inputText : string,
}>{
	constructor( props : Props){
		super(props);
		this.state = {
			inputText : ''
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
			console.log('focus the input')
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
			return sleep(1000)
		})
		.then(() => {
			/* simulate input text */
			console.log('input text')
			this.setState({inputText:this.state.inputText + 'a'})	
			return sleep(300)
		})
		.then(() => {
			this.setState({inputText:this.state.inputText + 'b'})	
			return sleep(300)
		})
		.then(() => {
			this.setState({inputText:this.state.inputText + 'c'})	
			return sleep(300)
		})
		.then(() => {
			this.setState({inputText:this.state.inputText + 'd'})	
			return sleep(300)
		})
		.then(() => {
			this.setState({inputText:this.state.inputText + 'e'})	
			return sleep(300)
		})
		.then(() => {
			/* simulate click one of a array */
			jQuery('.li-item:nth-child(2)').trigger('click')
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
					value={this.state.inputText}
					onChange={(e) => this.setState({inputText:e.target.value})}
				/>
				<ul className='items' >
					{Array.from(new Array(4)).map((e,i) => 
						<li className='li-item' 
							onClick={() => console.log('item %d was clicked',i+1)}
						><div>item {i+1} </div></li>
					)}
				</ul>
					
			</div>
		)
	}
}
