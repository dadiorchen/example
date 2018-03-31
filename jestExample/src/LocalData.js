/* To simulate the LocalData in logger, just as a Model to visit DB */



export const LocalData = {
	getLogs	: () => {
		return [
			{
				_id : '0',
				content	: 'real content',
			},{
				_id	: '1',
				content	: 'real content a',
			}
		]
	},
	getLogByName	: ( name ) => {
		return {
			_id	: '0',
			content 	: 'real content',
		}
	},
}
