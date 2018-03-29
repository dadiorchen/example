
test('if: test if statement',done => {
	//{{{
	let x = 1
	/* demo : basic if condition */
	if( x === 1){
	}else{
		done.fail()
	}
	/* demo : if condition is assignment */
	let y = 1
	if((x = y)){
		//go here, because x = y return 1
	}else{
		done.fail()
	}
	y = 0 
	if((x = y )){
		done.fail()
	}else{
		//go here , because x = y return 0
	}
	done()
	//}}}
})

/* TODO */
test('async: test async function',() => {
	//{{{
	console.warn('TODO')
	//}}}
})


/* block */
test('block: test block and variable',done => {
	//{{{
	/* var go through the block, var variable do not have block scope */
	var x = 1
	if(true){
		var x = 2
	}
	expect(x).toBe(2)
	console.log('x=%s',x)

	/* let just effect the block */
	let y = 1
	if(true){
		let y = 2
	}
	expect(y).toBe(1)
	console.log('y=%s',y)

	/* function for block */
	function foo(){
		console.log('foo is called ')
	}
	{
		function bar(){
			console.log('bar is called')
		}
	}
	foo()
	expect(() => {
		bar()
	}).toThrow()

	done()
	//}}}
})


test('const: const variable ',done =>{
	//{{{
	/* declare more then one const at a time */
	const a = 7,
		b = 8
	console.log('const : a = %s , b = %s',a,b)
	done()
	//}}}
})

test('do-while: loop ',done => {
	//{{{
	//limit loop time to 5
	let i = 0
	do{
		console.log('loop in time:%d',i)
	}while(++i < 5)
	done()
	//}}}
})

test('empty&for:',done => {
	//{{{
	//the empty statement ;  
	//empty
	for(let i = 0 ; i < 10000; i++) ;

	//empty
	if(false);
		console.log('here is not in if above')
	const condition = false

	//empty for if condition 
	if(condition)
		;
	else{
		console.log('condition is false')
	}

	//empty and for 
	let i = 0
	for(;i < 2;i++){
		console.log('in for :',i)
	}
	for(let i = 0;;i++){
		console.log('in for 2:',i)
		if(i > 1) break
	}
	let j = 0
	for(;;){
		console.log('j for:',j)
		if(++j > 1) break
	}

	//for...in
	const map = { a : 1 , b : 2 , c : 3}
	for(const key in map){
		console.log('%s = %s',key,map[key])
	}

	const array = [1,2,3]
	for(const e of array){
		console.log('element in array:',e)
	}


	done()
	//}}}
})

test('function: declare function',done => {
	//{{{
	hoisted()

	function hoisted(){
		console.log('hoisted function ')
	}

	expect(() => {
		f()
	}).toThrow()

	const f = function (){
		console.log('variable function')
	}

	f()

	done()
	//}}}
})

test('return:',() => {
	//{{{
	const f = function(){
		console.log('function executed')
		/* return will add ';' automatically */
		return
			100
	}
	expect(f()).toBe(undefined)
	//}}}
})

test('switch',() => {
	//{{{
	const s = (c) => {
		let result
		switch(c){
			case 1:
			case 2:
			case 3:
				result = true
				break
			case 4:
			default:
				result = false
		}
		return result
	}
	expect(s(1)).toBe(true)
	expect(s(2)).toBe(true)
	expect(s(3)).toBe(true)
	expect(s(4)).toBe(false)
	expect(s(100)).toBe(false)

	const a = (c) => {
		//{{{
		let result = 0
		switch(c){
			case 1: 
				result++
			case 2: 
				result++
			case 3: 
				result++
				break
			case 4:
			default :
				result--
				break
		}
		return result
		//}}}
	}
	expect(a(1)).toBe(3)
	expect(a(2)).toBe(2)
	expect(a(3)).toBe(1)
	expect(a(4)).toBe(-1)
	expect(a(100)).toBe(-1)

	//}}}
})


test('throw',done => {
	//{{{
	/* define a error class */
	function MyException(){
		const code = 12
	}
	function doSomething(a){
		if(a === 0){
			/* throw a string */
			throw 'a can not be 0'
		}
		if(a === 1){
			throw 'a can not be 1'
		}
		if(a === 2){
			/* throw a error object */
			throw new MyException()
		}
		if(a === 3){
			/* throw a number*/
			throw 3
		}
		if(a === 4){
			/* throw boolean */
			throw false
		}
		console.log('do some thing is correctly run')
		return true
	}

	expect(doSomething(9)).toBe(true)
	expect(() => doSomething(0)).toThrow()
	expect(() => doSomething(1)).toThrow('a can not be 1')
	expect(() => doSomething(2)).toThrow(MyException)
	expect(() => doSomething(3)).toThrow('3')
	expect(() => doSomething(4)).toThrow()
	try{
		doSomething(2)
	}catch(e){
		/* catch thrown error by instanceof */
		if(e instanceof MyException){
			done()
		}else{
			done.fail()
		}
	}
	//}}}
})

test('try-catch',done => {
	//{{{
	try{
		throw 1
	}catch(e){
		console.log('thrown a %s',e)
	}finally{
		console.log('always execute this')
	}
	function doSomething(){
		/* use catch-finally to output the log always */
		const info = ['doSomething:']
		try{
			info.push('begin...')
			if(true){
				info.push('way 1...')
				return false
			}else{
			}
			info.push('step 2...')
			return true
		}finally{
			console.log(...info)
		}
	}
	const result = doSomething()
	console.log('resule of doSomething:',result)
	done()
	//}}}
})

var z = 100
test('var',() => {
	//{{{
	var a
	console.log('a:',a)
	a = 1
	console.log('a:',a)

	function f(){
		var y = 2
		console.log('y:',y)
	}
	f()
	/* y var scope is in function scope */
	expect(() => {
		console.log('y:',y)
	}).toThrow()
	/* var z scope is in file scope */
	console.log('z:',z)
	//}}}
})

it('Boolean',() => {
	const b = new Boolean()
	console.log('the Boolean:',b)
	console.log('the Boolean toString:',b.toString())
	console.log('Boolean("OK")',new Boolean("OK"))
	console.log('Boolean(-1)',new Boolean(-1))
})


it('Date',() => {
	console.log('new Date()',new Date())
	console.log('new Date().toLocaleString()',new Date().toLocaleString())
	console.log('new Date().toString()',new Date().toString())
	console.log('new Date().toUTCString()',new Date().toUTCString())
	console.log('new Date(2018,3,25)',new Date(2018,2,26,20,8,13))

	const now = new Date()
	console.log('now to int',now.getTime())
	console.log('int to date',new Date(now.getTime()))
	console.log('date.now()',Date.now())
	console.log('get date',('0' + new Date().getDate()).slice(-2))
	console.log('get month',('0' + (new Date().getMonth() + 1)).slice(-2))
	console.log('get week:',new Date().getDay())
	console.log('get year:',new Date().getFullYear().toString().slice(-2))
	console.log('get hours:',('0' + new Date().getHours()).slice(-2))
	console.log('get milliseconds:',new Date().getMilliseconds())
	console.log('get minutes:',new Date().getMinutes())
	console.log('get second:',new Date().getSeconds())
	console.log('get getTimezoneOffset():',new Date().getTimezoneOffset())
	console.log('toDateString:',new Date().toDateString())
	console.log('toISOString:',new Date().toISOString())
	console.log('toJSON:',new Date().toJSON())
	console.log('toGMTString():',new Date().toGMTString())
	console.log('toLocaleDateString():',new Date().toLocaleDateString())
	console.log('toTimeString():',new Date().toTimeString())
})

/*the wrong way to extends a Error , problem: when catch the thrown error object, the error instanceof is not the MyError type*/
class MyError extends Error {
	constructor(message){
		super(message)
		this.OK = true
		this.name = 'MyError'//this.constructor.name
		Error.captureStackTrace(this, this.constructor)
	}
}

/* the correct way to extends a Error, using Function, works on V8 (Chrome/Node)*/
function UserError(message) {
	this.constructor.prototype.__proto__ = Error.prototype // Make this an instanceof Error.
	Error.call(this) // Does not seem necessary. Perhaps remove this line?
	Error.captureStackTrace(this, this.constructor) // Creates the this.stack getter
	this.name = this.constructor.name; // Used to cause messages like "UserError: message" instead of the default "Error: message"
	this.message = message; // Used to set the message
}


it('Error', () => {
	const throwError = function(){
		//throw new MyError('OK')
		throw new UserError('OK')
	}
	try{
		throwError()
	}catch(e){
		console.log(e instanceof Error)
		console.log(e instanceof MyError)
		console.log(e instanceof UserError)
		console.log('catch error:',e)
	}
	expect(() => {
		throwError()
	}).toThrow(UserError)//yes , it throw a UserError
	console.log('test error')
})



it('Infinity',() => {
	console.log(Infinity)
	console.log(Infinity + 1)
	console.log(Math.pow(10,1000))
})


it('Intl',() => {
	console.log('Intl:',Intl)
	console.log('Intl.getCanonicalLocales():',Intl.getCanonicalLocales())
	console.log('Intl.Collator()',new Intl.Collator())
	console.log(new Intl.Collator().compare('a', 'c'));
	console.log(new Intl.Collator().compare('c', 'a'));
// in German, ä sorts with a
console.log(new Intl.Collator('de').compare('ä', 'z'));
// → a negative value

// in Swedish, ä sorts after z
console.log(new Intl.Collator('sv').compare('ä', 'z'));
// → a positive value
})



it('JSON',() => {
	console.log('JSON.parse({})',JSON.parse('{}'))
	/* the reviver is hard to use*/
	console.log('JSON reviver',JSON.parse('{"_id":0}',(key,value) => {
		if(key = '_id'){
			console.log('value:',value)
			return +value + 1
		}else{
			return value
		}
	}))

	/* the sample way to pretty print the JSON ! */
	console.log('JSON stringfy:',JSON.stringify({ a : 1,b : 2},null,'\t'))

	/* a good way to print a object, by toJSON */
	console.log('JSON toJSON:',JSON.stringify({
		a : 1,
		b : 2,
		c : 'sdfdsfsdffdsfdsfdsfdsfsdfdsfsdfdssdf',
		toJSON : function(key){
			return {
				a : this.a,
				b : this.b
			}
		},
	},null,'\t'))
})

it('Map:',() => {
	const map = new Map()
	map.set('a',1)
	map.set('b',2)
	const obj = {
		a	: 1,
		b	: 2,
	}
	const l = 'map'
	console.log('Map:',map,'size:',map.size,'get(a):',map.get('a'))
	console.log('Object:',obj)
	const c = 100000
	console.log('set %d key to obj',c)
	console.time(l)
	for(let i = 0 ; i < c ; i++){
		obj[i + ''] = Math.random()
	}
	console.log('set %d key to obj took time:',c)
	console.timeEnd(l)
	console.time(l)
	let total = 0
	Object.values(obj).forEach(v => total += v)
	console.log('loop %d key in obj took time:',c)
	console.log('the total of values in obj:',total)
	console.timeEnd(l)

	console.time(l)
	for(let i = 0 ; i < c ; i++){
		map.set(i + '', Math.random())
	}
	console.log('set %d key to map took time:',c)
	console.timeEnd(l)
	console.time(l)
	total = 0
	map.forEach((v,k) => total += v)
	console.log('loop %d key in map took time:',c)
	console.log('the total of values in map:',total)
	console.timeEnd(l)
	/* the result show that the Map is good , is fast when iterate the values and keys */

})


//BACK https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
