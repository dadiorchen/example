import {API,APIA} from './API.js'

export class Model {
	constructor(props){
	}

	get(){
		//console.log('API in model:',API)
		//console.log('APIA in model:',APIA)
		const api = new API()
		console.log('api:',api)
		return api.request()
	}

	getA(){
		return APIA.request()
	}
}
