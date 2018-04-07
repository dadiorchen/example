//@flow
/* The model for search */
import todoModel from './TodoModel.js'

class SearchModel {
	reducers = {
		search	: (state : {keyword : string,status : number} = {keyword : '',status : -1},action:any) => {
			switch(action.type){
				case 'SEARCH_SET_STATUS' : {
					const newState = {...state}
					newState.status = action.status
					return newState
				}
				case 'SEARCH_SET_KEYWORD' : {
					const newState = {...state}
					newState.keyword = action.keyword
					return newState
				}
				default:
					return state
			}
		}
	}

	actions = {
		searchSetStatus	: (status : number) => {
			return {
				type	: 'SEARCH_SET_STATUS',
				status,
			}
		},
		searchSetKeyword	: (keyword : string) => {
			return {
				type	: 'SEARCH_SET_KEYWORD',
				keyword,
			}
		},
		changeStatus	: (status : number) => (dispatch : any , getState : any) => {
			dispatch(this.actions.searchSetStatus(status))
			//inform the todo model to change
			dispatch(todoModel.actions.todoFilterByStatus(status))
		},
		changeKeyword	: (keyword : string ) => (dispatch : any , getState : any) => {
			dispatch(this.actions.searchSetKeyword(keyword))
			dispatch(todoModel.actions.todoFilterByKeyword(keyword))
		},
	}
}

export const searchModel = new SearchModel()
