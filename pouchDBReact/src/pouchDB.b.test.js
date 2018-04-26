/* This test demo:
 * 		* before all test, setup a database: test_db
 * 		* after all test, delete the test_db
 */
const PouchDB	= require('pouchdb')
const testDBName	= 'test_db'
/* The PouchDB refer */
let testDB

beforeAll(() => {
	testDB	= new PouchDB(testDBName)
})


afterAll(async () => {
	/* delete the db */
	if(!testDB){
		console.error('The testDB refer is corrupt!')
	}else{
		const res = await testDB.destroy()
		if(res && res.ok && res.ok === true){
			console.log('TestDB deleted!')
		}else{
			console.error('Delete TestDB failured!:',res)
		}
	}
})


describe('TestPouchDBB',() => {
	it('TestTestDB',async () => {
		let res	= await testDB.post({
			name	: 'me'
		})
		console.log('Res of post:',res)
		expect(res.ok).toBe(true)
		
		res	= await testDB.get(res.id)
		console.log('Res of get:',res)
		expect(res.name).toBe('me')
	})

	it('TestMapReduce',async () => {
		PouchDB.debug.enable('*')
		const ddoc	= {
			_id		: '_design/index',
			views	: {
				index	: {
					map	: function mapFun(doc) {
						if(doc.title){
							emit(doc.title)
						}
					}.toString(),
					reduce	: '_count',
				},
			}
		}
		
		let res	= await testDB.put(ddoc)
		console.log('Res of put ddoc:',res)

		res	= await testDB.get(res.id)
		console.log('Res of get ddoc:',res)

		//dump in data
		await testDB.post({
			title	: 'beijing',
			name	: 'me',
		})

		await testDB.post({
			title	: 'xian',
			name	: 'wang',
		})

		await testDB.post({
			title	: 'xian',
			name	: 'chen',
		})

		res	= await testDB.query('index',{
			key		: 'xian',
			reduce	: true,
			include_docs	: false,
		})

		console.log('Res of query:',res,'doc:',res && res.rows && res.rows[0].doc)
	})
})
