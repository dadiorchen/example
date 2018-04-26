/* Test usage of loglevel */
const log	= require('loglevel')
log.setLevel('debug')

describe('TestLoglevel',() => {
	it('Test',() => {
		expect(() => {
			console.debug('Dose console has debug function in node ?')
		}).toThrow()

		//loglevel has debug
		log.debug('Dose loglevel has debug ? YES')

		log.trace('This is loglevel trace ouput!')

		//Trace output is a hassle , change it !
		//WRONG console.trace	= console.log
		/* NOTE can change trace output in jest/node , if change , the trace will be print out even the set level is debug/info */
		require('loglevel').trace	= (...args) => {
			console.log(...args)
		}

		log.trace('This is changed loglevel trace ouput!')
		
	})



})
