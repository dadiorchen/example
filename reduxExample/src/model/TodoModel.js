//@flow
/* The model do not export , just export the singleton */
import {type TypeState} from './TypeState.js'
import Todo from './Todo.js'

class TodoModel {
	constructor(){
	}

	reducers = {
		/* The map by id for all todo*/
		byIds	: (state : {[string] : Todo} = {},action : any) : {[string] : Todo} => {
			switch(action.type){
				case 'ADD':{
					const todo : Todo = action.todo
					const newState = {...state}
					newState[todo.id] = todo
					return newState
				}
				default:
					return state
			}
		},
		/* The todo list array,by todo id */
		ids		: (state : Array<string> = [],action : any) : Array<string> => {
			switch(action.type){
				case 'ADD' : {
					const todo : Todo = action.todo
					return [...state,todo.id]
				}
				case 'UPDATE_IDS' : {
					return [...action.ids]	
				}
				default : 
					return state
			}
		},
	
	}

	actions = {
		//TODO think about the return flow type 
		add : (todo : Todo) => {
			return {
				type	: 'ADD',
				todo,
			}
		},
		updateIds : (ids : Array<string>) => {
			return {
				type	: 'UPDATE_IDS',
				ids,
			}
		},
		filterByStatus : (status : number) => (dispatch:any,getState : () => TypeState) => {
			//BACK what is in the getState ? Its hard to find the ids and byIds from getState , because it may be different when test or non-test status , (the reducer is changed )
			console.log('The state in todo model:',getState())
			//Filter the list
			const {ids,byIds} = getState().todos
			const newIds = []
			//$FlowFixMe
			Object.values(byIds).forEach((todo : Todo) => {
				if(status === -1){
					newIds.push(todo.id)
				}else if(todo.status === status){
					newIds.push(todo.id)
				}
			})
			dispatch(this.actions.updateIds(newIds))
		},
	}
	
}

const todoModel = new TodoModel()
export default todoModel
