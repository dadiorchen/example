/* This test demo the setup and tear down for test , like : beforeAll, afterAll ,beforeEach */
beforeAll(() => {
	console.log('beforeAll')
	return new Promise((resolve,reject) => {
		/* Here throw error, the test will failure*/
		setTimeout(() => reject(),1000)
	})
})

afterAll(() => {
	console.log('afterAll')
})


describe('TestSetup',() => {
	it('Test',() => {
		console.log('This is a test...')
	})
})
