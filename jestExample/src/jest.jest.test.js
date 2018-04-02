/* To demo the "jest" object API */

describe('TestJest',() => {

	it('TestIsMockFunction',() => {
		console.log(jest.isMockFunction(() => true))
		console.log(jest.isMockFunction(jest.fn()))
		expect(1).toBe(1)
	})

	//BACK https://facebook.github.io/jest/docs/en/jest-object.html#jestmockmodulename-factory-options
})
