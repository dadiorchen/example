/* Demo the error & handle in JS */
/* So, throw a string is a bad way , it can not print the error stack , must throw Error() */


describe('TestError',() => {
//	it('TestError',() => {
//		throw 'This error is correct, just for test'
//	})
//
//	it('TestError',() => {
//		throw new Error('This error is correct , just for test')
//	})

	const callToThrow	= () => {
		throw 'This is a error , its a string'
	}

	it('TestError',() => {
		try{
			callToThrow()
		}catch(e){
			console.error('Catch it:',e)
		}
	})

	const callToThrowError	= () => {
		throw Error('This is a error, its a error class')
	}

	it('TestTrhowErrorObject',() => {
		try{
			callToThrowError()
		}catch(e){
			console.error('Catch it:',e)
		}
	})
})
