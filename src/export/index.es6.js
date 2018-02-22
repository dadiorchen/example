/*
 * demo of ES6 style module system
 * import, demo alias of import */
import {someFunction,someConst,someClass as SomeClass} from './module.es6.mjs'
import DEFAULT from './module.es6.mjs'
import * as myModule from './module.es6.mjs'

console.info('import someFunction , and execute it...')
someFunction()
console.info('import someConst ,and print it ...',someConst)
console.info('import someClass ,and new one...')
const someObject = new SomeClass()
console.info('import the default const:',DEFAULT)
console.info('this is import * as some style:',myModule.someConst)
