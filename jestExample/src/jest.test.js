/* To demonstrate the jest usage */

describe('Basic',() => {

	it('Equal',() => {

		/* is */
		expect(0).toBe(0)

		/* is not */
		const a = [1,2,3]
		const b = [1,2,3]
		const c = a
		expect(a).toBe(c)
		expect(a).not.toBe(b)
		/* equal : to check out the internal content , like : array ,object */
		expect(a).toEqual(b)
		b.push(4)
		expect(a).not.toEqual(b)
		expect({a:1,b:2}).toEqual({a:1,b:2})
		/* equal map is OK */
		const map1 = new Map()
		map1.set('a',1)
		map1.set('b',2)
		const map2 = new Map()
		map2.set('a',1)
		map2.set('b',2)
		expect(map1).toEqual(map2)

		/* null */
		const d = null
		expect(d).toBeNull()
		expect(d).toBeDefined()
		/* undefined */
		let ddd = undefined
		expect(ddd).toBeUndefined()

		/* truthy/falsy */
		expect(1).toBeTruthy()
		expect(0).toBeFalsy()
		expect("").toBeFalsy()
		expect(" ").toBeTruthy()

		/* string match (reg) */
		{
			expect('ant is aunt').toMatch(/^ant.*$/)
			expect('ant is aunt').not.toMatch(/iss/)
		}

		/* to ensure array has some element */
		{
			expect([1,2,3,3,4]).toContain(3)
		}

		/* to ensure thrown */
		{
			const doSomething = function(a){
				throw 1
			}
			expect(doSomething).toThrow()
			const doSomethingB = function(a){
				if(a === 1){
					throw 1
				}
			}
			expect(doSomethingB).not.toThrow()
			expect(() => {
				doSomethingB(1)
			}).toThrow()
		}
	})
})
