/* to test the pouchDB, by now , the problem is : pouchDB on levelUp/node , can not init DB correctly */
import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'

it('init db',done => {
	const DB = new PouchDB('testDB')
	console.log('the db:',DB)
	done()
})
