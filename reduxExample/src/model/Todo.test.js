//@flow
/* To test the todo model */
import {Todo,todoModel} from './Todo.js'
import thunk from 'redux-thunk'
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import {storeDispatch} from '../utils/TestUtils.js'

const store : {
	dispatch	: (any) => void,
	getState : () => {
		byIds	: {[string]:Todo},
		ids	: Array<string>,
	}
} = compose(applyMiddleware(thunk))(createStore)(combineReducers({
	byIds	: todoModel.reducers.byIds,
	ids		: todoModel.reducers.ids,
}))

describe('TestTodoModel',() => {
	it('TestTodo',() => {
		console.log('store:',store.getState())
	})

	it('TestTodoAdd',() => {
		const todo = new Todo()
		const {id} = todo
		const r = store.dispatch(todoModel.actions.add(todo))
		console.log('the state:',store.getState())
		console.log('xxx:',store.getState().byIds[id])
		expect(store.getState().byIds[id]).toBeInstanceOf(Todo)
		expect(store.getState().ids).toHaveLength(1)
		
	})
})
