/* To demo the global API of jest, like before all , only ,skip */

beforeAll(() => {
	console.log('beforeAll , in file ')
})

afterAll(() => {
	console.log('afterAll,in file')
})


describe('TestGlobalA',() => {
	beforeAll(() => {
		console.log('beforeAll,in describe')
	})

	afterAll(() => {
		console.log('afterAll,in describe')
	})

	beforeEach(() => {
		console.log('beforeEach,A')
	})

	afterEach(() => {
		console.log('afterEach,A')
	})

	it('TestA',() => {
		console.log('testA')
	})
	
	
	it('TestB',() => {
	/* To skip a test */
	//it.skip('TestB',() => {
		console.log('testB')
	})
})

describe('TestGlobalB',() => {
/* To cancel a describe */
//describe.skip('TestGlobalB',() => {
	beforeAll(() => {
		console.log('beforeAll,in describe B')
	})

	afterAll(() => {
		console.log('afterAll,in describe B')
	})

	it('TestBBB',() => {
		console.log('testBBB')
	})
})
