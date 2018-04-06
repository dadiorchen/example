//@flow
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import {shallow} from 'enzyme'
import {Todo} from './Todo.js'
import {Todo as TodoEntity} from '../model/Todo.js'

describe('TestTodo',() => {
	it('TestTodo',() => {
		const todo = new TodoEntity()
		todo.content = 'OK'
		const w = shallow(<Todo
				id={'a'}
				todo={todo}
			/>)
		console.log(w.debug())
	})
})
