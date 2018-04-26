/* To test the fetch in jest test file */
let server
const URL = 'http://localhost:3003'

beforeAll(() => {
	const express = require('express')
	const app = express()
	
	/* To fix the problem : fetch throw error because the cross domain problem */
	/* NOTE , the jest test run with jsdom env , so it is a simulated browser env */
	app.use(function(req, res, next) {
		  res.header("Access-Control-Allow-Origin", "*");
		  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		//To display the content type
		console.log('The content type:',req.get('Content-Type'))
		  next();
	});


	app.get('/user/1',(req,res) => {
		res.send('OK')
	})

	app.post('/json',express.json(),(req,res) => {
		console.log('Get json from browser:',req.body)
		res.send('OK')
	})

	app.get('/query',(req,res) => {
		console.log('Query from browser:',req.query)
		res.send('OK')
	})

	/* Demo , the way to handle upload */
	const busboy	= require('connect-busboy')
	app.use(busboy())
	app.post('/file',(req,res) => {
		if(req.busboy){
			console.info('This is busboy...')
			req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
				console.info('FILE:',fieldname,file,filename,encoding,mimetype)
				file.on('data',chunk => {
					console.log('file data:%s',chunk)
					res.send(chunk.toString())
				})
			});
			req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
				console.info('FIELD:',key,value,keyTruncated,valueTruncated)
			});
			req.pipe(req.busboy);
		}
		//res.send('OK')
	})

	/* The why to handle form /multipart/form-data */
	const multer	= require('multer')
	const upload	= multer()
	app.post('/form',upload.fields([]),(req,res) => {
		console.log('The form data:',req.body)
		res.send('OK')
	})

	server = app.listen(3003,() => {
		console.log('Server Up!')
	})
})

afterAll(() => {
	console.log('Close server...')
	server.close()
})

describe('TestFetch',() => {
	it('TestFetch',done => {
		fetch('http://localhost:3003/user/1')
		.then(response => {
			console.log('Response:',response.status)
			done()
		}).catch(e => {
			console.log('Catch:',e)
			done.fail()
		})
	})


	it('TestFetchB',done => {
		const axios = require('axios')
		axios.get('http://localhost:3003/user/1')
		.then(response => {
			//console.log('Response!:',response)
			done()
		}).catch(e => {
			console.log('Catch:',e)
			done.fail()
		})
	})


	it('TestUploadJson',async () => {
		const data = {
			id	: '1',
			name	: 'me',
		}
		const res = await fetch(`${URL}/json`,{
			method	: 'POST',
			body	: JSON.stringify(data),
			/* NOTE , new Headers class to set the header */
			headers	: new Headers({
				'Content-Type'	: 'application/json',
			}),
		})
		expect(res.status).toBe(200)
	})


	it('TestQuery',async () => {
		/* The way to set query parameter */
		const querystring	= require('querystring')
		let res	= await fetch(`${URL}/query?${querystring.stringify({name:'me',id:'1'})}`,{
			method	: 'GET',
		})
		expect(res.ok).toBe(true)
	})

	it('TestUploadFile',async () =>{
		const file	= new File(['foo'],'foo.txt',{
			type	: 'text/plan',
		})
		console.log('File to upload:',file)
		const formData	= new FormData()
		formData.append('attachment',file)
		let res	= await fetch(`${URL}/file`,{
			method	: 'POST',
			body	: formData,})
		expect(res.status).toBe(200)
		console.log('Res text:',res.statusText)
		let text	= await res.text()
		console.log('Res text of file upload:',text)
		expect(text).toBe('foo')
	})

	it('TestForm',async () => {
		const formData		= new FormData()
		formData.append('id','1')
		formData.append('name','me')
		let res		= await fetch(`${URL}/form`,{
			method	: 'POST',
			body	: formData,})
		expect(res.status).toBe(200)
	})

})
