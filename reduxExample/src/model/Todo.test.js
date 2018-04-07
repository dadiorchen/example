//@flow
/* To test the todo model */
import {Todo} from './Todo.js'
import todoModel from './todoModel.js'
import {storeDispatch} from '../utils/TestUtils.js'
import state from './state.js'

const store = require('./state').getStore()

describe('TestTodoModel',() => {
	it('TestTodoClone',() => {
		//just for test, the object clone,and the instance
		const todo = new Todo()
		console.warn('the todo:',todo)
		expect(todo).toBeInstanceOf(Todo)
		const newTodo = {...todo}
		console.warn('the new todo:',newTodo)
		expect(newTodo).not.toBeInstanceOf(Todo)
		/* This is the correct way to clone the object */
		const newTodoB = Object.create(todo)
		Object.assign(newTodoB,todo)
		console.warn('the new todo b:',newTodoB)
		expect(newTodoB).toBeInstanceOf(Todo)
		/* conclusion : Its wrong to copy class-based object using spared operation */
	})

	it('TestTodo',() => {
		console.log('store:',store.getState())
	})

	it('TestTodoAdd',() => {
		const todo = new Todo()
		const {id} = todo
		const r = store.dispatch(todoModel.actions.todoAdd(todo))
		console.log('the state:',store.getState())
		console.log('xxx:',store.getState().todos.byIds[id])
		expect(store.getState().todos.byIds[id]).toBeInstanceOf(Todo)
		expect(store.getState().todos.ids).toHaveLength(1)
		
	})
})

