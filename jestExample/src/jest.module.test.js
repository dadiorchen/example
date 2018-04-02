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
//		console.error('the API:',API)
//		console.error('the APIA:',APIA)
		/* the APIA 's request has been mock , but it do not return 'true', so mock it */
		APIA.request.mockReturnValue(true)
//		console.warn('the API:',API)
//		console.warn('the API:',new API())
		/*mock the API class */
		/* To mock the class */
		const request = jest.fn().mockReturnValue(true)
		API.mockImplementation(() => {
			return {
				request,
			}
		})

		const model = new Model()
		console.log('model:',model)
		expect(model.get()).toBe(true)
		expect(model.getA()).toBe(true)
		/* To check the function has been called */
		expect(request).toHaveBeenCalled()

	})
	
	it('TestDontMock',() => {
		{
			/* NOTE must use reset module to make it work !!! */
			jest.resetModules()
			console.warn('to unmock:')
			jest.unmock('./API')
			/* below is OK either */
			//jest.dontMock('./API')
			const {Model} = require('./Model')
			const modelReal = new Model()
			expect(modelReal.get).toThrow()
		}
	})

	it('TestManualMock', () => {
		const model = new Model()
		/* The mock local module from manual mock */
		console.warn('the logs:',model.getLogs())
		console.warn('the logs:',model.getLogByName('test'))
		/* The mock module from manual mock */
		console.warn('the file:',model.getVimrc())

	})

	/* To mock a module manually , and the mock object is defined in a File
	 * This is useful in this case:
	 * 	* Define a common mock file in __mocks__ 
	 * 	* Sometimes , the common mock do not meet the requirement , then , use mock in test file 
	 * 	* But , if need to use it frequently , then , defined it in a file , and use setMock to use it 
	 * */
	it('TestManualMockByManual',() => {
		jest.resetModules()
		/* To mock it manually */
		jest.setMock('./LocalData',require('./__mocks__/LocalDataB.js'))
		/* NOTE , must re-require the model from module file */
		const {Model} = require('./Model')
		const model = new Model()
		console.warn('the logs:',model.getLogs())
		console.warn('the logs:',model.getLogByName('test'))
	})


	/* Its useful when we want to just spy on some method , but do not change the implement of it */
	it('TestSpyOn',() => {
		const video = {
			play(){
				this.stop()
				return 'play something'
			},
			stop(){
				console.log('stop')
			}
		}
		const Model = {
			play	() {
				this.stop()
				console.log('play')
			},
			stop	: () => {
				console.log('stop')
			}
		}
		Model.play()
		console.log('video.play:',video.play())
		const spy = jest.spyOn(video,'play')
		const r = video.play()
		video.stop()
		expect(spy).toHaveBeenCalled()

	})

})
