/* This file demo the mock file which do not auto-mock by __mocks__ , rather than by setMock manually */


export const LocalData = jest.genMockFromModule('../LocalData.js')


LocalData.getLogByName = jest.fn(() => {return {
	_id	: '0',
	content	: 'fack content B'
}})

LocalData.getLogs = jest.fn(() => [
	{
		_id	: '0',
		content	: 'fake content B',
	},{
		_id	: '1',
		content	: 'fake content 2 B',
	}
])
