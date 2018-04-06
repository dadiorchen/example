//@flow
/* To test the search model */
import {searchModel} from './Search.js'
import {Todo} from './Todo.js'
import todoModel from './todoModel.js'
import {storeDispatch,sleep} from '../utils/TestUtils.js'
import state from './state.js'
import {type TypeState} from './TypeState.js'

const store = require('./state').getStore()

describe('TestSearchModel',() => {
	it('TestSearch',() => {
		console.log('store:',store.getState())
	})

	it('TestSearchStatus',async () => {
		const todo = new Todo()
		store.dispatch(todoModel.actions.add(todo))
		console.log('state:',store.getState())
		await storeDispatch(store,searchModel.actions.changeStatus(0))
		console.log('state:',store.getState())
		expect(store.getState().search.status).toBe(0)
		await store.dispatch(searchModel.actions.changeStatus(1))
		expect(store.getState().search.status).toBe(1)
		expect(store.getState().todos.ids).toHaveLength(0)
		console.log('state after chang status:',store.getState())
		await store.dispatch(searchModel.actions.changeStatus(0))
		expect(store.getState().todos.ids).toHaveLength(1)
		console.log('state after chang status:',store.getState())
	})
})
