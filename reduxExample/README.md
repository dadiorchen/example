This project show the project:

* using redux as model and 
* react as component view, 
* and use enzyme to test the component
	NOTE, the enzyme just test the component using shallow render , so , just test the component itself , not its descendant
	Using enzyme, to test the component which includes other connected component , its easy! Just test it , enzyme shallow will handle the it fine, see the ./src/component/Todos.test.js 
* Sandbox: then, I will create a sandbox , by which, I can run a component in real browser , to test and try to demo it, to achieve this objective, I must decouple the component and its children/descendant component from the Redux, that is , the connected component . So , I must code a setting to dis-connect the component from its parent component
* The example: to code a todo list , with store like this:
	{
		//The todo list objects
		todos	: {
			byIds	: {
				idA	: {
					id	: '',
					content	: '',
					createdTime	: '',
					status	: 0,
					},
				idB	: {
					id	: '',
					content	: '',
					createdTime	: '',
					status	: 1,
					},
			},
			ids	: ['idA','idB'],
		},
		//The todo what is editing currently 
		currentTodo	: 'idA',
		search	: {
			keywords	: 'test',
			status	: -1,
		}
		setting	: {
			//0	: for list; 1 : for column;
			displayMode	: 0,
			//If auto search the todo, if true, when input keyword, the result changed immediately , if not , must press 'return' to search
			autoSearch	: true,
		}
	}

		



