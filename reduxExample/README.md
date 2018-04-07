This project show the project:

What this demo about?
	* Using redux as model and 
	* React as component view, 
	* And use enzyme to test the component
		NOTE, the enzyme just test the component using shallow render , so , just test the component itself , not its descendant
		Using enzyme, to test the component which includes other connected component , its easy! Just test it , enzyme shallow will handle the it fine, see the ./src/component/Todos.test.js 
	* Sandbox: then, I will create a sandbox , by which, I can run a component in real browser , to test and try to demo it, to achieve this objective, I must decouple the component and its children/descendant component from the Redux, that is , the connected component . So , I must code a setting to dis-connect the component from its parent component

The store of redux in this project:
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

		
How to code with redux:

	* About the store:
		* The core store (combination) locate in ./src/model/state.js
		* And with a flow type definition at : ./src/model/TypeState.js

	* About the model:
		* All model place into the ./src/model/
		* The model structure :
			* Reducers
				* All the reducer
			* Actions 
				* All the action in this model, NOTE, the action name should include the model,for example: Model: TodoModel  Action: add a todo = todoAdd, and the reducer anem should be : TODO_ADD
					This is because 1. with the model name as domain name , the reducer will not to be duplicated, and 2. this is easy to bind it to component without confuse

	* 

Sandbox Usage:
	* The config : ./src/config.js 
		/* Here to change to true or false to switch the Sandbox */
		let SANDBOX = false
	* In the connected component :
		const CTodo = CONFIG.SANDBOX_RENDER('Todo') || connect(...)
	* Write the code in ./src/Sandbox.js 

How to copy custom-class object in reducer:
	const newTodo = Object.create(oldTodo)
	Object.assign(newTodo,oldTodo)


A BETTER way to write sandbox: 
	Using storybook! 
	* cd /path/to/project
	* >getstorybook
	* >npm run storybook
	* DONE
	* write component test !


