This project demonstrate the usage of express.js (version 4.0)

Serve static file:(./index.js)	
	app.use('/static',express.static('static'))

How to test the express server by Jest ?
	Using the Jest beforeAll and afterAll to start/stop the server, code : ./index.test.js


