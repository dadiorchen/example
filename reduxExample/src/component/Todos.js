//@flow
import React from "react";
import {connect} from 'react-redux'
import {type TypeState} from '../model/TypeState.js'
import {type TypeDisplayMode} from '../model/SettingModel.js'


type Props = {
	/* Import the state setting, to decide the display way of todo */
	/* So , this demo that the redux can make things easy to transport the state of different places */
	displayMode	: TypeDisplayMode,
}
export class Todos extends React.Component<Props,{
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
				style={{
					display	: 'flex',
					flexDirection	: this.props.displayMode === 0 ? 'column' : 'row',
				}}
			>
				<div>Todo1</div>
				<div>Todo2</div>
				<div>Todo3</div>
				<div>Todo4</div>
			</div>
		)
	}
}

const CTodos = connect(
	(state : TypeState) => {
		return {
			displayMode	: state.setting.displayMode,
		}
	},
	(dispatch) => {
	},
)(Todos)
export {CTodos}
