/* this is the entry to example of EXPORT */
console.info('module:',module)

const myModule = require('./module.js')
console.info('demonstrate the export:')
console.info('execute exported function:')
myModule.someFunction()
console.info('execute exported const:',myModule.someConst)
const SomeClass = require('./module.js').someClass
console.info('to construct some class:')
const someObject = new SomeClass()



