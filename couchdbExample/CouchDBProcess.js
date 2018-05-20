/* Invoke the shell script to restart the CouchDB */
const fs = require('fs')

/* The node child process for CouchDB */
let process

export const CouchDBProcess = {
	restart		: () => { 
		const child_process		= require('child_process')
		//	const result		= require('child_process').execSync('./couchdbRestart.sh',{
		//		timeout	: 5000})
		//	console.log('The result of shell script:',result)
		console.log('Begin to restart...')
		console.log('Check the CouchDB process...')
		let result		= child_process.execSync('ps -ef |grep beam.smp | grep -v grep | wc -l') 
		console.log('The count of CouchDB process:',result.toString())
		const count		= +result.toString()
		console.log('count:',count)
		if(count > 0){
			console.log('To kill the CouchDB process...')
			result		= child_process.execSync("ps -ef |grep beam.smp | grep -v grep |awk '{print $2}' | xargs kill -9 | sleep 1")
			console.log('The result of kill:',
				result.toString())
		}
		console.log('start CouchDB...')
		/* OK, This is great: the node will create a child process to run the coudhDB ,and , if the node process quit, then the couchDB process will quit too */
		//	child_process.exec('/Users/deanchen/soft/couchdb/bin/couchdb > /Users/deanchen/temp/couchdb.log',(error,stdout,stderr) => {
		//		if(error){
		//			console.error('Get error from exec:',error.toString())
		//		}
		//		console.log('Get stdout from exec:',stdout.toString())
		//		console.log('Get stderr from exec:',stderr.toString())
		//	})

		/* Create CouchDB database process, direct the output to log file */
		process		= child_process.spawn('/Users/deanchen/soft/couchdb/bin/couchdb',[],
			{
				//stdio	: 'pipe',//0,require('process').stdout,require('process').stderr]
				stdio	: [
					0,
					'pipe',
					'pipe',
					/* Can not use file to output log ! Don't known why , 
					 * just created the file , but with nothing in it */
//					fs.openSync('/tmp/couchdb.stdout.log','w'),
//					fs.openSync('/tmp/couchdb.stderr.log','w')
				]
			})

		/* Change to using onData to print the log of couchDB in the current stdout */
		process.stdout.on('data',data => {
			console.log('COUCHDB LOG:',data.toString())
		})

		process.stderr.on('data',data => {
			console.warn('COUCHDB ERR',data.toString())
		})
	},
	stop	: () => {
		console.log('Stop CouchDB...')
		process && process.kill()
	},
}
