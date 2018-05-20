/* Test CouchDB */

/* Using node-fetch , this will not cause the CouchDB throw CORS problem ,
 * maybe its because the client is not browser ( not like whatwg-fetch)
 * */
//const fetch = require('node-fetch')
/* Using browser-like fetch */
import 'whatwg-fetch'
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


afterAll(async () => {
	//wait a while , wait the console to print CouchDB log...
	console.log('Wait to close CouchDB')
	await new Promise((r,j) => setTimeout(() =>r(),1000))
	console.log('To close CouchDB...')
	CouchDBProcess.stop()
	//wait .5 sec
	await new Promise((resolve,reject) =>{
		setTimeout(() => {
			console.log('CouchDB closed!')
			resolve()
		},500)
	})
})





describe('TestCouchDB',() => {
	it('TestCouchDBRootInfo',async () => {
		/* Get the info of the CouchDB */
		/* ENV: 
		 * 	* test package.json: jest --env=jsdom
		 * 	* using : import 'whatwg-fetch'
		 *
		//Problem: CouchDB response CORS error, not work! jsdom + watch-fetch can not fix the problem of cors 
		/* Now , its works! How to ?
		 *  1. Go to the config dir of CouchDB: /path/to/install/CouchDB/ + /etc/default.ini
		 *  2. Change : enable_cors = true
		 *  3. Change : [cors]
		 *  			credentials	= true
		 *  			origin	= * 
		 *  4. Done!
		 * */
		const res = await fetch(`${URL}`,)
		expect(res.status).toBe(200)
		const json = await res.json()
		console.log('Response json from CouchDB:',json)
		expect(json.couchdb).toBe('Welcome')
	})

	it('TestConfig',async () => {
		/* NOTE, Its hard !!! Blame the doc of CouchDB ,
		 * I don't known how to write the URL to get config ,
		 * till google it 
		 * The answer is : couchdb@127.0.0.1 !!!*/
		const res	= await fetch(`${URL}/_node/couchdb@127.0.0.1/_config`,{
			headers	: {
				/* The way to authorization on CouchDB */
				Authorization,
			},
		})
		let json	= await res.json()
		console.log('Res of config:',json)
		expect(res.status).toBe(200)
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

	/* Demo the usage of cookie authentication */
	it('TestCookie',async () => {
		let res		= await fetch(`${URL}/_session`,{
			method	: 'POST',
			/* Must set this , to ensure the cookie was set when response come , 
			 * or, the next request of fetch will have not authentication */
			credentials	: 'include',
			body	: JSON.stringify({
				name	: 'admin',
				password	: 'admin',
			}),
			headers	: {
				'Content-Type'	: 'application/json',
			},
		})
		console.log('The key:',[...res.headers.keys()])

		let json	= await res.json()
		console.log('The res json of stats:',json)
		expect(res.status).toBe(200)

		res		= await fetch(`${URL}/_session`,{
			method	: 'GET',
			credentials	: 'include',
		})
		json	= await res.json()
		console.log('The res json of _session get:',json)


		/* Now , the authentication of cookie will PASS */
		res	= await fetch(`${URL}/_node/couchdb@127.0.0.1/_config`,{
			credentials	: 'include',
			headers	: {
				/* The way to authorization on CouchDB */
				//Authorization,
			},
		})
		json	= await res.json()
		console.log('Res of config:',json)
		expect(res.status).toBe(200)
	})
	
	/* To demo user create/login/check/change password */
	it.only('TestUser',async () => {
		/* To demo user create */
		let res		= await fetch(`${URL}/_users/org.couchdb.user:oliver`,{
			method	: 'PUT',
			body	: JSON.stringify({
				name	: 'oliver',
				password	: 'goodgood',
				roles	: [],
				type	: 'user',
			}),
			headers	: new Headers({
				'Content-Type'	: 'application/json',
			}),
		})
		let json	= await res.json()
		console.log('Res of user put:',json)

		/* TO login */
//		res		= await fetch(`${URL}/_session`,{
//			method	: 'POST',
//			credentials	: 'include',
//			body	: JSON.stringify({
//				name	: 'oliver',
//				password	: 'goodgood',
//			}),
//			headers	: {
//				'Content-Type'	: 'application/json',
//			},
//		})
//		json	= await res.json()
//		console.log('Res of user login:',json)
		res		= await fetch(`${URL}/_session`,{
			method	: 'POST',
			credentials	: 'include',
			body	: JSON.stringify({
				name	: 'admin',
				password	: 'admin',
			}),
			headers	: {
				'Content-Type'	: 'application/json',
			}
		})
		json	= await res.json()
		console.log('Res of login:',json)

		/* To get user info */
		res		= await fetch(`${URL}/_users/org.couchdb.user:oliver`,{
			/* Note,need authentication */
			credentials	: 'include',
		})
		json	= await res.json()
		let rev	= json._rev
		console.log('Rev:',rev)
		/* TODO Why can not found the user?*/
		console.log('Res of user :',res.status)
		console.log('Res of user info:',json)

		/* TO change the password */
		res		= await fetch(`${URL}/_users/org.couchdb.user:oliver`,{
			method	: 'PUT',
			credentials	: 'include',
			body	: JSON.stringify({
				name	: 'oliver',
				roles	: [],
				type	: 'user',
				password	: 'goodgood',
			}),
			headers	: new Headers({
				'If-Match'	: rev,
			}),
		})
		json	= await res.json()
		console.log('Res of change password:',res.status)
		console.log('Res of change password:',json)




	})
	/* Great! The PouchDB can operate CouchDB directly , 
	 * so , I can just use PouchDB API to operate BOTH local PouchDB and remote CoudhDB */
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
