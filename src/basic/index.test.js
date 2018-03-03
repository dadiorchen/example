
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

