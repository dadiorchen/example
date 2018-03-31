/* The manual mock moudle */

export const LocalData = jest.genMockFromModule('../LocalData.js')

//console.log('the mock of LocalData:',LocalData)

LocalData.getLogByName = jest.fn(() => {return {
	_id	: '0',
	content	: 'fack content'
}})

LocalData.getLogs = jest.fn(() => [
	{
		_id	: '0',
		content	: 'fake content',
	},{
		_id	: '1',
		content	: 'fake content 2',
	}
])
