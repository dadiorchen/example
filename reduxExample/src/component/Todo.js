/* The component to show a single Todo */
//@flow
import React from "react";
import {connect} from 'react-redux'
import {Todo as TodoEntity} from '../model/Todo.js'
import {type TypeState} from '../model/TypeState.js'
import {CONFIG} from '../config.js'
import todoModel from '../model/TodoModel.js'


type Props = {
	id	: string,
	todo	: TodoEntity,
	todoToggleStatus	: (id : string) => void,
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
	handleChange = () => {
		this.props.todoToggleStatus(this.props.id)
	}

	render(){
		console.warn('++++++++render:todo')
		const {todo} = this.props
		return(
			<div
				style={{
					border	: '1px solid gray',
					borderRadius	: 3,
					margin	: 5,
					padding	: 5,
					textAlign	: 'left',
				}}
			>
			<input 
				onChange={this.handleChange}
				type='checkbox' checked={todo.status === 0 ? '':'checked'} />
			{todo.content}</div>
		)
	}
}

const CTodo = CONFIG.SANDBOX_RENDER('Todo') ||
	connect(
	(state : TypeState,props) => {
		const {id} = props
		const todo = state.todos.byIds[id]	
		return {
			todo,
		}
	},
	{
		todoToggleStatus	: todoModel.actions.todoToggleStatus,
	},
)(Todo)
export {CTodo}
