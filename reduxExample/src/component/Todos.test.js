//@flow
import React from 'react'
import {shallow} from 'enzyme'
import {Todos} from './Todos.js' 


describe('TestTodosView',() => {
	it('TestTodos',() => {
		const w = shallow(<Todos 
				displayMode={1}
				ids={['a','b','c']}
			/>)
		/* Great, using enzyme, its easy to test the component which include other connected component , look , here , the debug show that , enzyme just render the component it self , not the children-connected-component */
		console.log(w.debug())
		expect(w.find('Connect(Todo)').exists()).toBe(true)
	})
})
