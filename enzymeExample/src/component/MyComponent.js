//@flow
import React from "react";


type Props = {
	displayMode	: 0 | 1 | 2,
}
export class MyComponent extends React.Component<Props,{
	//state
	isDetailShown	: boolean,
	display	: 'good' | 'bad',
}>{
	constructor( props : Props){
		super(props);
		this.state = {
			isDetailShown	: false,
			display	: props.displayMode === 1 ? 'good':'bad',
		}
	}
	/********************** properties ************/
	/********************** react method ***********/
	componentWillReceiveProps(nextProps : Props){
		this.setState({
			display	: nextProps.displayMode === 1 ? 'good':'bad',
		})
	}
	/********************** component method *******/
	render(){
		return(
			<div
				id='my'
				className='my-component'
				style={{
					display	: 'flex',
				}}
			>
				<p 
					className={this.state.display}
				> This is my component</p>
				<span><a href='www.baidu.com' >This is a link</a></span>
				<ChildComponent status={1} />
				<button 
					className='button'
					onClick={() => this.setState({isDetailShown:true})}
				>show detail</button>
				{this.state.isDetailShown && 
					<div className='detail' >
						I am detail !!!
					</div>
				}
			</div>
		)
	}
}

const ChildComponent = (props : any) => <div id='child-a' className='child-component' >This is my child component,with{props.status}</div>
export {ChildComponent}
