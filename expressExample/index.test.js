const {server} = require('./index.js')

beforeAll(() => {
	server.start()
})

afterAll(() => {
	server.stop()
})

describe('TestExpress',() => {
	it('TestExpress',() => {
		console.log('OK')
		//BACK request the server '/' to get the hello world response 
	})
})
