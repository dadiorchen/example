import http from 'http'
const {server} = require('./index.js')

const URL = 'http://localhost:3001/'
const HOST	= 'localhost'
const PORT	= 3001

/* To test the express, before all test begin , start the server */
beforeAll(() => {
	server.start()
})

/* After all test , close the server */
afterAll(() => {
	server.stop()
})

describe('TestExpress',() => {
	it('TestExpress',done => {
		console.log('OK')
		const req = http.request(URL,res => {
			console.log('the response1:',res.statusCode)
			res.on('data',data => {
				console.log('response:',data.toString())
				expect(data.toString()).toBe('Hello Express World!')
			})
			res.on('end',() => {
				done()
			})
		})
		req.on('error',e => {
			console.log('req error:',e)
		})
		req.end()
	})

	it('TestPOST', done => {
		const options = {
			hostname	: HOST,
			port	: PORT,
			method	: 'POST',
		}
		const req = http.request(options,res => {
			res.on('data',data => {
				console.log('response:',data.toString())
				expect(data.toString()).toBe('POST request!')
			})
			res.on('end',e => {
				done()
			})
		})
		req.on('error',e => {
			console.error(e)
		})
		req.end()
	})


	const get = (path,parameters,method) => {
		return new Promise((resolve,reject) => {
			const options = {
				hostname	: HOST,
				port	: PORT,
				method	: method?method:'GET',
				path,
			}
			const req = http.request(options,res => {
				console.log('The status code:',res.statusCode)
				resolve(res)
			})
			req.on('error',e => {
				console.error(e)
				reject(e)
			})
			if(parameters){
				const querystring = require('querystring').stringify(parameters)
				console.log('to wite query string:',querystring)
				req.write(querystring)
			}
			req.end()
		})
	}

	const getBody = (path,parameters,method) => {
		return new Promise((resolve,reject) => {
			const headers = {}
			if(method === 'POST' && parameters){
				const querystring = JSON.stringify(parameters)
				console.log('to wite query string:',querystring)
				headers['Content-Type']	= 'application/json'
				headers['Content-Length']	= querystring.length
			}
			const options = {
				hostname	: HOST,
				port	: PORT,
				method	: method?method:'GET',
				path,
				headers,
			}
			const req = http.request(options,res => {
				let result
				console.log('The status code:',res.statusCode)
				res.on('data',data => {
					console.log('read data:',data.toString() && data.toString().length)
					console.log('read data:',data)
					result = data.toString()
				})
				res.on('end',() => {
					resolve(result)
				})
			})
			req.on('error',e => {
				console.error(e)
				reject(e)
			})
			if(parameters){
				const querystring = JSON.stringify(parameters)
				console.log('to wite query string:',querystring)
				req.write(querystring)
			}
			req.end()
		})
	}

	it('TestRoute',done => {
		get('/db')
		.then(res => {
			expect(res.statusCode).toBe(404)
			return get('/abcdefgh')
		})
		.then(res => {
			expect(res.statusCode).toBe(200)
			return get('/abdefgh')
		})
		.then(res => {
			expect(res.statusCode).toBe(200)
			return get('/abcdddefgh')
		})
		.then(res => {
			expect(res.statusCode).toBe(200)
			return get('/abcde24121h')
		}).then(res => {
			expect(res.statusCode).toBe(200)
		})
		.then(() => {
			done()
		})
	})

	it('TestParameter',done => {
		get('/users/100')
		.then(res => {
			expect(res.statusCode).toBe(200)
		})
		.then(() => {
			done()
		})
		.catch(e => {
			console.error('catch error:',e)
			done.fail()
		})
	})

	it('TestRouteChain',done => {
		get('/user/pass')
		.then(res => {
			expect(res.statusCode).toBe(200)
			return get('/user/deny')
		}).then(res => {
			expect(res.statusCode).toBe(500)
		}).then(() => {
			done()
		})
	})

	it('Test',done => {
		getBody('/response')
		.then(res => {
			console.log('the res:',res)
		})
		.then(() => {
			done()
		})
	})

	it('TestRouteChain',done  => {
		get('/account/1')
		.then(res => {
			return get('/account/2',{
				id	: '2',
				name	: 'ok',
			},'POST')
		}).then(() => {
			return get('/account/2',{
				id	: '2',
				name	: 'ok2',
			},'PUT')
		}).then(() => {
			return get('/account/2',undefined,'DELETE')
		}).then(() => {
			done()
		})
	})

	it('TestHelp',done => {
		getBody('/help')
		.then(res => {
			console.log('help:',res)
			return getBody('/help/about')
		}).then(res => {
			console.log('help:',res)
		}).then(() => {
			done()
		})
	})
			
	it('TestMiddle',done => {
		getBody('/middle/1')
		.then(res => {
			console.log('middle:',res)
			return getBody('/middle/0')
		}).then(res => {
			console.log('middel:',res)
		}).then(() => {
			done()
		})
	})

	it('TestLogin',done => {
		get('/admin/add')
		.then(res => {
			console.log('login:',res.statusCode)
			expect(res.statusCode).toBe(401)
			console.log('To request 2:')
			return get('/admin/add?login=true',)
		}).then(res => {
			console.log('login:',res.statusCode)
			expect(res.statusCode).toBe(200)
			return get('/admin/error?login=true')
		}).then(() => {
			done()
		})
	})

	it('TestTemplateJssp',async () => {
		const body = await getBody('/engine')
		console.log('The body of response:',body)
		expect(body.indexOf('This is content')).toBeGreaterThan(0)
	})

	/* To post a json to server , its useful for RESTful API */
	it('TestJsonParser',async () => {
		const r = await getBody('/parser',{
			id	: '1',
			name	: 'me',
		},'POST',)
		console.log('Result of parse json:',r)
	})

	it('TestStatic',async () => {
		let r = await getBody('/static/shoe.svg')
		console.log('Result of static file:',r && r.length)
		r = await getBody('/static/ssss.svg')
		console.log('Result of unexists static file:',r)
	})

	it('TestFilter',async () => {
		let r = await getBody('/filter/a')
		console.log('The result of filter:',r)
		r = await getBody('/filter/b')
		console.log('The result of filter:',r)
	})

	it('TestParamHandle',async () => {
		let r = await getBody('/parameter/user/1/name')
		console.log('The result of parameter handle : ',r)
	})

	it('TestRequest',async () => {
		let r = await getBody('/request/test')
		console.log('The result of request test:',r)
		expect(r).toBe('OK')
	})

	it('TestRequestB',async () => {
		let r = await getBody('/request/b?id=1&name=me')
		console.log('The result of request test b : ',r)
		expect(r).toBe('OK')
	})

	it('TestResponse',async () => {
		let r = await getBody('/response/test')
		console.log('The result of reponse test : ',r)
		expect(r).toBe('OK')

		r = await getBody('/response/json')
		const json = JSON.parse(r)
		console.log('The result of response json:',json)
		expect(json.id).toBe('1')

		r = await get('/response/redirect')
		console.log('The result status of response redirect:',r.statusCode)
		expect(r.statusCode).toBe(302)
		
		r = await getBody('/response/redirect/permanent')
		console.log('The result of reponse redirect permanent:',r)

		r = await getBody('/response/status')
		console.log('The result of response status:',r)
		expect(r).toBe('Internal Server Error')

		r = await getBody('/response/status/b')
		console.log('The result of response status:',r)
		expect(r).toBeUndefined()
	})

	it.only('TestRouter',async () => {
		let r = await getBody('/accounts/account/1')
		const json = JSON.parse(r)
		console.log('Result of account get:',json)
		expect(json.id).toBe('1')

	})


})
