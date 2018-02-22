/* demonstrate the module export 
 * using the original node export system: the module & require
 * */

exports.someFunction= function (){
	console.info('module function executing ...')
}

/* module.exports = exports */
module.exports.someConst = 'this is a const'

class someClass {
	constructor(){
		console.info('construct some class...')
	}
}

exports.someClass = someClass



