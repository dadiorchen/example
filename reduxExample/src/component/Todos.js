//@flow
import React from "react";
import {connect} from 'react-redux'
import {type TypeState} from '../model/TypeState.js'
import {type TypeDisplayMode} from '../model/SettingModel.js'
import {CTodo} from './Todo.js'


type Props = {
	/* Import the state setting, to decide the display way of todo */
	/* So , this demo that the redux can make things easy to transport the state of different places */
	displayMode	: TypeDisplayMode,
	ids			: Array<string>,
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
				{this.props.ids && this.props.ids.map(id => {
					return (
						<CTodo
							key={id}
							id={id}
						/>
					)
				})}
			</div>
		)
	}
}

const CTodos = connect(
	(state : TypeState) => {
		return {
			displayMode	: state.setting.displayMode,
			ids			: state.todos.ids,
		}
	},
	(dispatch) => {
	},
)(Todos)
export {CTodos}
