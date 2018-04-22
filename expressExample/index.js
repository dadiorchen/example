const express = require('express')
const app = express()


/* Set up the tatic file */
app.use('/static',
	express.static('static'),
	/* Using a middleware to deal with the 404 */
	(req,res) => {
	res.send('CAN NOT FOUND THE FILE , THIS IS A 404 PAGE!')
})

/* Demo the get with route to root(/) */
app.get('/',(req,res) => res.send('Hello Express World!'))

/* Demo the POST method */
app.post('/',(req,res) => {
	res.send('POST request!')
})

/* Demo the route path 
 * Should match:
 *	/abcdefgh
 *	/abdefgh
 *	/abcdddefgh
 *	/abcdh
 * */
app.get('/abc?d+e*(fg)?h$',(req,res) => res.send('OK'))

/* Demo the route parameter */
app.get('/users/:userId',(req,res) => {
	console.log('get parameter:',req.params)
	if(req.params.userId && req.params.userId === '100'){
		res.send('OK')
	}else{
		throw 5000
	}
})

/* Demo the route chain (handle) */
app.get('/user/pass',(req,res,next) => {
	//Simulate check 
	console.log('Check user OK')
	next()
},(req,res) => {
	res.send('OK')
})
app.get('/user/deny',(req,res,next) => {
	console.log('Check user deny!')
	if(true){
		throw 'User Check Deny'
	}else{
		next()
	}
},(req,res) => {
	res.send('OK')
})

/* Demo the response  */
app.get('/response',(req,res) => {
	//res.send('OK')
//	res.jsonp({
//		user	: 'my',
//		id	: 'xxx',
//	})
	//res.redirect(301,'www.baidu.com')
	res.sendStatus(403)
})

/* Demo router chain */
app.route('/account/:userId')
	.get((req,res) => {
		console.log('get user:',req.params.userId)
		res.send('OK')
	})
	.post((req,res) => {
		console.log('add user:',req.params)
		res.send('OK')
	})
	.put((req,res) => {
		console.log('modify user:',req.params)
		res.send('OK')
	})
	.delete((req,res) => {
		console.log('delete user:',req.params)
		res.send('OK')
	})

/* To demo a module, that means , a sub-domain in path : /help/about */
const helpModule = express.Router()

helpModule.get('/',(req,res) => {
	res.send('This is help index')
})
helpModule.get('/about',(req,res) => {
	res.send('This is help about')
})
app.use('/help',helpModule)

/* To demo the usage of middleware */
app.get('/middle/:id',(req,res,next) => {
	console.log('In middle step 1')
	if(req.params.id === '0'){
		next('route')
	}else{
		next()
	}
},(req,res,next) => {
	res.send('regular')
})

app.get('/middle/:id',(req,res,next) => {
	//res.send('sepcial')
	res.sendStatus(401)
})

/* To demo the error handle and 用户登录状态监控 */
{
	const router = express.Router()

	/* To 拦截 request ,and check the login status , then decide to continue , or jump to next router(401) */
	router.use((req,res,next) => {
		//Check login
		console.log('user check,the query:',req.query)
		if(req.query.login){
			next()
		}else{
			next('router')
		}
	})

	router.get('/add',(req,res) => {
		console.log('login action')
		res.send('OK,admin')
	})

	router.get('/modify',(req,res) => {
		console.log('login action')
		res.send('OK,admin!')
	})

	/* To demo the error , when meet a error , jump to error handle by next(some thing ) */
	router.get('/error',(req,res,next) => {
		next(new Error('This is a error'))
	})

	app.use('/admin',router,
	/* This is the NEXT router, which is used to inform user the request was deny */
	(req,res) => {
		console.warn('NO LOGIN!')
		res.sendStatus(401)
	},
	/* This is the error handle , must have 4 parameters */
	(err,req,res,next) => {
		console.warn('This is error:',err.toString())
		res.sendStatus(501)
		res.send("Yes , this is error")
	})
}

/* The template engine */
var fs = require('fs')
app.engine('jssp',function(filePath,options,callback){
	console.log('Deal with the jssp:',filePath)
	fs.readFile(filePath,function(err,content){
		if(err){
			console.warn('Get error when fetch file:',err.toString())
			return callback(err)
		}

		var rendered = content.toString()
		console.log('The options:',options)
		for(let key in options.data){
			const keyInJssp = '${' + key + '}'
			const value = options.data[key]
			console.log('key:',key,'value:',value)
			rendered = rendered.replace(keyInJssp,value)
		}
		return callback(null,rendered)
	})
})

app.set('views','./views')
app.set('view engine','jssp')
app.get('/engine',function(req,res){
	console.log('Handle engine:')
	res.render('index',{
		data	: {
			title	: 'Page title',
			content	: 'This is content',
		},
	})
})

/* The body parser */
//var bodyParser = require('body-parse')
app.post('/parser',express.json(),function(req,res){
	console.log('req body:',req.body)
	res.send('OK')
	res.sendStatus(200)
})

/* Demo the filter(like spring interceptor,its useful to do some filter function ,like authorization check  */
app.all('/filter/*',(req,res,next) => {
	console.log('THIS IS A FILTER...')
	next()
})
app.get('/filter/a',(req,res) => {
	res.send('OK')
})
app.get('/filter/b',(req,res) => {
	res.send('OK')
})

/* Demo the path parameter handle for RESTful URL : /user/:userId/name */
/* So it is useful to load data to request */
{
	var router = express.Router()
	router.param('userId',function(req,res,next,userId){
		console.log('Deal with the parameter userId: ',userId)
		/* Simulate to load the user by id */
		const user = {
			id	: userId,
			name	: 'me',
		}
		req.user = user
		next()
	})

	router.get('/user/:userId/name',function(req,res){
		console.log('Response for parameter:',req.params.userId)
		/* Load user from REQ */
		const {user} = req
		console.log('Load user from request :',user)
		res.send(user.name)
	})

	app.use('/parameter',router)
}

/* Demo the request object usage, discovery the properties of request , like : request.params  */
{
	const router = express.Router()
	
	router.get('/test',(req,res) => {
		/* Demo req.app */
		console.log('The req.baseUrl:',req.baseUrl)
		/* The req bashUrl is the router path position */
		if(req.baseUrl !== '/request') throw new Error()
		
		/* Demo the fresh */
		if(req.fresh) throw new Error()
		console.log('The req.fresh:',req.fresh)

		/* Demo the hostname */
		console.log('The hostname:',req.hostname)
		if(req.hostname !== 'localhost') throw new Error()

		/* Demo the IP */
		console.log('The ip:',req.ip)
		if(req.ip.indexOf('127.0.0.1')< 0 ) throw new Error()

		console.log('The ips:',req.ips)

		/* Demo the originalUrl */
		console.log('The original url:',req.originalUrl)
		if(req.originalUrl !== '/request/test') throw new Error()
		console.log('The params:',req.params)

		/* Demo the path */
		console.log('The path : ',req.path)
		if(req.path !== '/test') throw new Error()
		
		/* Demo the protocol */
		console.log('The protocol :', req.protocol)
		if(req.protocol !== 'http') throw new Error()
		res.send('OK')
	})

	router.get('/b' , (req,res) => {
		console.log('The query:',req.query)
		/* Demo the query parameter */
		if(req.query.id !== '1') throw new Error()
		
		/* Demo the request.route */
		console.log('The route : ',req.route)
		if(req.route.path !== '/b' ) throw new Error()

		console.log('The secure :', req.secure)
		if(req.secure) throw new Error()

		console.log('The subdomain :', req.subdomains)

		console.log('The xhr:',req.xhr)

		console.log('The accept html:',req.accepts(['json','html',]))

		console.log('The get header:',req.get('Accept'))

		/* Demo the is function, but TODO the result is not boolean type ,here is null*/
		console.log('The is(html):',req.is('html'))


		//TODO ?? What's this ?
		console.log('The range :',req.range(1000))

		res.send('OK')
	})
	app.use('/request',router)
}

/* Demo the things related to response */
{
	const router = express.Router()
	router.get('/test',(req,res) => {
		res.send('OK')
	})

	router.get('/json',(req,res) => {
		res.json({
			id	: '1',
			name	: 'me',
		})
	})

	router.get('/redirect',(req,res) => {
		res.redirect('http://www.baidu.com')
		console.log('REDIRECT')
	})

	/* 注意这个路径包含了上面那个路径,但是实际上不会执行上面那个匹配,而是直接到这里*/
	router.get('/redirect/permanent',(req,res) => {
		res.redirect(301,'http://www.sohu.com')
	})

	router.get('/status',(req,res) => {
		res.sendStatus(500)
	})

	router.get('/status/b',(req,res) => {
		/* res.status just set the status code , do not write content , its different from res.sendStatus()*/
		res.status(500)
		res.end()
	})
	
	app.use('/response',router)
}

/* Demo the router */
{
	var router = express.Router()

	/* This well be invoke for every request in this router */
	router.use((req,res,next) => {
		console.log('THIS IS LOG',new Date())
		next()
	})
	
	router.route('/account/:accountId')
		.get((req,res) => {
			res.send({
				id	: '1',
				name	: 'deanchen'
			})
		})
		.delete((req,res) => {
			res.send('OK')
		})

	app.use('/accounts',router)
}

let theServer

const server = {
	start	: () =>{
		console.log('to start the server...')
		theServer = app.listen(3001,() => {
			console.log('My first express running ...')
		})
		//console.log('the server:',theServer)
	},
	stop	: async () =>{
		console.warn('to close the server...')
		/* Using async to wait the quit of server */
		await new Promise((resolve,reject) => {
			theServer.close(() => {
				console.log('The server closed!')
				resolve()
			})
		})
	},
	
}




export {server}
