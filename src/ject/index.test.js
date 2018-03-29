/* this code is for jest test example */


describe('>>>jestTest',() => {
	it('testThrowExpectInPromise',done => {
		//when promise then , if expect do not match , whats the behavior : can be catch in promise-catch ? or interrupt the jest (quit)?
		Promise.resolve()
		.then(() => {
			expect(0).toBe(1)
		})
		.then(() => {
			done()
		})
		.catch(e => {
			console.log('catch:',e)
			done.fail()
		})
	})
})
