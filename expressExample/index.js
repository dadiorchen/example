const express = require('express')
const app = express()


/* Set up the static file */
app.use('/static',express.static('static'))
app.get('/',(req,res) => res.send('Hello Express World !'))

let theServer

const server = {
	start	: () =>{
		console.log('to start the server...')
		theServer = app.listen(3001,() => {
			console.log('My first express running ...')
		})
		console.log('the server:',theServer)
	},
	stop	: () =>{
		console.warn('to close the server...')
		theServer.close()
	},
	
}

export {server}
