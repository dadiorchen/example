/* to test the pouchDB, by now , the problem is : pouchDB on levelUp/node , can not init DB correctly */
import PouchDB from 'pouchdb'
import uuid from 'uuid/v1'

it('init db',done => {
	const DB = new PouchDB('testDB')
	PouchDB.plugin(require('pouchdb-quick-search'))
	console.log('the db:',DB)
	DB.info()
	.then(result => {
		console.log('the db info:',result)
	})
	//finally
	.then(() => {
		return DB.destroy()
	})
	.catch(e => {
		console.error('catch error:',e)
	})
	.then(result => {
		console.log('result of destroy:',result)
		done()
	})
})



it('full-text',done => {
	var pouch = new PouchDB('testDB');
	PouchDB.plugin(require('pouchdb-quick-search'))
	var doc = {_id: 'mydoc', title: "Guess who?", text: "It's-a me, Mario!"};

	pouch.put(doc).then(function () {
		return pouch.search({
			query: 'mario',
			fields: ['title', 'text'],
			include_docs: true,
			highlighting: true
		});
	}).then(function (res) {
		expect(res && res.rows && res.rows.length).toBeGreaterThan(0)
		console.log(res.rows[0].doc.text); // "It's-a me, Mario!"
		console.log(res.rows[0].highlighting); // {"text": "It's-a me, <strong>Mario</strong>!"}
	})
		.catch(e => {
			console.error('catch error:',e)
		})
	//finally
		.then(() => {
			return pouch.destroy()
		})
		.then(r => {
			console.log('destroy db:',r)
			done()
		})
})

/* just index some of the docs */
it('fullTextIndexSecificFields',done => {
	//{{{
	var pouch = new PouchDB('testDB');
	PouchDB.plugin(require('pouchdb-quick-search'))
	const docID = uuid()
	const tagIDA = uuid()
	const tagIDB = uuid()
	//try to search part of tag
	const tagIDBPart = tagIDB.slice(0,tagIDB.indexOf('-'))
	console.log('the tagIDB:',tagIDB,'part:',tagIDBPart)

	var doc = {
		_id		: uuid(), 
		content	: 'index this field : content',
		tags	: [tagIDA,tagIDB],
		text	: 'Do not index this field : text'
	};

	pouch
		.put(doc)
		.then(() => {
			//index first
			return pouch.search({
				fields	: ['content','tags'],
				build	: true,
			})
		})
		.then((info) => {
			console.log('the result of build:',info)
			//begin search
			return pouch.search({
				query: 'content',
				fields: ['content','tags'],
			});
		})
		.then(function (res) {
			//YES,found the logs by tag ID
			expect(res && res.rows && res.rows.length).toBeGreaterThan(0)
			//search tag ID
			return pouch.search({
				query	: tagIDB,
				fields	: ['content','tags'],
			})
		})
		.then(r => {
			expect(r && r.rows && r.rows.length).toBeGreaterThan(0)
			//search text field
			return pouch.search({
				query	: 'text',
				fields	: ['content','tags'],
			})
		})
		.then(r => {
			//Yes , the text can not be found
			expect(r && r.rows && r.rows.length).toBe(0)
			//part of tag id , should can not found
			return pouch.search({
				query	: tagIDBPart,
				fields	: ['content','tags'],
			})
		}).then(r => {
			//NOTE This is not what I expect, so , there is a problem : full-text will search the part of tag ID, then: I can not use full-text to index the tagID!
			console.warn('not expected')
			expect(r && r.rows && r.rows.length).toBe(1)
		}).then(() => {
			done()
		})
		.catch(e => {
			console.error('catch error:',e)
			done.fail()
		})
		.then(() => {
			//finally
			return pouch.destroy()
		})
		.then(r => {
			console.log('destroy db:',r)
		})
	//}}}
})

/* test Chinese */
it('fullTextChinese',done => {
	//CLOSE
	console.warn('temporarily close the Chinese test!')
	done()
	return
	var pouch = new PouchDB('testDB');
	PouchDB.plugin(require('pouchdb-quick-search'))
	var doc = {
		_id		: uuid(), 
		content	: '这是一篇中文',
	}

	pouch
		.put(doc)
		.then(r => {
			console.log('put result:',r)
			return pouch.search({
				query	: '这是一篇中文',
				fields	: ['content'],
			})
		})
		.then(r => {
			//found!
			expect(r && r.rows && r.rows.length).toBeGreaterThan(0)
			console.log('the query result:',r)
			return pouch.search({
				query	: '赢',
				fields	: ['content'],
			})
		})
		.then(r => {
			//can not found
			expect(r && r.rows && r.rows.length).toBe(0)
		})
		.then(() => {
			done()
		})
		.catch(e => {
			console.error('catch the error :',e)
			done.fail()
		})
		.then(() => {
			return pouch.destroy()
		})
		.then(r => {
			console.log('the r:',r)
		})
})
