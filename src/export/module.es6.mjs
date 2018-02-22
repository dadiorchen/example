/* demonstrate the module export 
 * this is demo the ES6 , export/import
 * */

console.info('loading module...')

/* export a function */
export function someFunction(){
	console.info('module function executing ...')
}

/* export a const */
export const someConst = 'this is a const'

/* export a class */
export class someClass {
	constructor(){
		console.info('construct some class...')
	}
}

/* export default variable */
const defaultConst = 'THIS IS A MODULE'
export default defaultConst  

/* export default function */
//export default function defaultFunction(){
//	console.info('default function executing...')
//}



