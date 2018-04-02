import {API,APIA} from './API.js'
import {LocalData} from './LocalData'
import fs from 'fs'

export class Model {
	constructor(props){
	}

	get(){
		//console.log('API in model:',API)
		//console.log('APIA in model:',APIA)
		const api = new API()
//		console.log('api:',api)
		return api.request()
	}

	getA(){
		return APIA.request()
	}

	getLogs(){
		return LocalData.getLogs()
	}

	getLogByName ( name ) {
		return LocalData.getLogByName(name)
	}

	getVimrc () {
		return fs.readFileSync('/Users/deanchen/.vimrc').toString()
	}
}
