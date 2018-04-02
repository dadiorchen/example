/* To demo the usage of expect API */
describe('TestUnitExpect',() => {

	it('TestExpectExtend',() => {
		expect.extend({
			toBeOliver(received,argument){
				if(received === 'oliver'){
					return {
						message	: () => `expected ${received} not to be oliver`,
						pass	: true
					}
				}else{
					return {
						message	: () => `expected ${received} to be oliver`,
						pass	: false,
					}
				}
			},
		})

		expect('oliver').toBeOliver()
		expect('deanchen').not.toBeOliver()
	})

	it('TestAnything',() => {
		/* anything toEqual anything */
		expect(1).toEqual(expect.anything())
		/* anything not toBe anything */
		expect(1).not.toBe(expect.anything())
	})

	/* Use any can check the return value of something, is very useful !!! */
	/* And the toBeInstanceOf is the same */
	it('TestAnyAndInstanceOf',() => {
		expect('xxx').toEqual(expect.any(String))
		expect(undefined).not.toEqual(expect.any(String))
		expect(new Date()).toEqual(expect.any(Date))
		expect(new Date()).not.toEqual(expect.any(Number))
		class Hashtag {
			name = 'logger'
		}
		const hashtag = new Hashtag()
		console.log('a object:',hashtag)
		expect(hashtag).toEqual(expect.any(Hashtag))

		expect(hashtag).toBeInstanceOf(Hashtag)

		const hashtagB = {
			name	: 'deanchen',
		}
		expect(hashtagB).not.toEqual(expect.any(Hashtag))
		expect(hashtagB).not.toBeInstanceOf(Hashtag)
	})

	it('TestAssertion',() => {
		expect.assertions(1)
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				expect(1).toBe(1)
				resolve()
			},1000)
		})
	})

	it('TestHasAssertion',() => {
		expect.hasAssertions()
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				expect(1).toBe(1)
				resolve()
			},1000)
		})
	})

	/* Its very useful to check a object's TYPE */
	it('TestObjectContaining',() => {
		expect({
			name	: 'logger',
			_id		: 'xxxx',
			createdTime	: Date.now(),
		}).toEqual(expect.objectContaining({
			name	: expect.any(String),
			_id		: expect.any(String),
			createdTime	: expect.any(Number),
		}))
	})


	it('TestToCantain',() => {
		expect(['oliver','deanchen']).toContain('deanchen')

		const hashtag = {
			name	: 'logger',
			_id		: '1',
		}
		console.log('the hashtag:',hashtag)
		const hashtagB = [{
			name	: 'logger',
			_id		: '1',
		}]
		console.log('the hashtagB:',hashtagB)
		expect(hashtagB).toContainEqual(hashtag)
	})

	it('TestLength',() => {
		expect([1,2,3]).toHaveLength(3)
		expect('abc').toHaveLength(3)
		expect(undefined).toBeUndefined()
	})

	it('TestString',() => {
		const log = {
			content	: 'this is a content',
		}
		expect(log.content).toMatch('content')
	})

	/* Its very useful to using matchObject to check the object */
	it('TestMatchObject',() => {
		expect({
			_id		: 'T_1',
			name	: 'logger',
			children	: [1,2,3],
		}).toMatchObject({
			_id		: expect.stringMatching(/T_.*/),
			name	: expect.any(String),
			children	: expect.any(Array),
		})
	})

	/* Its useful too,maybe it is good to just check one/two property */
	it('TestHaveProperty',() => {
		const hashtag = {
			_id		: 'T_1',
			name	: 'logger',
			children	: [1,2,3],
			mindmap	: {
				name	: 'deanchen'
			},
		}
		expect(hashtag).toHaveProperty('_id')
		expect(hashtag).toHaveProperty('name',expect.any(String))
		expect(hashtag).toHaveProperty('name','logger')
		expect(hashtag).toHaveProperty('mindmap.name','deanchen')

	})

	/* The throw match can be a string regular exp*/
	it('TestThrow',() => {
		expect(() => {
			throw 'This is a fake error'
		}).toThrow(/(fake|real)/)
	})
})
