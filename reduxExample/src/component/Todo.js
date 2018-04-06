/* The component to show a single Todo */
//@flow
import React from "react";
import {connect} from 'react-redux'
import {Todo as TodoEntity} from '../model/Todo.js'
import {type TypeState} from '../model/TypeState.js'


type Props = {
	id	: string,
	todo	: TodoEntity,
}
export class Todo extends React.Component<Props,{
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
			<div>This is a todo:{this.props.todo.content}</div>
		)
	}
}

const CTodo = connect(
	(state : TypeState,props) => {
		const {id} = props
		const todo = state.todos.byIds[id]	
		return {
			todo,
		}
	},
	(dispatch) => {
	},
)(Todo)
export {CTodo}
