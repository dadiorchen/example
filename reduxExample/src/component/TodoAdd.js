//@flow
/* This component is to show a input and add todo to todo-list */
import React from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import todoModel from '../model/TodoModel.js'


type Props = {
	todoAddByContent : (content : string) => void,
}
export class TodoAdd extends React.Component<Props,{
	//state
	content	: string,
}>{
	constructor( props : Props){
		super(props);
		this.state = {
			content	: '',
		}
	}
	/********************** properties ************/
	/********************** react method ***********/
	/********************** component method *******/
	handleChange = (e : any) => {
		this.setState({
			content	: e.target.value,
		})
	}

	/* Add to model */
	handleAdd = () => {
		this.props.todoAddByContent(this.state.content)
		//clear the input
		this.setState({
			content	: ''
		})
	}

	render(){
		console.warn('+++render:todoadd')
		return(
			<div>
				<input 
					type='text' 
					placeholder='Please input todo content'
					value={this.state.content}
					onChange={this.handleChange}
				/>
				<button
					onClick={this.handleAdd}
				>
				Add
				</button>
			</div>
		)
	}
}

const CTodoAdd = connect(
	null,
//	(dispatch) => {
//		/* The original way */
////		return {
////			todoAddByContent : (content : string) => {
////				dispatch(todoModel.actions.todoAddByContent(content))
////			}
////		}
//		/* Using bindActionCreator */
////		return bindActionCreators({todoAddByContent:todoModel.actions.todoAddByContent },dispatch)
//	}
	/* The great way , Its VERY sample !! */
	{
			todoAddByContent : todoModel.actions.todoAddByContent
	}
)(TodoAdd)
export {CTodoAdd}

