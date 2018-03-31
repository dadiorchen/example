/* To demonstrate the mock of module, in 3 cases:
 * 1. API			a local module mock it , and change its implements in current test file
 * 2. LcoalData		a local module , mock it in __mocks__ files 
 * 3. fs			a module in node_modules , mock it in __mocks__ files	
 * */
import {Model} from './Model.js'
import {API,APIA} from './API'

/* mock the module : API */
/* NOTE , this line must be put here , if put below ,in test block ,will do not work */
jest.mock('./API')
jest.mock('./LocalData')
jest.mock('fs')

describe('TestMock',() => {
	it('TestMock',() => {
		/* check the mock obj call history */
		function doSomething(callback){
			callback(1)
			return 1
		}
		const mock = jest.fn()
		doSomething(mock)
		doSomething(mock)
		const a = new mock()
		console.log('mock fn:',mock.mock)
		expect(mock.mock.calls.length).toBe(3)

		/* mock return */
		{
			const mock = jest.fn()
			mock.mockReturnValue(true)
			expect(mock()).toBe(true)
		}
	})

	/* mock a deep module ,two case: 1. A static object. 2. A class */
	it('TestMockModule',() => {
		/* mock the static method */
		APIA.request.mockReturnValue(true)
		console.warn('the API:',API)
		console.warn('the API:',new API())
		/*mock the API class */
		API.mockImplementation(() => {
			return {
				request	: () => true
			}
		})

		
		const model = new Model()
		console.log('model:',model)
		expect(model.get()).toBe(true)
		expect(model.getA()).toBe(true)
	})

	it('TestManualMock', () => {
		const model = new Model()
		/* The mock local module from manual mock */
		console.warn('the logs:',model.getLogs())
		console.warn('the logs:',model.getLogByName('test'))
		/* The mock module from manual mock */
		console.warn('the file:',model.getVimrc())

	})

})
