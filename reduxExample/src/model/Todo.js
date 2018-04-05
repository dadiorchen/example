//@flow
/* The model of Todo */


export class Todo {
	id		: string
	content	: string
	createdTime	: number
	status	: number
	constructor(){
		this.id	= Math.round(Math.random()*10000) + ''
		this.content	= ''
		this.createdTime	= Date.now()
		this.status	= 0
	}
}

/* The model do not export , just export the singleton */
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
				case 'SET_STATUS' : {
					//to filter by status
					if(action.status >= 0){

					}else{
					}
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
		filterByStatus : (status : number) => (dispatch:any,getState:any) => {
			//BACK what is in the getState ? Its hard to find the ids and byIds from getState , because it may be different when test or non-test status , (the reducer is changed )
		},
	}
	
}

export const todoModel = new TodoModel()
