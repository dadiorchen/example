/* Test for node.js child_process module */


describe('TestChildProcess',() => {
	
	/* Test spawn , execute : ls -l , and get the result */
	it('TestChildProcess',done => {
		const ls = 	require('child_process').spawn('ls',['-l'])
		ls.stdout.on('data',data => {
			console.log(data.toString())
		})

		ls.on('close',() => {
			console.log('quit!')
			done()
		})

	})

	it('TestEcho',done => {
		const echo = require('child_process').spawn('echo',['test'])
		echo.stdout.on('data',data => {
			console.log(data.toString())
			expect(data.toString().trim()).toBe('test')
		})

		echo.on('close',() => {
			console.log('quit!')
			done()
		})
	})

	/* To test a long term command, get the output , and kill it then*/
	it('TestStdoutStream',done => {
		const ping = require('child_process').spawn('ping',['127.0.0.1'])
		ping.stdout.on('data',data => {
			console.log(data.toString())
			//expect(data.toString().trim()).toBe('test')
		})

		ping.on('close',() => {
			console.log('quit!')
			done()
		})

		setTimeout(() => {
			ping.kill()
		},1000*2)
	},1000*10)

	it('TestStdoutPipe',done => {
		const ping = require('child_process').spawn('ping',['127.0.0.1'],{
			stdio	: [
				0,
				'pipe',
				'pipe']
		})
		ping.stdout.on('data',data => {
			console.log('pipe',data.toString())
			//expect(data.toString().trim()).toBe('test')
		})

		ping.on('close',() => {
			console.log('quit!')
			done()
		})

		setTimeout(() => {
			ping.kill()
		},1000*2)
	},1000*10)

	it('TestStdoutToFile',done => {
		const fs = require('fs')
		const ping = require('child_process').spawn('ping',['127.0.0.1'],{
			stdio	: [
				0,
				fs.openSync('/tmp/TestStdoutToFile.stdout.log','w'),
				fs.openSync('/tmp/TestStdoutToFile.stderr.log','w'),
				]
		})

		ping.on('close',() => {
			console.log('quit!')
			done()
		})

		setTimeout(() => {
			ping.kill()
		},1000*2)
	},1000*10)

	it('TestExit',done => {
		const exit = require('child_process').exec('echo 1;exit 1')
		exit.on('exit',(code,signal) => {
			console.log('Exit code:',code,'signal:',signal)
			done()
		})
	})

	it('TestError',done => {
		const p = require('child_process').exec('sdsssxxx',(error,stdout,stderr) => {
			console.log('error:',error,'\nstdout:',stdout,'\nstderr:',stderr)
			if(error) done()
		})
	})
})
