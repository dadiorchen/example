This project demo : react + express , run in a single project 

	* Use create-react-app to install the react runner
	* Add server.js to run express
	* Using create-react-app proxy config to proxy the request to API server
	* The react component request/fetch data from express
	* Use concurrently to run server and react at the same time

About CORS problem: 
	* If the jest env is : jsdom , then , if in the test : fetch('http://127.0.0.1:3008/index'),
		this will throw a CORS error, if remove the jsdom: in package.json: test= jest --env=jsdom 
		this will not throw CORS error
	
