//@flow
/* The model of Todo */
export default class Todo {
	id		: string
	content	: string
	createdTime	: number
	status	: number
	constructor(){
		this.id	= Math.round(Math.random()*10000) + ''
		this.content	= ''
		this.createdTime	= Date.now()
		this.status	= 0
	}
}

