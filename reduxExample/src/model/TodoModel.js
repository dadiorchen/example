//@flow
/* The model do not export , just export the singleton */
import {type TypeState} from './TypeState.js'
import {Todo} from './Todo.js'

class TodoModel {
	constructor(){
	}

	reducers = {
		/* The map by id for all todo*/
		byIds	: (state : {[string] : Todo} = {},action : any) : {[string] : Todo} => {
			switch(action.type){
				case 'TODO_ADD':{
					const todo : Todo = action.todo
					const newState = {...state}
					newState[todo.id] = todo
					return newState
				}
				case 'TODO_TOGGLE_STATUS' : {
					const newState = {...state}
					/* The tedious way to clone object */
//					const newTodo = new Todo()
//					const oldTodo = newState[action.id]
//					newTodo.id = oldTodo.id
//					newTodo.content  = oldTodo.content
//					newTodo.createdTime = oldTodo.createdTime
//					newTodo.status = (( oldTodo.status + 1 ) % 2)

					const oldTodo = newState[action.id]
					const newTodo = Object.create(oldTodo)
					Object.assign(newTodo,oldTodo)
					newTodo.status = (newTodo.status + 1 ) % 2
					newState[action.id] = newTodo
					return newState
				}
				default:
					return state
			}
		},
		/* The todo list array,by todo id */
		ids		: (state : Array<string> = [],action : any) : Array<string> => {
			switch(action.type){
				case 'TODO_ADD' : {
					const todo : Todo = action.todo
					return [...state,todo.id]
				}
				case 'TODO_UPDATE_IDS' : {
					return [...action.ids]	
				}
				default : 
					return state
			}
		},
	
	}

	actions = {
		//TODO think about the return flow type 
		todoAdd : (todo : Todo) => {
			return {
				type	: 'TODO_ADD',
				todo,
			}
		},
		todoAddByContent : (content : string) => (dispatch:any,getState : () => TypeState) => {
			const todo = new Todo()
			todo.content = content
			dispatch(this.actions.todoAdd(todo))
		},
		todoUpdateIds : (ids : Array<string>) => {
			return {
				type	: 'TODO_UPDATE_IDS',
				ids,
			}
		},
		todoFilterByStatus : (status : number) => (dispatch:any,getState : () => TypeState) => {
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
			dispatch(this.actions.todoUpdateIds(newIds))
		},
		todoFilterByKeyword : (keyword : string) => (dispatch : any,getState : () => TypeState) => {
			const {ids,byIds} = getState().todos
			const {status} = getState().search
			const newIds = []
			//$FlowFixMe
			Object.values(byIds).forEach((todo : Todo) => {
				let isStatusSatisfed = false
				if(status === -1){
					isStatusSatisfed = true
				}else if(todo.status === status ){
					isStatusSatisfed = true
				}
				if(isStatusSatisfed){
					//Match the keyword
					if(todo.content && todo.content.indexOf(keyword) >= 0){
						newIds.push(todo.id)
					}
				}else{
					return
				}
			})
			dispatch(this.actions.todoUpdateIds(newIds))
		},
		todoToggleStatus : (id : string) => {
			return {
				type	: 'TODO_TOGGLE_STATUS',
				id,
			}
		},
	}
	
}

const todoModel = new TodoModel()
export default todoModel
