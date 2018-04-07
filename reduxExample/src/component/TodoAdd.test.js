//@flow
import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import {TodoAdd} from './TodoAdd.js'

describe('TestTodoAdd',() => {
	it('TestTodoAdd',() => {
		const mock = jest.fn()
		const w = shallow(<TodoAdd 
				todoAddByContent={mock}
			/>)
		expect(toJson(w)).toMatchSnapshot()
		//click -> text is null
		w.setState({content:'text'})
		w.find('button').simulate('click')
		expect(w.state('content')).toBe('')
		expect(mock).toHaveBeenCalled()
	})
})
