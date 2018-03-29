it('array',() => {
	let a = [1,2,3]
	//pop
	console.log('array:',a)
	console.log('pop:',a.pop())
	console.log('shift:',a.shift())
	console.log('unshift:',a.unshift(1))
	console.log('array:',a)
	console.log('index of 2:',a.indexOf(2))
})

it('array constructor',() => {
	let a = new Array(3)
	console.log('array:',a)
	console.log('a[0]:',a[0])
	console.log('a[4]:',a[4])
})

it('arrayFrom: array.from',() => {
	const a = 'abc'
	console.log('string:',a)
	console.log('from:',Array.from(a))
	console.log('using from + new to create array sequence:',Array.from(new Array(10),(e,i) => i))
})

it('array.of',() => {
	console.log('Array.of(1,2,3,4):',Array.of(1,2,3,4))
	console.log('Array.of(',Array.of({a:1,b:2}))

})


it('array->concat',() => {
	console.log('concat:',[1].concat([2,3],[4,5],[5,6]))
})

it('array->every',() => {
	console.log([1,2,3,4].every(e => e > 0 ))
	const a = {
		limit	: 2
	}
	console.log([1,2,3,4].every(function(c){
		return c > this.limit
	},a))
})


it('array->copyWithin',() => {
	const a = [1,2,3,4,5,6]
	console.log('array:',a)
	a.copyWithin(0,3,5)
	console.log('array:',a)
	const b = [ 1,2,3,4,5,6]
	b.copyWithin(-3,-6,-4)
	console.log('array:',b)
})

it('array->fill',() => {
	const a = [1,2,3,4,5,6]
	console.log('array:',a)
	a.fill(1,2,4)
	console.log('array after fill:',a)
	console.log(Array(100).fill(1).join(','))

	console.log('to construct a array sequence %s',Array(100).fill().map((e,i) => i+1))

})


it('array->pop/push/shift',() => {
	const a = [1,2,3,4]
	console.log('array:',a)
	console.log('pop:',a.pop(),'array:',a)
	console.log('pop:',a.pop(),'array:',a)
	console.log('push:',a.push(-1),'array:',a)
	console.log('shift:',a.shift(),'array:',a)
})

it('array->reverse',() => {
	const a = [1,2,3,4]
	console.log('array:',a,'reverse:',a.reverse(),'original array:',a)
})

it('array->sort',() => {
	const a = [2,3,5,7,1,6,4]
	console.log('array:',a)
	console.log('sort ascend:',a.sort((a,b) => b - a))
	console.log('sort descend:',a.sort((a,b) => a - b))
})

it('array->splice',() => {
	var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
	var removed = myFish.splice(2, 1, 'drum')
	console.log('myFish:',myFish)
	console.log('removed:',removed)

	const c = ['1','2','3','4','5']
	console.log('array:',c)
	const d = c.splice(2,1,'9')
	console.log('c:',c)
	console.log('d:',d)
})


it('array->many',() => {
	const a = [1,2,3]
	console.log('test includes: %s includes %s : %s',a,1,a.includes(1))
	console.log('test includes: %s includes %s from %d: %s',a,1,2,a.includes(1,2))
	console.log('test indexOf : %s indexOf 1 = %d',a,a.indexOf(1))
	console.log('test indexOf : %s indexOf 9 = %d',a,a.indexOf(9))
	console.log('test indexOf : %s indexOf 1 from 1 = %d',a,a.indexOf(1,1))

	let b = [2,3,4,5,2,3,2,5,6,9,2,0]
	console.log('the array:%s',b)
	console.log('the lastIndexOf 2 = %s',b.lastIndexOf(2))
	//to find the every 2 in array
	let indexOf2 = []
	let i = b.length
	do{
		i = b.lastIndexOf(2,i-1)
		if(i!= -1 ) indexOf2.push(i)
	}while(i > 0 )
	console.log('index of 2 : %s',indexOf2)

	//to find the every 2 in array by indexOf
	let count = 0
	i = -1
	indexOf2 = []
	do{
		i = b.indexOf(2,i+1)
		if(i != -1) indexOf2.push(i)
	}while(count++ < 100 && i >= 0 )
	console.log('index of 2 by indexOf : %s',indexOf2)
})

it('array-slice',() => {
	const a = [1,2,3,4,5]
	console.log('array %s slice 1,3 = %s',a,a.slice(1,3))
	console.log('array %s slice 1 = %s',a,a.slice(1))
	console.log('array %s slice -2 = %s',a,a.slice(-2))
	console.log('array %s slice -2,-1 = %s',a,a.slice(-2,-1))
	console.log('array %s slice(1,-1) = %s',a,a.slice(1,-1))
	const b = [new Date(),100,'abc']
	console.log('array %s toString = %s',b,b)
	console.log('array %s toLocaleString = %s',b,b.toLocaleString())
})

it('array -> filter',() => {
	//filter
	console.log('fiter:',
		[1,2,3,4,5].filter(function(c,i,a){
			console.log('array',a)
			return c > 2
		})
	)
})

it('array -> find',() => {
	const a = [
			{
				a	: 1,
				b	: 2,
			},
			{
				a	: 3,
				b	: 4,
			}
		]
	console.log('find:',
		a.find(e => e.a === 3)
	)
	console.log('findIndex:',
		a.findIndex(e => e.a === 3)
	)

})

it('array -> entries & keys',() => {
	const a = ['a','b','c']
	console.log('array entries:',a.entries())
	console.log('array key :',a.keys())
	const keys = a.keys()
	for(let k of keys){
		console.log('key:',k)
	}
	const entries = a.entries()
	for(let v of entries){
		console.log('entries:',v)
	}
})

it('array->map',() => {
	const a = [1,2,3]
	console.log('map:',a.map(function(e){
		if(e > 1){
			return e*2
		}else{
			return undefined
		}
	}))
})

it('array -> reduce',() => {
	const a = [
		{
			name	: 'logger',
			value	: 1,
		},{
			name	: 'todo',
			value	: 2,
		}
	]
	console.log(a.reduce((a,c) => {
		a[c.name] = c
		return a
	},{}))


	//reduce : remove the duplicate item in array 
	const b = [1,2,1,3,4,6,5,7,7,3,9,8,]
	console.log('array %s to remove duplicate item %s',b,b.reduce((a,c) => {
		if(a.indexOf(c) >= 0){
		}else{
			a.push(c)
		}
		return a
	},[]
	))
})


