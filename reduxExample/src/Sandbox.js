/* This file demo the Sandbox usage, A sandbox is a real component render in browser to debug and Its a shallow demo  , that means , it will just render the component itself , and do not render it's children */
//@flow
import React from "react";


type Props = {
}
export class Sandbox extends React.Component<Props,{
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
	renderOnly(){
		const {Todos} = require('./component/Todos.js')
		return(
			<Todos
				displayMode={1}
				ids={['a','b','c']}
			/>
		)
	}

	renderOnly() {
		const {Todo} = require('./component/Todo.js')
		const TodoEntity = require('./model/Todo.js').Todo
		const todo = new TodoEntity()
		todo.content  = 'Test Todo'
		return (
			<Todo
				id={'a'}
				todo={todo}
			/>
		)
	}

	renderOnly() {
		const {Search} = require('./component/Search.js')
		return (
			<Search
				status={-1}
				changeKeyword={() => {console.log('change keyword')}}
				changeStatus={() => {console.log('change status')}}

			/>)
	}

	render() {
		const {Setting} = require('./component/Setting.js')
		return (
			<Setting
				autoSearch={false}
				displayMode={0}
				displayModeUpdate={() => console.log('display mode update')}
				autoSearchUpdate={() => console.log('auto search update')}
			/>
		)
	}
}
