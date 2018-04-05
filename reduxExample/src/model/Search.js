//@flow
/* The model for search */
import todoModel from './TodoModel.js'

class SearchModel {
	reducers = {
		search	: (state : {keyword : string,status : number} = {keyword : '',status : -1},action:any) => {
			switch(action.type){
				case 'SET_STATUS' : {
					const newState = {...state}
					newState.status = action.status
					return newState
				}
				case 'SET_KEYWORD' : {
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
		setStatus	: (status : number) => {
			return {
				type	: 'SET_STATUS',
				status,
			}
		},
		setKeyword	: (keyword : string) => {
			return {
				type	: 'SET_KEYWORD',
				keyword,
			}
		},
		changeStatus	: (status : number) => (dispatch : any , getState : any) => {
			dispatch(this.actions.setStatus(status))
			//inform the todo model to change
			dispatch(todoModel.actions.filterByStatus(status))
		},
	}
}

export const searchModel = new SearchModel()
