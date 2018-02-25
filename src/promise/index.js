/* example Promise use */


/* basic use of Promise */
new Promise((resolve,reject) => {
	console.log('constructed a promise!')
	setTimeout(() =>{
		resolve('OK!')
	},1000)
})
.then(result => {
	console.log('resolve a promise:%s',result)
})

/* example for: catch exception throw by promise constructor(like : a async operation failure ,like AJAX )*/
new Promise((resolve,reject) => {
	console.log('construct a promise...')
	//TODO why can not use setTimeout
	//setTimeout(() => {
		throw new Error('async operation failure!')
	//},1000)
})
.then(() => {
	//never happen
	console.log('happen?wrong!!!')
})
.catch(e => {
	console.warn('execute promise failure! catch it')
})

/* example for : catch exception during 'then', and then continue */
new Promise((resolve,reject) => {
	console.log('contructed a promise!')
	resolve()
})
.then(() => {
	console.log('to execute then...')
	//TODO
	//setTimeout(() => {
		throw new Error('async then operation failure!')
	//},1000)
})
.catch(e => {
	console.warn('execute then failure! catch it')
})
.then(() => {
	console.log('after catch,continue to execute')
})

/* example for : array promise sequence */
Array.from(new Array(10)).map((e,i) => i)
.reduce((a,c) => {
	console.log('deal with element:%d',c)
	return a.then(() => {
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				console.log('resolve sequence element:%d',c)
				resolve()
			},1000)
		})
	})
},Promise.resolve())

/* example for array promise parallel */
Promise.all(
	Array.from(new Array(10)).map((e,i) => i)
	.map(e => 
		new Promise((r,j) => {
			setTimeout(() => {
				console.log('resolve parallel element :%d',e)
				r()
			},1000)
		}))
)

/* example error catch */
const label  = 'CC'
new Promise((resolve,reject) =>{
	console.log(label,'constructed a promise!')
	resolve()
})
.then(() => {
	console.log(label,'execute then 1 ...')
	//throw new Error('throw error from 1')
})
.then(() => {
	console.log(label,'execute then 2 ...')
	//throw new Error('throw error from 2')
})
.then(() => {
	console.log(label,',execute then 3 ...')
	throw new Error('throw from 3')
},(e) => {
	console.log(label,'catch the error in 3 !',e.toString())
})
.catch(e => {
	console.log(label,'the finall catch',e.toString())
})
