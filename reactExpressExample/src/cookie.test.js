/* Demo the cookie : test/jest request with cookie ,and express receive cookie */
const express		= require('express')
const cookieParser	= require('cookie-parser')
const axios			= require('axios')

beforeAll(() => {
	const app	= express()
	app.get('/index',(req,res) => {
		res.send('OK')
	})

	/* Demo the cookie */
	{
		var router	= express.Router()

		router.use(cookieParser())
		router.get('/index',(req,res) => {
			console.log('req.cookie:',req.cookie)
			res.send('OK')
		})
		app.use('/cookie',router)
	}

	app.listen(3008,() => {
		console.log('Started')
	})
})

describe('TestCookie',() => {
//	it('TestCookie',async () => {
//		try{
//			let res		= await fetch('http://127.0.0.1:3008/index')
//			console.log('Res:',res.status)
//			let text	= await res.blob()
//			console.log('text:',text)
//			
//		}catch(e){
//			console.error('Catch : ',e)
//		}
//	})
	
	it('Test',async () => {
		let res		= await axios.get('http://127.0.0.1:3008/index')
		console.log('Res:',res)
	})

})
