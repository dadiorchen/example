//@flow
/* To test the todo model */
import {Todo} from './Todo.js'
import todoModel from './todoModel.js'
import {storeDispatch} from '../utils/TestUtils.js'
import state from './state.js'

const store = require('./state').getStore()

describe('TestTodoModel',() => {
	it('TestTodo',() => {
		console.log('store:',store.getState())
	})

	it('TestTodoAdd',() => {
		const todo = new Todo()
		const {id} = todo
		const r = store.dispatch(todoModel.actions.add(todo))
		console.log('the state:',store.getState())
		console.log('xxx:',store.getState().todos.byIds[id])
		expect(store.getState().todos.byIds[id]).toBeInstanceOf(Todo)
		expect(store.getState().todos.ids).toHaveLength(1)
		
	})
})

