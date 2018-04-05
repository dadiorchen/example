//@flow
/* To test the search model */
import {searchModel} from './Search.js'
import {Todo,todoModel} from './Todo.js'
import thunk from 'redux-thunk'
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'

const store : {
	dispatch	: (any) => void,
	getState : () => {
		byIds	: {[string] : Todo},
		ids		: Array<string>,
		search	: {
			keyworkd	: string,
			status	: number,
		}
	}
} = compose(applyMiddleware(thunk))(createStore)(combineReducers({
	search	: searchModel.reducers.search,
	ids		: todoModel.reducers.ids,
	byIds	: todoModel.reducers.byIds,
}))

describe('TestSearchModel',() => {
	it('TestSearch',() => {
		console.log('store:',store.getState())
	})

	it('TestSearchStatus',() => {
		const todo = new Todo()
		store.dispatch(todoModel.actions.add(todo))
		store.dispatch(searchModel.actions.setStatus(0))
		console.log('state:',store.getState())
		expect(store.getState().search.status).toBe(0)
		
		//OK, when search the status, the ids of todo need to be filter by it 
		expect(store.getState().ids).toHaveLength(1)

		store.dispatch(searchModel.actions.setStatus(1))
		expect(store.getState().search.status).toBe(1)
		expect(store.getState().ids).toHaveLength(0)
	})
})
