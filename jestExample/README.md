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
NOTE: the bail config can not be set in package.json ( maybe because the create-react-app)


NOTE , the create-react-app do not support config in package.json , and Its not good to add jest.config.js and --config=path parameter to jest, because 这可能会造成改变了原有的配置,一些语法检验不通过,所以最好的办法还是用jest的参数,比如 --bail

Jest parameter example ( in create-react-app config ):

* npm test async  			//filter the file match "async"
* npm test -- --bail		//the bail mode


To setup test globally:
	
	* Write the setup file: ./src/setup.js
	* Use it : npm test -- --setupTestFrameworkScriptFile=./src/setup.js
	* The setup code will be run before every test file!

