/* The server of express
 * USAGE: > babel-node server.js start */

console.log('arg:',process.argv)
if(process.argv && process.argv[2] && process.argv[2] === 'start'){
	require('./index.js').server.start()
}
