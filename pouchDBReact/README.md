The PouchDB + react example

To demo :
* the basic usage of PouchDB
* the complicated query
* the performance test

The problem:
NOTE create-react-app no need to install jest any more ( npm install jest), if did it ,the npm test will throw error:
environment.dispose is not a function
To resolve this problem : 
* npm uninstall jest
* npm install --save-dev jest-cli



The plan:

* How to make a complicated DB with 'tables' and 'index' , just like Logger project.
	* Tags,logs,config,attachments in a single DB , is that possible ? Or need to split to multi-DB?
	* Demo : dump in a lot of data , with different types(tags,logs) , then query it by different way 
	* Demonstrate the full-text search!



* Demonstrate a DB : the DB for Logger's user -> user info / register / account for bill 

The change log:
* create-react-app pouchDBReact

* install pouchdb
	* npm install --save pouchdb
	* npm install pouchdb-quick-search

* Problem : can not support the Chinese full-text , just English is OK

* Problem : because the tag uuid ID will be split when full-text index : 'a-b-c' will index: a,b,c not a-b-c, so is impossible to index tag ID directly !
