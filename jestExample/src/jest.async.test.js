
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

