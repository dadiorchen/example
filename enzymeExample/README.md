This project demonstrate the usage of enzyme , using enzyme to test the pure component.

Install
	* npm i --save-dev enzyme enzyme-adapter-react-16
	* npm install --save-dev enzyme-to-json

* To setup enzyme globally :
	Because enzyme need to config :
		import Enzyme from 'enzyme';
		import Adapter from 'enzyme-adapter-react-16';
		Enzyme.configure({ adapter: new Adapter() });
	If do not config , will throw exception:
		Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To
	  configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
	  before using any of Enzyme's top level APIs, where `Adapter` is the adapter
	  corresponding to the library currently being tested. For example:

	So, its better to setup it globale by jest config parameter --setupTestFrameworkScriptFile=<Path>
		* Add it in package.json:
		* Add the setup file at ./src/testSetup.js


Snapshot Test:
	* Using enzyme shallow + enzyme-to-json + jest.expect().toMatchSnapshot() to test it! See: ./src/component/MyComponent.test.js
