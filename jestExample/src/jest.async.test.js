import {Model} from './Model.js'
import {API,APIA} from './API'

/* mock the module : API */
/* NOTE , this line must be put here , if put below ,in test block ,will do not work */
jest.mock('./API')

/* To demonstrate async test */
describe('TestAsync',() => {

	it('TestAsync',done => {

		setTimeout(() => {
			done()
		},300)
	})

	
	it('TestPromise',done => {
		/* return a promise ,and call the done finally */
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				resolve()
				done()
			},300)
		})
	})

	it('TestAssertion',() => {
		expect.assertions(2)
		return Promise.resolve()
		.then(() => {
			expect(1).toBe(1)
		})
		.then(() => {
			expect(1).toBe(1)
		})
	})

	it('TestExpectResolve',() => {
		expect.assertions(1)
		return expect(new Promise((resolve,reject) => {
			setTimeout(() => {
				resolve('OK')
			},300)
		})).resolves.toBe('OK')
	})

	it('TestExpectReject',() => {
		expect.assertions(1)
		return expect(new Promise((resolve,reject) => {
			setTimeout(() => {
				reject('error')
			},300)
		})).rejects.toMatch(/error/)
	})

	it('TestAwait',async () => {
		const result = await new Promise((resolve,reject) => {
			setTimeout(() => {
				resolve('OK')
			})
		})
		expect(result).toBe('OK')
	})
})

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
})
