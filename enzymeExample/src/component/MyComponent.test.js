//@flow
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import {shallow,mount} from 'enzyme'
import {MyComponent,ChildComponent} from './MyComponent.js'
import toJson from 'enzyme-to-json'


describe('TestMyComponent',() => {
	it('TestMyComponentWithShallow',() => {
		const wrapper = shallow(<MyComponent 
				displayMode={1}
			/>)
		/* Test snapshot */
		expect(toJson(wrapper)).toMatchSnapshot()

		console.log('html:',wrapper.html())
		/* Demo find, selector */
		/* the class name */
		expect(wrapper.find('.my-component')).toHaveLength(1)
		/* the child */
		expect(wrapper.find('ChildComponent')).toHaveLength(1)
		/* NOTE, the find can not find the element in children */
		expect(wrapper.find('.child-component')).toHaveLength(0)
		expect(wrapper.find('#child-a')).toHaveLength(0)
		/* The id */
		expect(wrapper.find('#my')).toHaveLength(1)
		/* The DOM tag , and attribute */
		expect(wrapper.find('a[href="www.baidu.com"]')).toHaveLength(1)

		/* Filter */
		console.log(wrapper.find('div').filter('p').length)
//		expect(wrapper.find('div').filter('p')).toHaveLength(1)

		/* findWhere */
		expect(wrapper.findWhere( n => {
			return n.type() === 'a'
		})).toHaveLength(1)

		/* Child */
		expect(wrapper.find('span').childAt(0).type()).toBe('a')
		console.log('child:',wrapper.find('span').childAt(0))

		/* The current component props/state */
		console.warn('The state:',wrapper.state())
		console.warn('The props:',wrapper.props())
		console.warn('The props instance:',wrapper.instance())
		expect(wrapper.state().display).toBe('good')
		expect(wrapper.instance().state.display).toBe('good')
		/* The correct way to visit the props of component */
		expect(wrapper.instance().props.displayMode).toBe(1)

		/* Select the props (for children ) IN this component */
		expect(wrapper.find('[status=1]')).toHaveLength(1)


		expect(wrapper.find('.detail')).toHaveLength(0)
		/* To simulate the component */
		wrapper.find('.button').simulate('click')
		//Then , the detail was shown
		expect(wrapper.find('.detail')).toHaveLength(1)
		
		/* Try to print the component ,NOTE, the ideal way is :debug(), not html(), because , the debug() just show the content of current component , but , the html will try to render the children , in some case , like redux, this is important to avoid render children , cuz its impossible */
		console.log('html after click:',wrapper.html())
		console.log('debug after click:',wrapper.debug())

		/* To set state directly */
		wrapper.setState({isDetailShown : false})
		//So the detail was hidden
		expect(wrapper.find('.detail')).toHaveLength(0)

		/* To change the component props, then trigger the componentWillReceiveProps */
		expect(wrapper.find('.good')).toHaveLength(1)
		expect(wrapper.find('.bad')).toHaveLength(0)
		wrapper.setProps({displayMode : 0})
		expect(wrapper.find('.bad')).toHaveLength(1)
		expect(wrapper.find('.good')).toHaveLength(0)

		/* Instance */
		expect(wrapper.instance()).toBeInstanceOf(MyComponent)

	})

	it('TestByFullRender',() => {
		/* To use jest spy to check the function call , ITS IMPOSSIBLE ! Give up*/
		//const spy = jest.spyOn(MyComponent,'componentDidMount')
		const w = mount(<MyComponent 
				displayMode={1}
			/>)
		console.log(w.debug())
	})
})
