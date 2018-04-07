//@flow
import React from 'react'
import {shallow} from 'enzyme'
import {Search} from './Search.js'
import toJson from 'enzyme-to-json'

describe('TestSearch',() =>{
	it('TestSearch',() => {
		const mock = jest.fn()
		const mockA = jest.fn()
		const w = shallow(<Search 
				autoSearch={false}
				changeKeyword={mock}
				status={-1}
				changeStatus={mockA}
			/>)
		expect(toJson(w)).toMatchSnapshot()
		//click
		w.find('button').simulate('click')
		expect(mock).toHaveBeenCalled()

		w.find('.search-status').simulate('click')
		expect(mockA).toHaveBeenCalled()
	})

	it('TestSearchAuto',() => {
		const mock = jest.fn()
		const mockA = jest.fn()
		const w = shallow(<Search 
				autoSearch={true}
				changeKeyword={mock}
				status={-1}
				changeStatus={mockA}
			/>)
		//onChange
		w.instance().handleChange({target:{value:'t'}})
		expect(mock).toHaveBeenCalled()

	})


})
