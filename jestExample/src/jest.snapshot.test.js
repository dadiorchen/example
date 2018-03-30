/* To demonstrate the snapshot test,using App component */
import React from 'react';
import App from './App.js';
//BACK why can not found this module????
import ReactTestUtils from 'react-dom/test-utils'
import TestRenderer from 'react-test-renderer'

it('renders correctly', () => {
	  const tree = TestRenderer
	    .create(<App />)
	    .toJSON();
	  expect(tree).toMatchSnapshot();
});
