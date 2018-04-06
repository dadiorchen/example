This project demonstrate the usage of enzyme , using enzyme to test the pure component.

Install
	* npm i --save-dev enzyme enzyme-adapter-react-16
	* npm install --save-dev enzyme-to-json

Snapshot Test:
	* Using enzyme shallow + enzyme-to-json + jest.expect().toMatchSnapshot() to test it! See: ./src/component/MyComponent.test.js
