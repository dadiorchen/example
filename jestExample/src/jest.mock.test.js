/* This file demo the jest mock function */

describe('TestMock',() => {

	it('TestMockName',() => {
		//TODO There is problem here ...
//		console.log('mock:',jest.fn())
//		const mock = jest.fn().mockName('theMock')
//		console.log('mock:',mock)
	})

	it('TestMock',() => {
		const m = jest.fn()
		m(1)
		console.log('m:',m.mock.calls)
		expect(m.mock.calls).toHaveLength(1)
		/* clear the mock */
		m.mockClear()
		console.log('m calls after clear:',m.mock.calls)
	})

	it('TestMockNew',() => {
		const m = jest.fn(() => {
			return {
				_id		: '0',
				name	: 'logger',
			}
		})

		const hashtag = new m()
		new m()
		console.log('hashtag:',hashtag)
		console.log('m:',m.mock.instances,m.mock.calls)

		//TODO do not known what the meaning of mockReset mockRestore 
		m.mockReset()

	})

	it('TestMockImplement',() => {
		const m = jest.fn()
		console.log('m.mock:',m.mock)
		m.mockImplementation(() => true)
		expect(m()).toBe(true)

		m
			.mockImplementationOnce(() => false)
			.mockImplementationOnce(() => false)
		expect(m()).toBe(false)
		expect(m()).toBe(false)
		expect(m()).toBe(true)
	})

	it('TestMockReturn',() => {
		const m = jest.fn()
			.mockReturnValue(true)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)
		expect(m()).toBe(false)
		expect(m()).toBe(false)
		expect(m()).toBe(true)
	})

	it('TestMockPromise',async () => {
		//TODO why the mockResolvedValue is undefined ? Because the wrong version?
//		const m = jest.fn()
//			.mockResolvedValue(true)
//		await m()
	})

	
})
