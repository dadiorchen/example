The project to example the Jest usage

The entry:
	./src/jest.test.js


How to debug in Chrome?
* Add script to package.json:
	"testDebug" : "node --inspect-brk node_modules/.bin/jest --runInBand --watch --env=jsdom",
	//below is better
	"td"	: "react-scripts --inspect-brk test --env=jsdom --runInBand",

* Run : npm run testDebug
* Open the chrome address: chrome://inspect
* Select the node line
* Debug in the Chrome Debugger


The bail mode: if want Jest to stop at the first error of test , rather than run all the test, use the bail :
	npm test -- --bail 

