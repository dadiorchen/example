/* Test CouchDB */
const fetch = require('node-fetch')
const {CouchDBProcess} = require('./CouchDBProcess.js')
const URL = 'http://127.0.0.1:5984'
const user	= 'admin'
const password	= 'admin'
const btoa	= require('btoa')
const Authorization	=  'Basic ' + btoa(user + ':' + password)

beforeAll(() => {
	//start the process of coudhDB ,and wait a while to let it up 
	console.log('To start CouchDB')
	CouchDBProcess.restart()
	
	//wait 2 sec
	return new Promise((resolve,reject) =>{
		setTimeout(() => {
			console.log('CouchDB started!')
			resolve()
		},2000)
	})
})


afterAll(() => {
	console.log('To close CouchDB...')
	CouchDBProcess.stop()
	//wait .5 sec
	return new Promise((resolve,reject) =>{
		setTimeout(() => {
			console.log('CouchDB closed!')
			resolve()
		},500)
	})
})





describe('TestCouchDB',() => {
	it('TestCouchDBRootInfo',async () => {
		/* Get the info of the CouchDB */
		const res = await fetch(`${URL}`)
		expect(res.status).toBe(200)
		const json = await res.json()
		console.log('Response json from CouchDB:',json)
		expect(json.couchdb).toBe('Welcome')
	})

	it('TestCouchDBAll',async () => {
		const res = await fetch(`${URL}/_all_dbs`)
		expect(res.status).toBe(200)
		const json	= await res.json()
		console.log('Response json:',json)
	})

	it('TestActiveTasks',async () => {
		const res	= await fetch(`${URL}/_active_tasks`)
		expect(res.status).toBe(200)
		const json	= await res.json()
		console.log('Response json of active tasks:',json)
	})

	//TODO Why the _stats do not works 
//	it('TestStats',async () => {
//		const res = await fetch(`${URL}/_stats/httpd_request_methods`)
//		expect(res.status).toBe(200)
//		const json	= await res.json()
//		consoe.log('_stats:',json)
//	})
	
	it('TestDB',async () => {
		const DB = 'jest'

		/* Delete DB anyway */
		let res	= await fetch(`${URL}/${DB}`,{
			method	: 'DELETE',
			headers	: {
				/* The way to authorization on CouchDB */
				Authorization,
			},
		})
		let json	= await res.json()
		console.log('Delete DB:',json)

		/* Check the existence of DB */
		res = await fetch(`${URL}/{DB}`,
			{
				method	: 'HEAD',
			})
		expect(res.status).toBe(404)

		res	= await fetch(`${URL}/${DB}`,{
			method	: 'PUT',
			headers	: {
				/* The way to authorization on CouchDB */
				Authorization,
			},
		})
		json	= await res.json()
		console.log('Put DB:',json)
		expect(res.status).toBe(201)

		/* Post document to db */
		res	= await fetch(`${URL}/${DB}`,{
			method	: 'POST',
			body	: JSON.stringify({
				name	: 'me',
			}),
			headers	: {
				'Content-Type'	: 'application/json',
			},
		})
		json	= await res.json()
		console.log('Post doc res:',json)

		/* Stats it */
		res	= await fetch(`${URL}/_stats/httpd_request_methods`,{
			method	: 'GET',
			headers	: {
				/* The way to authorization on CouchDB */
				Authorization,
			},
		})
		console.log('The res status of stats:',res.status)
		json	= await res.json()
		console.log('The res json of stats:',json)
	})
	

	/* Great! The PouchDB can operate CouchDB directly , so , I can just use PouchDB API to operate BOTH local PouchDB and remote CoudhDB */
	it('TestPouchDBAPI',async () => {
		const dbName	= 'test_pouchdb'
		const PouchDB	= require('pouchdb')
		//PouchDB.debug.enable('*')
		const db	= new PouchDB(`${URL}/${dbName}`,{
			auth	: {
				username	: 'admin',
				password	: 'admin',
			},
		})
		const res	= await db.post({
			name	: 'yes',
		})
		console.log('The res of put:',res)
	})

})
