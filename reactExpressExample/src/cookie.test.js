/* Demo the cookie : test/jest request with cookie ,and express receive cookie */
/* Demo the debug for express:
 * 		1. Set the env : DEBUG=express:*  npm test 
 * 		2. Wrap the app, like below, createServer
 * 		3. Use chrome debugger: npm run testDebug
 * 		4. Using morgan
 *
 * Demo usage of axios
 * Demo usage of fetch
 *
 *
 * Problem : the express can not print raw http request & response
 *
 * */
import 'whatwg-fetch'
const express		= require('express')
const cookieParser	= require('cookie-parser')
const axios			= require('axios')
/* Demo , express log function, it works, and a little helpful */
const morgan		= require('morgan')

let host

beforeAll(() => {
	const app	= express()
	
	app.use(morgan('combined',{
	}))

	app.use(function(req,res,next){
		next()
	})

	app.use(function(req, res, next) {
		/* Demo: with this config, the cookie will be OK */
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.setHeader("Access-Control-Allow-Credentials", true);
		next();
	});
	

	app.use(cookieParser())
	app.get('/index',(req,res) => {
		console.log(req.headers)
		/* Demo : to set cookie to client/browser */
		res.append('Set-Cookie','foo=bar2;HttpOnly;')
		/* Demo : to get the cookie from client/browser,it works!!! */
		console.log('Req.cookie:',req.cookies) 
		res.send('OK!') 	
	},function(err,req,res,next){
		console.error('Express error:',err)
		next(err)
	})


	app.use(function (err, req, res, next) {
		console.error('Express error 2:',err)
		next(err)
	})

	/* To demo the monitor of http request, print the raw request data */
	var http = require('http');
	function logerror(err){
		console.error('XXXXXXXX',err.stack || err.toString())
	}

	host = http.createServer(function(req,res){
		app(req,res)
		/* Demo the debug: here the monitor the req,res object, print the status */
		console.log('LAST 2 req:',req && req.headers,'LAST 2 res:',res && res.statusCode)
	});

	host.listen(3008);

	return new Promise((resolve,reject) => {
		setTimeout(() => resolve(),2000)})
})

afterAll(() => {
	host.close()
})

describe('TestCookie',() => {

	it('TestWithFetch',async () => {
		console.log('Waiting...')

		const URL	= 'http://127.0.0.1:3008'
		let res		= await fetch(`${URL}/index`,{
			credentials		: 'include',
		})
		console.log('Res of cookie:',res.status)
		

		/* The second request will bring the cookie to server */
		res			= await fetch(`${URL}/index`,{
			credentials		: 'include',
		})
		console.log('Res of cookie:',res.status)

	},)


	it.skip('TestWithAxios',async () => {
		try{
			const URL	= 'http://127.0.0.1:3008'
			//let res		= await axios.get('http://127.0.0.1:3008/index')
			let res			= await axios.get(`${URL}/index`,{
				withCredentials	: true,
			})
			console.log('Res:',res.status)
			res		= await axios.get(`${URL}/index`,{
				withCredentials	: true,
			})
			console.log('Res:',res.status)
		}catch(e){
			console.error('e:',e)
		}
	})

})
